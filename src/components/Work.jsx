import { useUI } from '../context.js';
import { byId, projectName, projectShort, projects } from '../data/projects.js';
import FilmFrame, { WatchLink } from './FilmFrame.jsx';

const ROMAN = ['I', 'II', 'III'];
const Eyebrow = ({ project, cat }) => <p className="mono muted eyebrow">{project.num} — {cat}</p>;

// Désir and Aurora: tall film on the left, big title on the right
function FeatureProject({ project, title }) {
  const { t } = useUI();
  const copy = t.p[project.textKey];
  return (
    <article id={project.id} className="feature" aria-labelledby={project.id + '-t'}>
      <div className="feature-media" data-reveal>
        <FilmFrame project={project}><span className="frame-tag mono">{t.film} · 9:16</span></FilmFrame>
      </div>
      <div className="feature-text" data-reveal>
        <Eyebrow project={project} cat={copy.cat} />
        <h3 id={project.id + '-t'} className="serif feature-title">{title}</h3>
        <p className="body-copy">{copy.d}</p>
        <WatchLink project={project} label={t.watchFilm} />
      </div>
    </article>
  );
}

function Still({ project, src, i }) {
  const { t } = useUI();
  return (
    <figure className="still" data-reveal>
      <div className="frame still-frame">
        <img src={src} alt={`${project.name} — ${t.still} ${ROMAN[i]}`} loading="lazy" decoding="async" />
      </div>
      <figcaption className="mono muted caption">{ROMAN[i]} — {t.still}</figcaption>
    </figure>
  );
}

// Ellips and Laneige: campaign film + three stills; `mirror` flips the layout
function CampaignProject({ project, mirror = false, italic = false }) {
  const { t } = useUI();
  const copy = t.p[project.textKey];
  const [s1, s2, s3] = project.stills;
  return (
    <article id={project.id} className={`campaign ${mirror ? 'is-mirror' : ''}`} aria-labelledby={project.id + '-t'}>
      <div className="campaign-head" data-reveal>
        <h3 id={project.id + '-t'} className={`serif campaign-title ${italic ? 'italic' : ''}`}>{project.name}</h3>
        <p className="mono muted eyebrow">{project.num} — {copy.cat}</p>
      </div>
      <div className="campaign-body">
        <figure className="campaign-film" data-reveal>
          <FilmFrame project={project} />
          <figcaption className="mono muted caption caption-row"><span>{t.campaignFilm}</span><span>9:16</span></figcaption>
        </figure>
        <div className="campaign-stills">
          {mirror ? (
            <>
              <div className="stills-col"><Still project={project} src={s1} i={0} /><Still project={project} src={s2} i={1} /></div>
              <div className="stills-col stills-offset"><Still project={project} src={s3} i={2} /></div>
            </>
          ) : (
            <>
              <div className="stills-col stills-offset"><Still project={project} src={s1} i={0} /></div>
              <div className="stills-col"><Still project={project} src={s2} i={1} /><Still project={project} src={s3} i={2} /></div>
            </>
          )}
        </div>
      </div>
      <div className="campaign-foot" data-reveal>
        <p className="body-copy">{copy.d}</p>
        <WatchLink project={project} label={t.viewCampaign} />
      </div>
    </article>
  );
}

function RoomProject({ project }) {
  const { t } = useUI();
  const copy = t.p.room;
  return (
    <section id={project.id} className="room" aria-labelledby="room-t">
      <div className="room-inner">
        <div className="room-bar mono muted" data-reveal>
          <span>{project.num} — {copy.cat}</span>
          <span className="center">{copy.genre}</span>
          <span className="right">16:9</span>
        </div>
        <div className="room-head" data-reveal>
          <p className="mono muted">{copy.by}</p>
          <h3 id="room-t" className="serif room-title">ROOM <span className="accent-italic">505</span></h3>
        </div>
        <div className="room-screen" data-reveal>
          <span className="corner tl" aria-hidden="true" /><span className="corner tr" aria-hidden="true" />
          <span className="corner bl" aria-hidden="true" /><span className="corner br" aria-hidden="true" />
          <FilmFrame project={project} />
        </div>
        <div className="room-foot">
          <p className="serif room-logline" data-reveal>{copy.d}</p>
          <div className="room-credits" data-reveal>
            <dl>
              <dt className="mono muted">{copy.lblDir}</dt><dd>Ana Sokolova</dd>
              <dt className="mono muted">{copy.lblGenre}</dt><dd>{copy.genre}</dd>
              <dt className="mono muted">{copy.lblFormat}</dt><dd>16:9</dd>
            </dl>
            <WatchLink project={project} label={t.watchTheFilm} />
          </div>
        </div>
      </div>
    </section>
  );
}

// UGC and Jewelry: smaller cards side by side
function CardProject({ project, offset = false, tag }) {
  const { t } = useUI();
  const copy = t.p[project.textKey];
  return (
    <article id={project.id} className={`card ${offset ? 'card-offset' : 'card-indent'}`} aria-labelledby={project.id + '-t'} data-reveal>
      <FilmFrame project={project}><span className="frame-tag mono">{tag} · 9:16</span></FilmFrame>
      <Eyebrow project={project} cat={copy.cat} />
      <h3 id={project.id + '-t'} className="serif card-title">{copy.t1}<span className="accent-italic">{copy.t2}</span></h3>
      <p className="body-copy small">{copy.d}</p>
      <WatchLink project={project} label={t.watchVideo} />
    </article>
  );
}

export default function Work() {
  const { t } = useUI();
  const { desir, ellips, laneige, aurora, room505, cupcake, ugc, jewelry } = byId;

  return (
    <>
      <section id="work" className="work" aria-labelledby="work-title">
        <div className="work-head" data-reveal>
          <h2 id="work-title" className="serif section-display">{t.work1} <span className="accent-italic">{t.work2}</span></h2>
          <nav aria-label={`${t.work1} ${t.work2}`} className="work-index">
            <ol className="mono">
              {projects.map((p) => (
                <li key={p.id}><a href={'#' + p.id}><span className="accent">{p.num}</span><span>{projectShort(p, t)}</span></a></li>
              ))}
            </ol>
          </nav>
        </div>
        {desir && <FeatureProject project={desir} title="Désir" />}
        {ellips && <CampaignProject project={ellips} />}
        {laneige && <CampaignProject project={laneige} mirror italic />}
        {aurora && <FeatureProject project={aurora} title={<>Aurora <span className="italic">Vitamins</span></>} />}
      </section>

      {room505 && <RoomProject project={room505} />}

      <section className="shorts" aria-label={cupcake ? projectName(cupcake, t) : undefined}>
        {cupcake && (
          <article id={cupcake.id} className="cupcake" aria-labelledby="cup-t">
            <div className="cupcake-text" data-reveal>
              <Eyebrow project={cupcake} cat={t.p.cupcake.cat} />
              <h3 id="cup-t" className="serif feature-title italic">Cupcake</h3>
              <p className="body-copy">{t.p.cupcake.d}</p>
              <WatchLink project={cupcake} label={t.watchShort} />
            </div>
            <div className="cupcake-media" data-reveal><FilmFrame project={cupcake} /></div>
          </article>
        )}
        <div className="cards">
          {ugc && <CardProject project={ugc} tag="UGC" />}
          {jewelry && <CardProject project={jewelry} tag={t.film} offset={!!ugc} />}
        </div>
        <div className="more-line mono muted" data-reveal>
          <span>{t.moreLine}</span>
          <a href="#contact">{t.fullReel} →</a>
        </div>
      </section>
    </>
  );
}
