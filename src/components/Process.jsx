import { FAQ, STEPS } from '../data/content.js';
import FormLink from './FormLink.jsx';

export default function Process() {
  return (
    <section id="process" className="section" aria-labelledby="process-h">
      <div className="container">
        <h2 id="process-h" className="display display--md section-title" data-reveal>From idea to <em>finished film</em></h2>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} data-reveal>
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="split terms">
          <div className="split-head" data-reveal>
            <h3 className="display display--xs">Working <em>terms</em></h3>
            <p className="muted">Plain answers to the usual questions. The detailed scope is confirmed in each written quote.</p>
            <FormLink className="text-link">Ask about your project →</FormLink>
          </div>
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<span aria-hidden="true">+</span></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
