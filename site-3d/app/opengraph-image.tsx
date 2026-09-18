import { ImageResponse } from "next/og";

// Image de partage générée au build (convention app/opengraph-image.tsx) -
// Next.js relie automatiquement openGraph.images / twitter.images vers cette
// route, pas besoin de la déclarer à la main dans metadata. Reprend la DA du
// site (fond sombre, accent bleu, points reliés évoquant le graphe 3D) plutôt
// qu'un asset statique à produire/maintenir séparément.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DOTS: { x: number; y: number; r: number; color: string }[] = [
    { x: 860, y: 120, r: 7, color: "#5ec8ff" },
    { x: 960, y: 200, r: 5, color: "#8f7bff" },
    { x: 1040, y: 110, r: 5, color: "#5be8a6" },
    { x: 900, y: 300, r: 6, color: "#8f7bff" },
    { x: 1050, y: 260, r: 4, color: "#5ec8ff" },
    { x: 780, y: 220, r: 4, color: "#5be8a6" },
    { x: 1000, y: 380, r: 5, color: "#5ec8ff" },
    { x: 870, y: 420, r: 4, color: "#8f7bff" },
];

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    position: "relative",
                    background: "linear-gradient(135deg, #0a0e14 0%, #030407 65%)",
                    fontFamily: "sans-serif",
                }}
            >
                {DOTS.map((d, i) => (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: d.x,
                            top: d.y,
                            width: d.r * 2,
                            height: d.r * 2,
                            borderRadius: "50%",
                            background: d.color,
                            display: "flex",
                        }}
                    />
                ))}

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "90px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            fontSize: 22,
                            letterSpacing: 5,
                            textTransform: "uppercase",
                            color: "#5ec8ff",
                            marginBottom: 26,
                        }}
                    >
                        Portfolio - BUT Informatique
                    </div>
                    <div style={{ display: "flex", fontSize: 90, fontWeight: 700, color: "#f2f6f8" }}>
                        Pierre Puget
                    </div>
                    <div style={{ display: "flex", fontSize: 30, color: "#9aa4ad", marginTop: 22 }}>
                        Développement &amp; Systèmes - graphe 3D interactif
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
