import { useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { SceneState } from "./types";

function makeField(count: number, minR: number, maxR: number, spreadY: number) {
  const data = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = minR + Math.random() * (maxR - minR);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const s = Math.sin(phi);
    data[i * 3] = radius * s * Math.cos(theta);
    data[i * 3 + 1] = radius * s * Math.sin(theta) * spreadY;
    data[i * 3 + 2] = radius * Math.cos(phi);
  }
  return data;
}

interface HeroParticlesProps {
  sceneState: RefObject<SceneState>;
  reduceMotion: boolean;
  isMobile: boolean;
}

export default function HeroParticles({
  sceneState,
  reduceMotion,
  isMobile,
}: HeroParticlesProps) {
  const fieldRef = useRef<THREE.Group | null>(null);

  const particles = useMemo(() => {
    const scale = isMobile ? 0.55 : 1;
    return {
      far: makeField(Math.round(1400 * scale), 4.5, 11, 0.55),
      near: makeField(Math.round(500 * scale), 2.4, 4.6, 0.7),
    };
  }, [isMobile]);

  useFrame(({ clock }, delta) => {
    const state = sceneState.current;
    const t = clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    const field = fieldRef.current;
    if (!field) return;

    if (reduceMotion || state.reduceMotion) {
      field.rotation.set(0, 0, 0);
      return;
    }

    field.rotation.y = t * 0.012 + state.scroll * 0.5;
    field.rotation.x = Math.sin(t * 0.05) * 0.07;
    field.position.x = THREE.MathUtils.damp(
      field.position.x,
      state.mx * 0.45,
      2.2,
      dt,
    );
    field.position.y = THREE.MathUtils.damp(
      field.position.y,
      state.my * 0.3 + Math.sin(t * 0.4) * 0.2,
      2.2,
      dt,
    );
  });

  return (
    <group ref={fieldRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.far, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          sizeAttenuation
          color="#7b6fd0"
          transparent
          opacity={0.38}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.near, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          sizeAttenuation
          color="#d7b8ff"
          transparent
          opacity={0.42}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
