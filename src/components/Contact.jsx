import { useEffect, useRef, useState } from 'react';
import { EMAIL, FORM_ENDPOINT, PKG } from '../data/content.js';

export function serviceText(id, t, lang) {
  const ua = lang === 'ua';
  for (const g of PKG) for (const [pid, price, en, uk] of g.items) {
    if (pid === id) return (ua ? uk : en) + ' — ' + t.from + ' ' + price;
  }
  return id === 'other' ? t.other : '';
}

function validate(form, t) {
  const e = {};
  if (!form.email.trim()) e.email = t.eEmail;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = t.eEmailF;
  if (form.desc.trim().length < 5) e.desc = t.eDesc;
  if (form.link.trim() && !/^https?:\/\/\S+\.\S+/.test(form.link.trim())) e.link = t.eLink;
  return e;
}

// form/setForm live in App so Services and the project popup can prefill them.
// focusKey changes whenever something sends the visitor here, to focus the first field.
export default function Contact({ t, lang, form, setForm, focusKey }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [sentTo, setSentTo] = useState('');
  const nameRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (!focusKey) return;
    if (status === 'success') setStatus('idle');
    const id = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 500);
    return () => clearTimeout(id);
  }, [focusKey]); // runs only when focusKey changes; status is read at that moment on purpose

  useEffect(() => { if (status === 'success') successRef.current?.focus(); }, [status]);

  // Errors re-check live once a field has been visited
  const onField = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    if (touched[name]) setErrors((x) => ({ ...x, [name]: validate(next, t)[name] || '' }));
    if (status === 'error') setStatus('idle');
  };
  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((x) => ({ ...x, [name]: true }));
    setErrors((x) => ({ ...x, [name]: validate(form, t)[name] || '' }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const errs = validate(form, t);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTouched({ email: true, desc: true, link: true });
      document.getElementById('f-' + Object.keys(errs)[0])?.focus();
      return;
    }
    if (form.company) return; // honeypot: bots fill hidden fields
    setStatus('sending');
    setErrors({});
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'New enquiry — Ana Sokolova portfolio',
          _replyto: form.email.trim(),
          _template: 'table',
          _captcha: 'false',
          Name: form.name.trim() || '—',
          Email: form.email.trim(),
          // Always English in the inbox, whatever language the visitor used
          Service: serviceText(form.service, { from: 'from', other: 'Something else / not sure yet' }, 'en') || '—',
          Message: form.desc.trim(),
          Link: form.link.trim() || '—',
          Budget: form.budget || '—',
          Language: lang === 'ua' ? 'Ukrainian' : 'English'
        }),
        signal: AbortSignal.timeout(20000)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !(data.success === true || data.success === 'true')) throw new Error(data.message || res.status);
      setSentTo(form.email.trim());
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setForm({ name: '', email: '', service: '', desc: '', link: '', budget: '', company: '' });
    setErrors({}); setTouched({}); setStatus('idle');
  };

  const mailBody = [
    form.name && 'Name: ' + form.name,
    serviceText(form.service, t, lang) && 'Service: ' + serviceText(form.service, t, lang),
    form.budget && 'Budget: ' + form.budget,
    form.link && 'Link: ' + form.link,
    '',
    form.desc
  ].filter((x) => x !== false && x !== '').join('\n');
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(lang === 'ua' ? 'Запит на проєкт' : 'Project enquiry')}&body=${encodeURIComponent(mailBody)}`;
  const groupLabel = { photo: t.gPhoto, video: t.gVideo, campaign: t.gCampaign };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div className="contact-intro">
          <h2 id="contact-title" className="serif">{t.contactT1}<br /><em>{t.contactT2}</em></h2>
          <p>{t.contactIntro}</p>
          <p className="contact-alt">{t.emailAlt}</p>
          <a href={`mailto:${EMAIL}`} className="contact-email">{EMAIL}</a>
        </div>

        <div className="contact-form-col">
          {status === 'success' ? (
            <div role="status" tabIndex={-1} ref={successRef} className="form-success">
              <span aria-hidden="true" className="success-check">✓</span>
              <h3>{t.successTitle}</h3>
              <p>{t.successBody(sentTo)}</p>
              <button type="button" className="btn btn-ghost" onClick={reset}>{t.sendAnother}</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="form">
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-name">{t.fName} <span>{t.optional}</span></label>
                  <input id="f-name" ref={nameRef} name="name" autoComplete="name" value={form.name} onChange={onField} />
                </div>
                <div className="field">
                  <label htmlFor="f-email">{t.fEmail} <span>{t.required}</span></label>
                  <input id="f-email" name="email" type="email" inputMode="email" autoComplete="email" required value={form.email} onChange={onField} onBlur={onBlur} aria-invalid={!!errors.email} aria-describedby="e-email" />
                  <span id="e-email" className="field-err">{errors.email}</span>
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-service">{t.fService}</label>
                <select id="f-service" name="service" value={form.service} onChange={onField}>
                  <option value="">{t.fServicePh}</option>
                  {PKG.map((g) => (
                    <optgroup key={g.g} label={groupLabel[g.g]}>
                      {g.items.map(([id]) => <option key={id} value={id}>{serviceText(id, t, lang)}</option>)}
                    </optgroup>
                  ))}
                  <option value="other">{t.other}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-desc">{t.fDesc} <span>{t.required}</span></label>
                <textarea id="f-desc" name="desc" rows={5} required value={form.desc} onChange={onField} onBlur={onBlur} placeholder={t.fDescPh} aria-invalid={!!errors.desc} aria-describedby="e-desc" />
                <span id="e-desc" className="field-err">{errors.desc}</span>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-link">{t.fLink} <span>{t.optional}</span></label>
                  <input id="f-link" name="link" type="url" inputMode="url" placeholder="https://" value={form.link} onChange={onField} onBlur={onBlur} aria-invalid={!!errors.link} aria-describedby="e-link" />
                  <span id="e-link" className="field-err">{errors.link}</span>
                </div>
                <div className="field">
                  <label htmlFor="f-budget">{t.fBudget} <span>{t.optional}</span></label>
                  <select id="f-budget" name="budget" value={form.budget} onChange={onField}>
                    {t.budgets.map(([v, text]) => <option key={v} value={v}>{text}</option>)}
                  </select>
                </div>
              </div>
              <input className="honeypot" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.company} onChange={onField} />
              {status === 'error' && (
                <div role="alert" className="form-error">
                  <strong>{t.errorTitle}</strong>
                  <span>{t.errorGen}</span>
                  <a href={mailto}>{t.mailFallback}</a>
                </div>
              )}
              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={status === 'sending'} aria-disabled={status === 'sending'}>
                  {status === 'sending' ? t.sending : t.submit} →
                </button>
                <span className="privacy">{t.privacy}</span>
              </div>
            </form>
          )}
        </div>
      </div>
      <footer className="site-footer">
        <div className="wrap footer-row">
          <span>© {new Date().getFullYear()} Ana Sokolova · {t.heroEyebrow}</span>
          <a href="#top">{t.toTop} ↑</a>
        </div>
      </footer>
    </section>
  );
}
