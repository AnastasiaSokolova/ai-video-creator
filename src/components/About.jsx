// "How it works" steps and the About band.
export function Process({ t }) {
  return (
    <section className="process wrap" aria-labelledby="process-title">
      <h2 id="process-title" className="serif">{t.processTitle}</h2>
      <ol className="steps">
        {t.steps.map((text, i) => (
          <li key={text}>
            <span aria-hidden="true" className="step-num serif">{String(i + 1).padStart(2, '0')}</span>
            <span className="step-text">{text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function About({ t }) {
  return (
    <section id="about" className="about band" aria-labelledby="about-title">
      <div className="wrap about-inner">
        <h2 id="about-title" className="eyebrow eyebrow-accent"><span aria-hidden="true" />{t.aboutTitle}</h2>
        <p className="about-lead serif">{t.about1}</p>
        <p className="about-body">{t.about2}</p>
      </div>
    </section>
  );
}
