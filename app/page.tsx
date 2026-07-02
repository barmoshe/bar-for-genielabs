import type { Metadata } from "next";
import { DM_Sans, Big_Shoulders } from "next/font/google";
import GenieLabsApp from "@/src/marketing/genielabs/GenieLabsApp";

// GenieLabs pairs a huge condensed display face with a plain body (read live
// off genielabs.tech: "Bigshoulders Variablefont" at weight 800, uppercase,
// tight tracking, over DM Sans body). Big Shoulders is the Google variable
// family of the same face. Exposed as --font-gl-display / --font-gl-body for
// genielabs.css.
const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-gl-display",
  display: "swap",
});
const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-gl-body",
  display: "swap",
});

// Ad-hoc, personalized application page for Bar Moshe's "Full Stack Engineer"
// application to GenieLabs (Tel Aviv). Built in GenieLabs' own visual
// language, read live off genielabs.tech: gray-gradient hero with giant
// Big Shoulders uppercase type, hot pink #FF1C74 glow pills, pastel cloud /
// pink / lime bands, a white pill tab bar over asset-style cards, and a
// cream footer. Noindex, a private shareable link for the GenieLabs team.
const ogTitle = "Bar Moshe × GenieLabs — Full Stack Engineer";
const ogDescription =
  "Bar Moshe, a full-stack engineer in Tel Aviv. React, Node, TypeScript; AI creative tooling (MIDI Agent, Biome Synth, MDP on npm with an MCP server); Temporal pipelines on Code Exchange; a day job inside a cloud video editor.";

// noindex (private, shareable link) but a rich share card still renders for
// direct shares (email / DM / LinkedIn); og:image comes from the colocated
// opengraph-image.tsx.
export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Bar Moshe",
    title: ogTitle,
    description: ogDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@barmoshe1",
    creator: "@barmoshe1",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function GenieLabsPage() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <GenieLabsApp />
    </div>
  );
}
