import { useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { SceneState } from "./types";

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

function makeGlowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas context unavailable");
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.45)");
  gradient.addColorStop(0.45, "rgba(255,255,255,0.1)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface HeroObjectProps {
  sceneState: RefObject<SceneState>;
  reduceMotion: boolean;
  isMobile: boolean;
}

export default function HeroObject({
  sceneState,
  reduceMotion,
  isMobile,
}: HeroObjectProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const haloRef = useRef<THREE.Sprite | null>(null);
  const coreMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const ringARef = useRef<THREE.Mesh | null>(null);
  const ringBRef = useRef<THREE.Mesh | null>(null);

  const glowTexture = useMemo(() => makeGlowTexture(), []);
  const baseX = isMobile ? 0.55 : 1.95;

  useFrame(({ clock }) => {
    const state = sceneState.current;
    const t = clock.elapsedTime;
    const group = groupRef.current;
    if (!group) return;

    const easeIn = 1 - Math.pow(1 - clamp01(state.intro), 3);
    const scroll = state.scroll;
    const reduced = reduceMotion || state.reduceMotion;

    group.scale.setScalar((reduced ? 1 : easeIn) * (1 + scroll * 0.22));

    if (reduced) {
      group.rotation.set(0, 0.35 + scroll * Math.PI, 0.1);
      group.position.set(baseX, 0, 0);
      if (haloRef.current) haloRef.current.material.opacity = 0.28;
      return;
    }

    const breath = 1 + Math.sin(t * 0.8) * 0.035;
    group.scale.multiplyScalar(breath);
    group.rotation.y =
      Math.sin(t * 0.19) * 0.5 + scroll * Math.PI * 1.15 + state.mx * 0.28;
    group.rotation.x = Math.sin(t * 0.13) * 0.16 - state.my * 0.18;
    group.rotation.z = scroll * 0.35 + Math.sin(t * 0.11) * 0.06;
    group.position.x = baseX + state.mx * 0.25;
    group.position.y = Math.sin(t * 0.55) * 0.16 - scroll * 0.2;

    if (haloRef.current) {
      const haloMat = haloRef.current.material;
      haloMat.opacity = 0.24 * easeIn * (0.65 + Math.sin(t * 0.9) * 0.18);
    }

    if (coreMaterialRef.current) {
      coreMaterialRef.current.emissiveIntensity =
        1.6 + Math.sin(t * 1.1) * 0.45;
    }

    if (ringARef.current) {
      ringARef.current.rotation.z =
        Math.sin(t * 0.22) * 0.5 + Math.cos(t * 0.13) * 0.3;
    }
    if (ringBRef.current) {
      ringBRef.current.rotation.z =
        -Math.sin(t * 0.16) * 0.45 + Math.cos(t * 0.2 + 1) * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      <sprite ref={haloRef} scale={[7.6, 7.6, 1]}>
        <spriteMaterial
          map={glowTexture}
          color="#8b7bdd"
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <mesh>
        <icosahedronGeometry args={[1.15, 12]} />
        <MeshDistortMaterial
          color="#2a2352"
          roughness={0.16}
          metalness={0.9}
          distort={0.32}
          speed={1.5}
        />
      </mesh>

      <mesh scale={0.45}>
        <icosahedronGeometry args={[1, 5]} />
        <meshStandardMaterial
          ref={coreMaterialRef}
          color="#1b1638"
          emissive="#ffab5e"
          emissiveIntensity={1.6}
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      <mesh ref={ringARef} rotation={[Math.PI / 2.45, 0.35, 0]}>
        <torusGeometry args={[1.82, 0.015, 8, 260]} />
        <meshBasicMaterial
          color="#c3abff"
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={ringBRef} rotation={[Math.PI / 1.55, -0.5, 0.2]}>
        <torusGeometry args={[2.24, 0.01, 8, 240]} />
        <meshBasicMaterial
          color="#ffc384"
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </mesh>

      <Sparkles
        count={60}
        scale={[4.2, 3.4, 2.2]}
        size={1.8}
        speed={0.35}
        opacity={0.5}
        color="#ffd9a0"
      />
    </group>
  );
}
