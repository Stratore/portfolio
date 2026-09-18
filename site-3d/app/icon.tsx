import { ImageResponse } from "next/og";

// Favicon généré au build (convention app/icon.tsx) - pas d'asset image à
// maintenir, cohérent avec la DA du site (fond sombre, accent bleu, mono).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#030407",
                    color: "#5ec8ff",
                    fontSize: 17,
                    fontWeight: 700,
                    fontFamily: "sans-serif",
                    borderRadius: 7,
                }}
            >
                PP
            </div>
        ),
        { ...size }
    );
}
