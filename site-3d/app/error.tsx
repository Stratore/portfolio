"use client";

import { useEffect } from "react";

/**
 * Filet de secours au niveau de la route (Next.js App Router) : couvre tout
 * ce qui n'est pas déjà protégé par l'ErrorBoundary local de la scène 3D
 * (cf. components/ErrorBoundary.tsx, qui gère le cas le plus probable -
 * un crash WebGL - avec un repli plus doux vers la vue classique).
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
            console.error("[app/error] rendu de page interrompu :", error);
        }
    }, [error]);

    return (
        <div className="world-crash glass">
            <p className="world-crash__eyebrow">Un problème est survenu</p>
            <p className="world-crash__desc">
                La page a rencontré une erreur inattendue. Vous pouvez réessayer.
            </p>
            <button className="world-crash__btn" onClick={() => reset()}>
                Réessayer
            </button>
        </div>
    );
}
