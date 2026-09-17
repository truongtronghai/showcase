/* eslint-disable react-hooks/immutability */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { RefObject } from "react";
import * as THREE from "three";
import type { SceneState } from "./types";
import HeroScene from "./HeroScene";

interface CameraRigProps {
  sceneState: RefObject<SceneState>;
}

function CameraRig({ sceneState }: CameraRigProps) {
  const camera = useThree((state) => state.camera);

  useFrame((_, delta) => {
    const state = sceneState.current;
    const dt = Math.min(delta, 0.05);

    if (state.reduceMotion) {
      camera.position.set(0, 0, 6.5);
      camera.lookAt(0, 0, 0);
      return;
    }

    const targetX = state.mx * 0.4 + state.scroll * 0.45;
    const targetY = state.my * 0.22 - state.scroll * 0.1;
    const targetZ = 6.5 - state.scroll * 1.7;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetX,
      2.8,
      dt,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetY,
      2.8,
      dt,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      3.4,
      dt,
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface HeroCanvasProps {
  sceneState: RefObject<SceneState>;
  reduceMotion: boolean;
  isMobile: boolean;
}

export default function HeroCanvas({
  sceneState,
  reduceMotion,
  isMobile,
}: HeroCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 45, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <CameraRig sceneState={sceneState} />
      <HeroScene
        sceneState={sceneState}
        reduceMotion={reduceMotion}
        isMobile={isMobile}
      />
    </Canvas>
  );
}
