"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { audioEngine } from "@/lib/audio/generativeAudio";

/**
 * Pont entre la caméra Three.js et le moteur audio génératif (Web Audio API,
 * cf. lib/audio/generativeAudio.ts). Ne rend rien : lit `camera.position`
 * chaque frame et transmet distance + delta de mouvement au moteur, qui gère
 * lui-même le lissage des paramètres audio.
 */
export function AudioReactor() {
    const { camera } = useThree();
    const lastPos = useRef<THREE.Vector3 | null>(null);

    useFrame(() => {
        if (!audioEngine.isStarted) return;

        const distance = camera.position.length();

        if (!lastPos.current) {
            lastPos.current = camera.position.clone();
        }
        const movementDelta = camera.position.distanceTo(lastPos.current);
        lastPos.current.copy(camera.position);

        audioEngine.update(distance, movementDelta);
    });

    return null;
}
