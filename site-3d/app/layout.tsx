import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pierre Puget | Portfolio 3D",
    description:
        "Portfolio interactif de Pierre Puget — graphe 3D reliant projets, technologies et compétences (BUT Informatique, développement & systèmes).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body>{children}</body>
        </html>
    );
}
