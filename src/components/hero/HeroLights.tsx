import { useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { SceneState } from "./types";

interface HeroLightsProps {
  sceneState: RefObject<SceneState>;
  reduceMotion: boolean;
}

export default function HeroLights({
  sceneState,
  reduceMotion,
}: HeroLightsProps) {
  const rimRef = useRef<THREE.PointLight | null>(null);

  useFrame((_, delta) => {
    const state = sceneState.current;
    const dt = Math.min(delta, 0.05);
    const rim = rimRef.current;
    if (!rim) return;

    if (reduceMotion || state.reduceMotion) {
      rim.position.set(2, 1, -4);
      return;
    }

    rim.position.x = THREE.MathUtils.damp(
      rim.position.x,
      1.5 + state.mx * 4,
      2.2,
      dt,
    );
    rim.position.y = THREE.MathUtils.damp(
      rim.position.y,
      1 + state.my * 3,
      2.2,
      dt,
    );
  });

  return (
    <>
      <ambientLight intensity={0.32} color="#aeb6ff" />
      <directionalLight position={[4, 5, 3]} intensity={2.4} color="#eae6ff" />
      <directionalLight
        position={[-4, -1.5, 2.5]}
        intensity={0.8}
        color="#55c8ff"
      />
      <pointLight
        ref={rimRef}
        position={[2, 1, -4]}
        intensity={26}
        distance={14}
        decay={2}
        color="#ff9a3c"
      />
      <pointLight
        position={[0, -3.2, -1]}
        intensity={16}
        distance={12}
        decay={2}
        color="#6f47d8"
      />
      <pointLight
        position={[-1.5, 2.4, 3.4]}
        intensity={12}
        distance={9}
        decay={2}
        color="#79b6ff"
      />
    </>
  );
}
