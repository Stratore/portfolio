import { computeLayout } from "./layout3d";
import { graphData } from "@/data/graph";

/**
 * Layout calculé UNE SEULE FOIS au chargement du module, à partir de
 * data/graph.ts - source unique de vérité partagée par :
 *  - le rendu des nœuds/arêtes (components/NetworkGraph.tsx),
 *  - le cadrage caméra initial et les limites de zoom (lib/defaultFraming.ts).
 *
 * C'est ce qui garantit la séparation totale données/rendu demandée : pour
 * ajouter un projet, il suffit d'ajouter un nœud dans data/graph.ts. Positions,
 * cadrage caméra et limites de zoom se recalculent automatiquement partout -
 * aucun fichier de rendu à toucher, aucune valeur à recalibrer à la main.
 */
export const graphLayout = computeLayout(graphData);
