import { useEffect, useRef, useState } from 'react';
import { BUDGETS, FORM_ENDPOINT } from '../data/content.js';
import Modal from './Modal.jsx';

const EMPTY = { name: '', email: '', idea: '', when: '', where: '', budget: '', ref: '', company_website: '' };
const RATE_KEY = 'as_inquiry_last';

function validate(d) {
  const e = {};
  if (!d.name) e.name = 'Please enter your name.';
  if (!d.email) e.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) e.email = 'Please enter a valid email address.';
  if (d.idea.length < 10) e.idea = d.idea ? 'Please add a little more detail.' : 'Please describe what you would like to create.';
  if (!d.when) e.when = 'Please tell me your timing, or write “flexible”.';
  if (d.ref && !/^https?:\/\/\S+\.\S+/.test(d.ref)) e.ref = 'Please enter a full link starting with https://';
  return e;
}

const readStore = () => { try { return Number(localStorage.getItem(RATE_KEY) || 0); } catch { return 0; } };
const writeStore = () => { try { localStorage.setItem(RATE_KEY, String(Date.now())); } catch { /* storage blocked */ } };

function Field({ label, optional, required, error, name, children }) {
  return (
    <label className="field">
      <span>{label} {required && <b>*</b>}</span>
      {children}
      {error && <span className="err" id={`err-${name}`}>{error}</span>}
    </label>
  );
}

export default function InquiryForm({ open, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errs, setErrs] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const openedAt = useRef(0);
  const formRef = useRef(null);
  const successBtn = useRef(null);

  // Each time the dialog opens: start the spam timer, and reset after a previous successful send
  useEffect(() => {
    if (!open) return;
    openedAt.current = Date.now();
    if (status === 'success') { setForm(EMPTY); setStatus('idle'); }
    setErrs({});
  }, [open]); // status is read only at open time on purpose

  useEffect(() => { if (status === 'success') successBtn.current?.focus(); }, [status]);

  const onField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errs[name]) setErrs((x) => ({ ...x, [name]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const fail = (msg) => { setErrorMsg(msg); setStatus('error'); };

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const d = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()]));
    const found = validate(d);
    setErrs(found);
    const first = Object.keys(found)[0];
    if (first) { formRef.current.elements[first].focus(); return; }

    if (d.company_website || Date.now() - openedAt.current < 3000) return fail('Your inquiry could not be sent. Please wait a moment and try again.');
    if (Date.now() - readStore() < 60000) return fail('An inquiry was just sent from this browser. Please wait a minute before sending another.');

    setStatus('sending');
    const payload = {
      _subject: 'New project inquiry — ' + d.name,
      _replyto: d.email,
      _template: 'table',
      _captcha: 'false',
      _honey: '',
      Name: d.name,
      Email: d.email,
      'What would you like to create?': d.idea,
      'When do you need it?': d.when,
      'Where will the video be used?': d.where || '—',
      'Budget range': d.budget || '—',
      'Reference link': d.ref || '—'
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !(data.success === true || data.success === 'true')) throw new Error(data.message || 'Request was not accepted');
      writeStore();
      setStatus('success');
    } catch {
      fail('Sorry, your inquiry could not be sent right now. Please check your connection and try again.');
    }
  };

  const sending = status === 'sending';
  const input = (name, props = {}) => (
    <input
      name={name}
      value={form[name]}
      onChange={onField}
      aria-invalid={!!errs[name]}
      aria-describedby={errs[name] ? `err-${name}` : undefined}
      {...props}
    />
  );

  return (
    <Modal open={open} onClose={onClose} className="inquiry" labelledBy="inq-title" initialFocus='input[name="name"]' preventClose={sending}>
      <div className="inquiry-panel">
        <div className="inquiry-head">
          <div>
            <p className="eyebrow">PROJECT INQUIRY</p>
            <h2 id="inq-title" className="display display--xs">Start a <em>project</em></h2>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" aria-label="Close inquiry form" onClick={onClose} disabled={sending}>Close</button>
        </div>

        {status === 'success' ? (
          <div className="inquiry-success" role="status">
            <span className="serif">Thank you.</span>
            <p>Your inquiry has been sent. I'll reply to <strong>{form.email.trim()}</strong> with a scope and estimate.</p>
            <button ref={successBtn} type="button" className="btn btn-light" onClick={onClose}>Back to the films</button>
          </div>
        ) : (
          <form ref={formRef} className="inquiry-form" onSubmit={submit} noValidate>
            <div className="field-row">
              <Field label="Name" required name="name" error={errs.name}>{input('name', { autoComplete: 'name' })}</Field>
              <Field label="Email" required name="email" error={errs.email}>{input('email', { type: 'email', autoComplete: 'email' })}</Field>
            </div>
            <Field label="What would you like to create?" required name="idea" error={errs.idea}>
              <textarea
                name="idea"
                rows={5}
                value={form.idea}
                onChange={onField}
                aria-invalid={!!errs.idea}
                aria-describedby={errs.idea ? 'err-idea' : undefined}
                placeholder="The product or story, the feeling you're after, anything you already imagine."
              />
            </Field>
            <div className="field-row">
              <Field label="When do you need it?" required name="when" error={errs.when}>{input('when', { placeholder: 'A date, or “flexible”' })}</Field>
              <Field label="Where will the video be used?" optional name="where">{input('where', { placeholder: 'Instagram, website, ads…' })}</Field>
            </div>
            <div className="field-row">
              <Field label="Budget range" optional name="budget">
                <select name="budget" value={form.budget} onChange={onField}>
                  <option value="">Select a range</option>
                  {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="Reference link" optional name="ref" error={errs.ref}>{input('ref', { type: 'url', inputMode: 'url', placeholder: 'https://' })}</Field>
            </div>
            <div className="honeypot" aria-hidden="true">
              <label>Leave this field empty{input('company_website', { tabIndex: -1, autoComplete: 'off' })}</label>
            </div>
            {status === 'error' && <p className="form-error" role="alert">{errorMsg}</p>}
            <div className="form-actions">
              <button type="submit" className="btn btn-accent btn-lg" disabled={sending} aria-busy={sending}>
                {sending ? 'Sending…' : 'Send inquiry'}
              </button>
              <span className="small muted">* Required. I usually reply within two business days.</span>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
