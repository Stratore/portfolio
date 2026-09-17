"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/**
 * Post-traitement de la scène : léger halo sur les matériaux émissifs
 * (Bloom, dosé pour rester net — pas un néon saturé) + vignettage doux.
 * La profondeur de champ à la sélection a été retirée (rendu jugé raté).
 * Composants déclaratifs @react-three/postprocessing : les render targets
 * qu'ils créent sont gérés/libérés par la librairie elle-même au démontage.
 */
export function SceneEffects() {
    return (
        <EffectComposer multisampling={0}>
            <Bloom
                mipmapBlur
                intensity={0.25}
                luminanceThreshold={0.55}
                luminanceSmoothing={0.2}
                radius={0.25}
            />
            <Vignette eskil={false} offset={0.18} darkness={0.65} />
        </EffectComposer>
    );
}
