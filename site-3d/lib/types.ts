export type NodeType = "projet" | "techno" | "skill";

export interface ProjectDetails {
    tagline: string;
    description: string;
    tags: string[];
    github?: string;
    demo?: string;
    image?: string;
    /** Courte capture d'écran vidéo (mp4/webm) en boucle, muette - aperçu de
     * l'app en action. Les projets sont des exécutables C++/Qt compilés,
     * donc pas de vraie démo interactive possible dans le navigateur ; cette
     * boucle vidéo est l'équivalent pratique. Prend le pas sur `image` si les
     * deux sont fournis. */
    video?: string;
    /** Vrai pour un projet encore en développement, sans dépôt public à
     * montrer pour l'instant - affiche un badge "Projet en cours" à la place
     * du lien "Code source" plutôt que de laisser cet espace vide/muet. */
    inProgress?: boolean;
    /** Captures d'écran réelles de l'app (2-4 idéalement) - remplace `image`
     * quand fourni, affichées en petite galerie cliquable (agrandissement en
     * plein écran). Prend le pas sur `image` mais pas sur `video`. */
    screenshots?: string[];
}

export interface RawNode {
    id: string;
    type: NodeType;
    label: string;
    /** Poids relatif (influence la taille du nœud) */
    weight?: number;
    project?: ProjectDetails;
}

export interface RawEdge {
    source: string;
    target: string;
}

export interface GraphData {
    nodes: RawNode[];
    edges: RawEdge[];
}

/** Nœud une fois positionné par la simulation de force 3D. */
export interface PositionedNode extends RawNode {
    x: number;
    y: number;
    z: number;
}

export interface PositionedEdge {
    source: PositionedNode;
    target: PositionedNode;
}
