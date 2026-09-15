"use client";

import "@/lib/troikaConfig";
import { Suspense, useMemo, useRef, type ElementRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { defaultFraming, FOV } from "@/lib/defaultFraming";

// Le type du ref est dérivé directement du composant drei plutôt que d'un
// import séparé de "three-stdlib" : drei embarque sa propre copie interne de
// three-stdlib (potentiellement une version différente de celle installée à
// la racine), et les deux types d'OrbitControls ne sont alors pas
// structurellement identiques aux yeux de TypeScript malgré un nom identique.
export type OrbitControlsImpl = ElementRef<typeof OrbitControls>;
import { GraphProvider } from "./GraphContext";
import { NetworkGraph, buildAdjacency } from "./NetworkGraph";
import { CameraRig } from "./CameraRig";
import { AudioReactor } from "./AudioReactor";
import { AudioAutoStart } from "./AudioAutoStart";
import { MiniMapTracker } from "./MiniMapTracker";
import { MiniMap } from "./MiniMap";
import { InfoPanel } from "./InfoPanel";
import { HUD } from "./HUD";

/**
 * Racine du monde 3D. Composant client uniquement (WebGL) — importé par
 * app/page.tsx via next/dynamic({ ssr: false }) pour ne jamais s'exécuter
 * côté serveur ; app/page.tsx affiche Fallback2D en parallèle pour le SEO
 * et les navigateurs sans JavaScript.
 */
export default function World3D() {
    const controlsRef = useRef<OrbitControlsImpl>(null);
    const adjacency = useMemo(() => buildAdjacency(), []);

    return (
        <GraphProvider adjacency={adjacency}>
            <div className="world-canvas" aria-hidden="true">
                <Canvas
                    camera={{ position: defaultFraming.position, fov: FOV, near: 0.1, far: defaultFraming.maxDistance * 3 }}
                    dpr={[1, 1.8]}
                    gl={{ antialias: true, powerPreference: "high-performance" }}
                >
                    <color attach="background" args={["#030407"]} />
                    <fog
                        attach="fog"
                        args={["#030407", defaultFraming.maxDistance * 0.55, defaultFraming.maxDistance * 1.7]}
                    />

                    <ambientLight intensity={0.35} />
                    <pointLight position={[12, 10, 14]} intensity={70} color="#8ecbe0" decay={2} />
                    <pointLight position={[-16, -8, -10]} intensity={40} color="#e0a25b" decay={2} />
                    <pointLight position={[0, -14, 6]} intensity={25} color="#5be8a6" decay={2} />

                    <Suspense fallback={null}>
                        <Stars
                            radius={defaultFraming.maxDistance * 1.3}
                            depth={40}
                            count={2200}
                            factor={2.2}
                            saturation={0}
                            fade
                            speed={0.4}
                        />
                        <NetworkGraph />
                    </Suspense>

                    <CameraRig controlsRef={controlsRef} />
                    <AudioReactor />
                    <MiniMapTracker />
                    <OrbitControls
                        ref={controlsRef}
                        target={defaultFraming.target}
                        enableDamping
                        dampingFactor={0.08}
                        rotateSpeed={0.6}
                        zoomSpeed={0.9}
                        panSpeed={0.7}
                        minDistance={defaultFraming.minDistance}
                        maxDistance={defaultFraming.maxDistance}
                        makeDefault
                    />
                </Canvas>
            </div>

            {/* Cible du portail pour SkillTag (cf. components/SkillTag.tsx) :
                un frère du HUD dans le DOM, hors du contexte d'empilement
                z-index de .world-canvas, pour que la vignette puisse
                réellement s'afficher au-dessus du HUD/panneau projet. */}
            <div id="skill-tag-portal" className="skill-tag-portal" />

            <HUD />
            <InfoPanel />
            <AudioAutoStart />
            <MiniMap />
        </GraphProvider>
    );
}
