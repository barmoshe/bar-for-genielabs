import { ImageResponse } from 'next/og';

// Dynamic share card for the bar-for-genielabs application page, matching the
// page's look — GenieLabs' real brand, read live off genielabs.tech: gray
// gradient surface, heavy uppercase display type in white, hot pink #FF1C74
// pill with a soft glow. Rendered at build time by next/og (Satori), so it
// uses a flexbox-only subset of CSS, plain hex colours and the bundled sans
// at weight 800 standing in for Big Shoulders (Latin text only). Next
// colocates this file with the route and wires the og:image / twitter:image
// tags automatically.

export const alt =
  'Bar Moshe for GenieLabs — Full Stack Engineer. React, Node, TypeScript; AI creative tooling; Temporal pipelines; a day job inside a cloud video editor.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px 48px',
          backgroundImage: 'linear-gradient(180deg, #6d6a70 0%, #a2939c 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
            }}
          >
            Bar Moshe
          </div>
          <div
            style={{
              display: 'flex',
              marginLeft: 20,
              padding: '8px 20px',
              borderRadius: 999,
              border: '1.5px solid rgba(255,255,255,0.45)',
              fontSize: 22,
              fontWeight: 500,
              color: '#ffffff',
            }}
          >
            for GenieLabs · Application
          </div>
        </div>

        {/* Headline: their giant heavy uppercase voice */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 96,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              textTransform: 'uppercase',
            }}
          >
            <span>Build full stack.</span>
            <span>Stay on brand.</span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 27,
              color: 'rgba(255,255,255,0.92)',
              marginTop: '26px',
              maxWidth: '960px',
              lineHeight: 1.4,
            }}
          >
            React, Node, TypeScript. AI creative tooling, Temporal pipelines, and a day
            job inside a cloud video editor. Tel Aviv.
          </div>
        </div>

        {/* Foot meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 25,
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          <div style={{ display: 'flex' }}>github.com/barmoshe</div>
          <div
            style={{
              display: 'flex',
              padding: '13px 30px',
              borderRadius: 999,
              backgroundColor: '#ff1c74',
              boxShadow: '0 0 45px rgba(255,115,169,0.7)',
              fontWeight: 600,
              fontSize: 22,
              color: '#ffffff',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Full Stack Engineer · Tel Aviv
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
