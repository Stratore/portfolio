"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Fallback2D } from "@/components/Fallback2D";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// ssr:false est obligatoire ici (WebGL/window inexistants côté serveur).
// Cette page reste elle-même rendue côté serveur pour le premier paint :
// Fallback2D est donc bien présent dans le HTML initial (SEO, no-JS),
// seul World3D est différé et ne s'exécute que côté client après hydratation.
const World3D = dynamic(() => import("@/components/World3D"), {
    ssr: false,
    loading: () => <div className="world-loading">Chargement de la scène 3D…</div>,
});

export default function Page() {
    const [textMode, setTextMode] = useState(false);

    return (
        <>
            <div className={textMode ? "fallback-2d-wrap" : "fallback-2d-wrap fallback-2d-wrap--hidden"}>
                <Fallback2D />
            </div>

            {!textMode && (
                <ErrorBoundary
                    fallback={
                        <div className="world-crash glass">
                            <p className="world-crash__eyebrow">Scène 3D indisponible</p>
                            <p className="world-crash__desc">
                                Le rendu 3D a rencontré un problème sur cet appareil ou ce navigateur. Le reste du
                                portfolio reste consultable.
                            </p>
                            <button className="world-crash__btn" onClick={() => setTextMode(true)}>
                                Voir la vue classique →
                            </button>
                        </div>
                    }
                >
                    <World3D />
                </ErrorBoundary>
            )}

            <button
                className="text-mode-toggle glass"
                onClick={() => setTextMode((v) => !v)}
                aria-label={
                    textMode
                        ? "Revenir à la scène 3D interactive"
                        : "Basculer vers une vue portfolio classique, en texte, sans navigation 3D"
                }
            >
                <span className="text-mode-toggle__sigil">{textMode ? "→" : "$"}</span>
                {textMode ? "retour à la vue 3D" : "vue classique"}
            </button>
        </>
    );
}
