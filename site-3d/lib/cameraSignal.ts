/**
 * Pont haute-fréquence entre la caméra (dans le <Canvas>) et la mini-map 2D
 * (hors du Canvas, dans le DOM). Un objet muté directement à chaque frame
 * plutôt qu'un state React : 60 écritures/s en re-render React serait
 * inutilement coûteux pour une donnée que seule la mini-map lit, via sa
 * propre boucle requestAnimationFrame (cf. components/MiniMap.tsx).
 */
export const cameraSignal = {
    x: 0,
    y: 0,
    z: 0,
    dirX: 0,
    dirZ: 1,
};
