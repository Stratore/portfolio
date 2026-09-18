import { graphLayout } from "./graphLayout";
import { computeCameraFraming } from "./cameraFraming";

export const FOV = 50;

/**
 * Cadrage caméra par défaut (vue d'ensemble), calculé une seule fois à partir
 * du layout réel du graphe. Utilisé à la fois par World3D.tsx (caméra/
 * OrbitControls initiaux) et CameraRig.tsx (position de retour à la vue
 * d'ensemble) - un seul calcul, jamais deux valeurs qui pourraient diverger.
 */
export const defaultFraming = computeCameraFraming(graphLayout.center, graphLayout.radius, FOV);
