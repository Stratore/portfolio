"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { NodeType, PositionedNode } from "@/lib/types";

interface GraphContextValue {
    /** Nœud projet actuellement ouvert dans le panneau d'info (ou null). */
    selectedProject: PositionedNode | null;
    selectProject: (node: PositionedNode | null) => void;

    /** Nœud survolé (tooltip / pulsation). */
    hoveredNode: PositionedNode | null;
    setHoveredNode: (node: PositionedNode | null) => void;

    /** Nœud techno/skill "épinglé" par clic : met en surbrillance les projets liés. */
    highlightedNode: PositionedNode | null;
    toggleHighlight: (node: PositionedNode) => void;
    clearHighlight: () => void;

    /** Ensemble des ids connectés au nœud highlighté (lui inclus), ou null si aucun. */
    relatedIds: Set<string> | null;

    /** Filtre actif sur le type de nœud affiché (boutons de la légende), ou null si aucun. */
    typeFilter: NodeType | null;
    setTypeFilter: (type: NodeType | null) => void;
}

const GraphContext = createContext<GraphContextValue | null>(null);

export function GraphProvider({
    children,
    adjacency,
}: {
    children: ReactNode;
    /** Map id -> ids voisins directs, précalculée à partir des arêtes du graphe. */
    adjacency: Map<string, Set<string>>;
}) {
    const [selectedProjectState, setSelectedProjectState] = useState<PositionedNode | null>(null);
    const [hoveredNode, setHoveredNode] = useState<PositionedNode | null>(null);
    const [highlightedNode, setHighlightedNode] = useState<PositionedNode | null>(null);
    const [typeFilter, setTypeFilterState] = useState<NodeType | null>(null);

    // Un seul "focus" actif à la fois : ouvrir le panneau d'un projet ferme la
    // vignette d'une compétence, et inversement - sinon les deux peuvent se
    // superposer à l'écran et la caméra ne sait plus où regarder.
    // useCallback : ces fonctions vivent dans `value` (cf. plus bas) - sans
    // identité stable, chaque render de GraphProvider recréerait `value` même
    // quand aucune donnée n'a changé, et ferait donc re-render TOUS les
    // consommateurs du contexte (une quarantaine de nœuds/arêtes en 3D).
    const selectProject = useCallback((node: PositionedNode | null) => {
        setSelectedProjectState(node);
        if (node) setHighlightedNode(null);
    }, []);
    const toggleHighlight = useCallback((node: PositionedNode) => {
        setHighlightedNode((current) => (current?.id === node.id ? null : node));
        setSelectedProjectState(null);
    }, []);
    const clearHighlight = useCallback(() => setHighlightedNode(null), []);
    const selectedProject = selectedProjectState;

    // Filtrer par type ferme le panneau projet et la surbrillance en cours -
    // même logique de "focus unique" que selectProject/toggleHighlight, pour
    // éviter un panneau ouvert sur un nœud que le filtre vient de masquer.
    // Recliquer le même bouton de légende annule le filtre (toggle).
    const setTypeFilter = useCallback((type: NodeType | null) => {
        setTypeFilterState((current) => (current === type ? null : type));
        setSelectedProjectState(null);
        setHighlightedNode(null);
    }, []);

    const relatedIds = useMemo(() => {
        if (!highlightedNode) return null;
        const neighbours = adjacency.get(highlightedNode.id) ?? new Set<string>();
        return new Set<string>([highlightedNode.id, ...neighbours]);
    }, [highlightedNode, adjacency]);

    // Mémoïsé : sans ça, `value` est un nouvel objet à CHAQUE render de
    // GraphProvider (y compris pour une raison sans rapport avec le graphe),
    // et React re-render alors tous les composants qui lisent le contexte -
    // ici une quarantaine de nœuds/arêtes 3D - même quand rien n'a changé.
    const value = useMemo<GraphContextValue>(
        () => ({
            selectedProject,
            selectProject,
            hoveredNode,
            setHoveredNode,
            highlightedNode,
            toggleHighlight,
            clearHighlight,
            relatedIds,
            typeFilter,
            setTypeFilter,
        }),
        [selectedProject, selectProject, hoveredNode, highlightedNode, toggleHighlight, clearHighlight, relatedIds, typeFilter, setTypeFilter]
    );

    return <GraphContext.Provider value={value}>{children}</GraphContext.Provider>;
}

export function useGraphContext() {
    const ctx = useContext(GraphContext);
    if (!ctx) throw new Error("useGraphContext must be used within a GraphProvider");
    return ctx;
}
