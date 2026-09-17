"use client";

import { Component, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback: ReactNode;
}

interface State {
    hasError: boolean;
}

/**
 * Filet de sécurité React : sans ça, une exception au rendu d'un composant
 * enfant (échec de création du contexte WebGL, police troika qui plante...)
 * fait disparaître toute l'app en production, écran blanc, sans recours.
 * Doit être une classe — c'est la seule API React pour intercepter une
 * erreur de rendu (getDerivedStateFromError / componentDidCatch).
 */
export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, info: unknown) {
        // Log détaillé (message, stack, arbre de composants) réservé au dev :
        // en production, ça reste dans la console du visiteur, mais autant ne
        // pas exposer inutilement la structure interne des composants à qui
        // ouvrirait les devtools.
        if (process.env.NODE_ENV !== "production") {
            console.error("[ErrorBoundary] rendu interrompu :", error, info);
        }
    }

    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}
