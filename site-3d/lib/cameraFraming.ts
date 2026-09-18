export interface CameraFraming {
    position: [number, number, number];
    target: [number, number, number];
    minDistance: number;
    maxDistance: number;
}

/**
 * Calcule un cadrage caméra qui englobe entièrement une sphère (centre +
 * rayon) donnée - totalement indépendant du nombre de nœuds dans le graphe.
 * Ajouter des projets ne fait que changer `center`/`radius` en entrée ; ce
 * calcul continue de produire un cadrage cohérent sans aucun réglage manuel.
 */
export function computeCameraFraming(
    center: [number, number, number],
    radius: number,
    fovDegrees = 50
): CameraFraming {
    const fovRad = (fovDegrees * Math.PI) / 180;
    // Distance pour que la sphère englobante tienne pile dans le champ de
    // vision vertical, + 25% de marge de respiration autour du graphe.
    const fitDistance = (radius / Math.sin(fovRad / 2)) * 1.25;

    // Vue légèrement surélevée plutôt que strictement de face : donne une
    // sensation de profondeur sans jamais paraître "de travers".
    const dir = { x: 0, y: 0.22, z: 1 };
    const dirLength = Math.hypot(dir.x, dir.y, dir.z);

    const position: [number, number, number] = [
        center[0] + (dir.x / dirLength) * fitDistance,
        center[1] + (dir.y / dirLength) * fitDistance,
        center[2] + (dir.z / dirLength) * fitDistance,
    ];

    return {
        position,
        target: center,
        // On ne peut jamais s'approcher au point de traverser un nœud, ni
        // s'éloigner assez pour se perdre dans le vide au-delà du graphe.
        minDistance: Math.max(4, radius * 0.55),
        maxDistance: fitDistance * 2,
    };
}
