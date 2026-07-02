'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP, FULL_MOTION_QUERY } from '../../lib/gsap';
import './marketing-base.css';
import './genielabs.css';

/**
 * GenieLabsApp — an ad-hoc, personalized application page for Bar Moshe's
 * "Full Stack Engineer" application to GenieLabs (Tel Aviv). Built in
 * GenieLabs' REAL visual language, read live off genielabs.tech (computed
 * styles + section screenshots, 2026-07-03): gray-gradient hero with giant
 * Big Shoulders weight-800 uppercase type (white), DM Sans body, hot pink
 * #FF1C74 pill CTAs with a soft glow, a pastel-clouds band carrying their
 * signature white pill tab bar over asset-style cards (reframed as Bar's
 * work, organized by content type), a flat pink experience band
 * ("Predictable output, every time"), a pink-to-lime close with their
 * contact-card motif, and a cream footer.
 *
 * Copy is CV-register: terse, factual, first person. Four content bands
 * (hero / tabbed work / experience / close) plus the footer.
 *
 * Self-contained: mounts `.mp-root` only to inherit the marketing reset /
 * focus base (carried locally as marketing-base.css), then overrides
 * everything via `.gl-root` (every selector is .gl-root-prefixed to outrank
 * the base's bare `a` / `h1..h4` rules). All motion is gated on
 * prefers-reduced-motion and the page is fully legible with no JS.
 * Standalone sibling (the ADR-0132 pattern).
 */

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=Full%20Stack%20Engineer%20application%20from%20Bar%20Moshe';
const CV = '/Bar_Moshe_Resume.pdf';

/* ── The stack strip (their customer-logo strip, repurposed). ────────── */
const STACK = [
  'React',
  'Node.js',
  'TypeScript',
  'Next.js',
  'Temporal',
  'MongoDB',
  'PostgreSQL',
  'Go',
  'Python',
  'AWS',
  'Docker',
  'Kubernetes',
  'OpenAI',
  'MCP',
];

/* ── The tabbed work calendar: their signature section, Bar's work. ──── */
type Tile = {
  tag: string;
  title: string;
  desc: string;
  /** Omitted on credential tiles (employer IP: named, never linked). */
  href?: string;
  open?: string;
  tint: 'pink' | 'lavender' | 'lime' | 'cream' | 'blue';
};

type Tab = { id: string; label: string; line: string; tiles: Tile[] };

const TABS: Tab[] = [
  {
    id: 'agents',
    label: 'AI Agents',
    line: 'Creative agents that respond in real time. Both public.',
    tiles: [
      {
        tag: 'PYTHON · REAL-TIME MIDI',
        title: 'MIDI Agent',
        desc: 'Live call-and-response agent: answers your MIDI phrase with editable, in-key MIDI in your DAW.',
        href: 'https://github.com/barmoshe/midi-agent',
        open: 'View the code',
        tint: 'lavender',
      },
      {
        tag: 'LIVE · REACT · TONE.JS · THREE.JS',
        title: 'Biome Synth',
        desc: 'Browser instrument with an AI DJ across five states. Real-time React over Tone.js, Three.js and Canvas2D.',
        href: 'https://biome-synth.lovable.app/',
        open: 'Play it live',
        tint: 'pink',
      },
    ],
  },
  {
    id: 'tools',
    label: 'Dev Tools',
    line: 'Open source on npm, with the public surface others build on.',
    tiles: [
      {
        tag: 'NPM · MCP SERVER · PLUGINS',
        title: 'MDP',
        desc: 'Markdown to document and deck compiler on npm, with an MCP server and Claude Code and Codex plugins.',
        href: 'https://barmoshe.github.io/mdp/',
        open: 'Open MDP',
        tint: 'blue',
      },
      {
        tag: 'OPEN SOURCE · VERIFICATION',
        title: 'entailer',
        desc: 'Logic-validity toolkit: checks whether a conclusion follows from its premises. Useful next to LLMs.',
        href: 'https://github.com/barmoshe/entailer',
        open: 'View the code',
        tint: 'lime',
      },
    ],
  },
  {
    id: 'pipelines',
    label: 'Pipelines',
    line: 'Multi-worker orchestration, externally validated.',
    tiles: [
      {
        tag: 'GO · PYTHON · TS · TEMPORAL',
        title: 'Cross-language orchestration',
        desc: 'One Temporal workflow over Go, Python and TypeScript workers, with retries and validation. Featured on Temporal’s Code Exchange.',
        href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
        open: 'See the writeup',
        tint: 'pink',
      },
    ],
  },
  {
    id: 'fullstack',
    label: 'Full Stack',
    line: 'Database to UI, one owner. Live where possible.',
    tiles: [
      {
        tag: 'REACT · NODE · MONGODB',
        title: 'Israelify',
        desc: 'React over a Node and MongoDB API, with user authentication, middleware and a custom logger.',
        href: 'https://github.com/barmoshe/Israelify-backend',
        open: 'View the code',
        tint: 'lavender',
      },
      {
        tag: 'LIVE · REACT + TYPESCRIPT',
        title: 'Apartment Hunter',
        desc: 'Real-estate decision tool: side-by-side comparison, purchase-tax brackets, mortgage calculator.',
        href: 'https://apartment-hunter-one.vercel.app',
        open: 'Open the app',
        tint: 'lime',
      },
      {
        tag: 'LIVE · FULL PRODUCT CYCLE',
        title: 'Trip Planner',
        desc: 'Itinerary, budget and logistics planner with live currency conversion. Brief to deployed in days.',
        href: 'https://trip-planner-six-iota.vercel.app',
        open: 'Open the app',
        tint: 'cream',
      },
    ],
  },
  {
    id: 'creative',
    label: 'Creative',
    line: 'Playful, game-adjacent work. The day job is content production.',
    tiles: [
      {
        tag: 'LIVE · MEDIAPIPE · CANVAS',
        title: 'bloom-garden',
        desc: 'Webcam hand-gesture game: pinch to pluck flowers, on-device tracking, no video leaves the browser.',
        href: 'https://bloom-garden-five.vercel.app',
        open: 'Play it live',
        tint: 'pink',
      },
      {
        tag: 'DAY JOB · SINCE 2021',
        title: 'Cloud video editor, Wochit',
        desc: 'Support engineer for a cloud video editor at scale: real users’ rendering, encoding and workflow issues, fed back to product.',
        tint: 'cream',
      },
    ],
  },
];

/* ── Experience: compact CV rows. ────────────────────────────────────── */
const EXPERIENCE = [
  {
    when: '2025 to present',
    what: 'Software Developer, Joomsy',
    detail: 'Primary engineer at a five-person SaaS startup. Full-stack product plus DevOps. Employer work is named, never linked.',
  },
  {
    when: '2021 to present',
    what: 'Customer Support Engineer, Wochit',
    detail: 'Cloud video editor at scale. Reproduce and resolve real users’ issues; feed fixes back to product.',
  },
  {
    when: '2023',
    what: 'B.Sc. Computer Science, Afeka College',
    detail: 'Plus a Wix DevOps workshop (EKS, Kubernetes, Terraform) and a full-stack bootcamp (Node, React, MongoDB).',
  },
];

export default function GenieLabsApp() {
  const scope = useRef<HTMLDivElement | null>(null);
  const [tab, setTab] = useState<string>('agents');

  /* Entrance rise + IX2-style scroll fade-ups, reduced-motion gated. */
  useGSAP(
    () => {
      if (!matchMedia(FULL_MOTION_QUERY).matches) return;

      gsap.from('.gl-hero [data-rise]', {
        y: 26,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.09,
        delay: 0.05,
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    },
    { scope },
  );

  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div className="mp-root gl-root" ref={scope}>
      <a className="gl-skip" href="#main">Skip to content</a>

      {/* ── Top navigation (over the dark hero) ────────────── */}
      <header className="gl-nav">
        <div className="gl-nav__inner">
          <a className="gl-brand" href="#main" aria-label="Bar Moshe">
            <span className="gl-wordmark">Bar Moshe</span>
          </a>
          <span className="gl-nav__tag">for GenieLabs</span>
          <nav className="gl-nav__links" aria-label="Sections">
            <a className="gl-nav__link" href="#work">Work</a>
            <a className="gl-nav__link" href="#experience">Experience</a>
          </nav>
          <div className="gl-nav__cta">
            <a className="gl-btn gl-btn--ghost gl-btn--sm" href={CV} target="_blank" rel="noopener noreferrer">
              View CV
            </a>
            <a className="gl-btn gl-btn--pink gl-btn--sm" href={EMAIL}>
              We should talk
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* ── Hero: gray gradient, giant Big Shoulders type ──── */}
        <section className="gl-hero">
          <div className="gl-hero__inner">
            <p className="gl-eyebrow" data-rise>
              Bar Moshe · Full Stack Engineer application
            </p>
            <h1 className="gl-title" data-rise>
              Build full stack.
              <br />
              Stay on brand.
            </h1>
            <p className="gl-lede" data-rise>
              I&rsquo;m Bar Moshe, a full-stack engineer in Tel Aviv. React, Node, TypeScript.
              Primary developer at Joomsy since 2025, inside a cloud video editor at Wochit
              since 2021. This page is my cover letter, in GenieLabs&rsquo; design language.
            </p>
            <div className="gl-hero__cta" data-rise>
              <a className="gl-btn gl-btn--pink" href={EMAIL}>We should talk</a>
              <a className="gl-btn gl-btn--ondark" href={CV} target="_blank" rel="noopener noreferrer">
                View my CV
              </a>
            </div>
          </div>
        </section>

        {/* ── The work calendar: clouds band + pill tab bar ──── */}
        <section id="work" className="gl-clouds">
          {/* their customer-logo strip, repurposed as the stack */}
          <ul className="gl-stack" data-reveal aria-label="Technologies Bar works with">
            {STACK.map((s) => (
              <li key={s} className="gl-stack__item">{s}</li>
            ))}
          </ul>

          <div className="gl-wrap">
            <h2 className="gl-h2 gl-h2--center" data-reveal>
              The work,
              <br />
              ready to ship.
            </h2>
            <p className="gl-sub gl-sub--center" data-reveal>
              Live links where available. Employer work is named, not shown.
            </p>

            <div className="gl-tabs" role="tablist" aria-label="Work by content type" data-reveal>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  id={`gl-tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls="gl-tabpanel"
                  className={`gl-tabs__pill${tab === t.id ? ' is-active' : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div
              id="gl-tabpanel"
              role="tabpanel"
              aria-labelledby={`gl-tab-${activeTab.id}`}
              className="gl-board"
              data-reveal
            >
              <p className="gl-board__line">{activeTab.line}</p>
              <div className="gl-board__grid">
                {activeTab.tiles.map((t) => {
                  const body = (
                    <>
                      <span className="gl-tile__tag">{t.tag}</span>
                      <h3 className="gl-tile__title">{t.title}</h3>
                      <p className="gl-tile__desc">{t.desc}</p>
                      {t.href ? (
                        <span className="gl-tile__link">
                          {t.open} <span aria-hidden="true">→</span>
                        </span>
                      ) : (
                        <span className="gl-tile__link gl-tile__link--muted">
                          Named, not linked. Employer IP.
                        </span>
                      )}
                    </>
                  );
                  return t.href ? (
                    <a
                      key={t.title}
                      className={`gl-tile gl-tile--${t.tint}`}
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {body}
                    </a>
                  ) : (
                    <article key={t.title} className={`gl-tile gl-tile--${t.tint} gl-tile--static`}>
                      {body}
                    </article>
                  );
                })}
              </div>
            </div>

            <p className="gl-more" data-reveal>
              More on{' '}
              <a href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── Experience: flat pink band, CV rows ────────────── */}
        <section id="experience" className="gl-pinkband">
          <div className="gl-wrap">
            <h2 className="gl-h2" data-reveal>
              Predictable output,
              <br />
              every time.
            </h2>
            <div className="gl-exp" data-reveal>
              {EXPERIENCE.map((e) => (
                <div key={e.what} className="gl-exp__row">
                  <span className="gl-exp__when">{e.when}</span>
                  <span className="gl-exp__what">{e.what}</span>
                  <span className="gl-exp__detail">{e.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Close: pink-to-lime, contact-card motif ────────── */}
        <section className="gl-close">
          <div className="gl-close__inner" data-reveal>
            <h2 className="gl-h2 gl-h2--center">
              Let&rsquo;s talk.
            </h2>
            <p className="gl-sub gl-sub--center">
              Applying for the Full Stack Engineer role at GenieLabs. Tel Aviv.
            </p>
            <div className="gl-card">
              <a className="gl-btn gl-btn--pink" href={EMAIL}>Email me</a>
              <a className="gl-btn gl-btn--outline" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a className="gl-btn gl-btn--outline" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className="gl-btn gl-btn--outline" href={CV} target="_blank" rel="noopener noreferrer">
                View my CV
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer (cream) ──────────────────────────────────── */}
      <footer className="gl-footer">
        <div className="gl-footer__inner">
          <div className="gl-footer__brand">
            <span className="gl-wordmark gl-wordmark--ink">Bar Moshe</span>
            <p className="gl-footer__tag">
              An application page Bar Moshe built for the Full Stack Engineer role at
              GenieLabs, Tel Aviv. Not affiliated with GenieLabs.
            </p>
          </div>
          <div className="gl-footer__col">
            <p className="gl-footer__h">The work</p>
            <ul>
              <li><a className="gl-footer__link" href="https://github.com/barmoshe/midi-agent" target="_blank" rel="noopener noreferrer">MIDI Agent</a></li>
              <li><a className="gl-footer__link" href="https://barmoshe.github.io/mdp/" target="_blank" rel="noopener noreferrer">MDP + MCP server</a></li>
              <li><a className="gl-footer__link" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div className="gl-footer__col">
            <p className="gl-footer__h">Get in touch</p>
            <ul>
              <li><a className="gl-footer__link" href={EMAIL}>1barmoshe1@gmail.com</a></li>
              <li><a className="gl-footer__link" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="gl-footer__link" href={CV} target="_blank" rel="noopener noreferrer">View my CV</a></li>
            </ul>
          </div>
        </div>
        <div className="gl-footer__bottom">
          <div className="gl-footer__bottom-inner">
            <span>Built by Bar Moshe for this application, in GenieLabs&rsquo; design language.</span>
            <span>Tel Aviv · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
