import FormLink from './FormLink.jsx';

export default function Contact() {
  return (
    <section id="contact" className="section section--rule contact" aria-labelledby="contact-h">
      <div className="bg-word bg-word--accent" aria-hidden="true" data-parallax="0.18">impossible</div>
      <div className="container contact-inner">
        <h2 id="contact-h" className="display display--xl" data-reveal>Have a product, a story, or an <em>impossible idea?</em></h2>
        <p className="lede" data-reveal>Tell me what you're making and where the film will live. I'll reply with a scope and estimate.</p>
        <div className="actions">
          <FormLink className="btn btn-accent btn-lg">Start a project</FormLink>
        </div>
      </div>
    </section>
  );
}
