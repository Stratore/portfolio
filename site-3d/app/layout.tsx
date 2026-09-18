import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

// Polices auto-hébergées par Next.js au build (next/font) plutôt qu'un
// @import CSS vers fonts.googleapis.com : élimine une requête réseau tierce
// bloquant le rendu à chaque visite, et permet une CSP plus stricte (plus
// besoin d'autoriser fonts.googleapis.com/fonts.gstatic.com, cf. next.config.mjs).
// `variable` réutilise exactement les noms de custom properties déjà
// référencés partout dans globals.css (--font-head/--font-body/--font-mono) :
// aucune autre modification de CSS nécessaire.
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-head",
    display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.title,
    description: siteConfig.description,
    alternates: { canonical: "/" },
    openGraph: {
        title: siteConfig.title,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.title,
        locale: "fr_FR",
        type: "website",
        // Pas d'entrée `images` : app/opengraph-image.tsx (convention Next.js)
        // est détecté automatiquement et injecté ici au build.
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
    },
};

// Données structurées schema.org/Person - aide les moteurs de recherche à
// comprendre qu'il s'agit d'une page personnelle (nom, profil, liens sociaux)
// plutôt qu'un contenu générique, et peut enrichir l'affichage dans les
// résultats de recherche. Contenu 100% statique, pas d'entrée utilisateur :
// c'est le seul cas légitime de dangerouslySetInnerHTML sur ce site.
const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Étudiant en BUT Informatique",
    alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "IUT d'Arles",
    },
    knowsAbout: ["C++", "Qt", "Systèmes Linux", "Cybersécurité", "Développement web", "React Three Fiber"],
    sameAs: [siteConfig.linkedin, siteConfig.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
                {children}
            </body>
        </html>
    );
}
