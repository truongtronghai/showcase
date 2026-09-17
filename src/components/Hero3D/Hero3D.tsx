import { useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Float,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";
import type * as THREE from "three";
import { DoubleSide } from "three";

interface Hero3DProps {
  groupRef: RefObject<THREE.Group | null>;
  onModelReady: () => void;
}

export function Hero3D({ groupRef, onModelReady }: Hero3DProps) {
  const readyFired = useRef(false);

  useFrame(() => {
    if (!readyFired.current && groupRef.current) {
      readyFired.current = true;
      onModelReady();
    }
  });

  return (
    <group ref={(node) => (groupRef.current = node)}>
      <Float speed={1.2} rotationIntensity={0.55} floatIntensity={1.1}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.15, 12]} />
          <MeshDistortMaterial
            color="#a78bfa"
            roughness={0.25}
            metalness={0.55}
            distort={0.35}
            speed={2}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2.2, 0, 0]} position={[0, 0, -0.1]}>
          <torusGeometry args={[1.85, 0.035, 8, 220]} />
          <meshStandardMaterial
            color="#ffe08a"
            emissive="#ff9a3c"
            emissiveIntensity={0.35}
            metalness={0.4}
            roughness={0.3}
            side={DoubleSide}
          />
        </mesh>

        <mesh rotation={[2.1, 0.8, 0]} position={[0, 0, 0.15]}>
          <torusGeometry args={[2.35, 0.012, 6, 180]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.35}
            wireframe
          />
        </mesh>
      </Float>

      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.5}
        scale={10}
        blur={2.8}
        far={4.5}
        color="#000000"
      />

      <Sparkles
        count={90}
        scale={[18, 10, 6]}
        size={3}
        speed={0.35}
        opacity={0.5}
        color="#a78bfa"
      />
    </group>
  );
}
