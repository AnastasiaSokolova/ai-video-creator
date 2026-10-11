import { useEffect, useState } from 'react';
import { useUI } from '../context.js';
import { FORM_ENDPOINT } from '../data/projects.js';
import { I18N } from '../data/i18n.js';

const EMPTY = { name: '', email: '', type: '', brief: '', _gotcha: '' };
const RATE_KEY = 'anasokolova.lastInquiry';

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'name';
  if (!f.email.trim()) e.email = 'emailReq';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'emailBad';
  if (!f.type) e.type = 'type';
  if (f.brief.trim().length < 20) e.brief = 'brief';
  return e;
}

const lastSent = () => { try { return Number(localStorage.getItem(RATE_KEY) || 0); } catch { return 0; } };
const markSent = () => { try { localStorage.setItem(RATE_KEY, String(Date.now())); } catch { /* storage blocked */ } };

// `picked` = { key } from a service's "Discuss your project" link; preselects the type.
export default function Contact({ picked }) {
  const { t, lang } = useUI();
  const [f, setF] = useState(EMPTY);
  const [errs, setErrs] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!picked) return;
    setF((x) => ({ ...x, type: picked.key }));
    setErrs((x) => ({ ...x, type: undefined }));
  }, [picked]);

  const onField = (e) => {
    const { name, value } = e.target;
    setF((x) => ({ ...x, [name]: value }));
    setErrs((x) => ({ ...x, [name]: undefined }));
    if (status === 'sent' || status === 'invalid') setStatus('idle');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validate(f);
    setErrs(found);
    if (Object.keys(found).length) {
      setStatus('invalid');
      e.currentTarget.elements[Object.keys(found)[0]]?.focus();
      return;
    }
    if (f._gotcha) return; // bot
    if (Date.now() - lastSent() < 60000) { setStatus('tooSoon'); return; }

    setStatus('sending');
    // Email is always in English so the inbox reads the same whichever language the visitor used
    const typeLabel = (I18N.en.services.find((s) => s.k === f.type) || {}).t || I18N.en.other;
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `${I18N.en.subject} — ${typeLabel}`,
          _replyto: f.email.trim(),
          _template: 'table',
          _captcha: 'false',
          _honey: '',
          Name: f.name.trim(),
          Email: f.email.trim(),
          'Project type': typeLabel,
          Message: f.brief.trim(),
          Language: lang === 'uk' ? 'Ukrainian' : 'English'
        }),
        signal: AbortSignal.timeout(20000)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !(data.success === true || data.success === 'true')) throw new Error(data.message || res.status);
      markSent();
      setF(EMPTY);
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  const errText = (k) => errs[k] && t.err[errs[k]];
  const statusCls = ['invalid', 'failed', 'tooSoon'].includes(status) ? 'is-error' : status === 'sent' ? 'is-ok' : '';

  return (
    <section id="contact" className="contact" aria-labelledby="contact-t">
      <h2 id="contact-t" className="serif contact-title" data-reveal>{t.c1}<span className="accent-italic">{t.c2}</span>{t.c3}</h2>
      <div className="contact-body">
        <p className="contact-sub" data-reveal>{t.contactSub}</p>
        <form className="contact-form" onSubmit={onSubmit} noValidate aria-describedby="form-status" data-reveal>
          <label className="field">
            <span className="mono muted">{t.f.name}</span>
            <input name="name" autoComplete="name" aria-required="true" aria-invalid={!!errs.name} value={f.name} onChange={onField} />
            {errText('name') && <span className="field-err" role="alert">{errText('name')}</span>}
          </label>
          <label className="field">
            <span className="mono muted">{t.f.email}</span>
            <input name="email" type="email" autoComplete="email" aria-required="true" aria-invalid={!!errs.email} value={f.email} onChange={onField} />
            {errText('email') && <span className="field-err" role="alert">{errText('email')}</span>}
          </label>
          <label className="field field-wide">
            <span className="mono muted">{t.f.type}</span>
            <select name="type" aria-required="true" aria-invalid={!!errs.type} value={f.type} onChange={onField}>
              <option value="">{t.f.select}</option>
              {t.services.map((s) => <option key={s.k} value={s.k}>{s.t}</option>)}
              <option value="other">{t.other}</option>
            </select>
            {errText('type') && <span className="field-err" role="alert">{errText('type')}</span>}
          </label>
          <label className="field field-wide">
            <span className="mono muted">{t.f.brief}</span>
            <textarea name="brief" rows={4} aria-required="true" aria-invalid={!!errs.brief} value={f.brief} onChange={onField} placeholder={t.f.briefPh} />
            {errText('brief') && <span className="field-err" role="alert">{errText('brief')}</span>}
          </label>
          <input className="honeypot" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f._gotcha} onChange={onField} />
          <div className="form-actions field-wide">
            <button type="submit" className="submit mono" disabled={status === 'sending'}>{status === 'sending' ? t.sendingBtn : t.submit}</button>
            <p id="form-status" role="status" aria-live="polite" className={`form-status ${statusCls}`}>{t.status[status] || ''}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
