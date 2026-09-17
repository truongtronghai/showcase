"use client";

import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type * as THREE from "three";
import { Hero3D } from "./Hero3D";
import styles from "./Hero.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null!);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const [modelReady, setModelReady] = useState(false);

  useGSAP(
    () => {
      const group = modelGroupRef.current;
      if (!group) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(group.rotation, { x: 0.7, y: Math.PI * 2, z: 0.4, duration: 1 }, 0)
        .to(group.position, { y: 0.6, z: -2, duration: 1 }, 0)
        .to(group.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 1 }, 0)
        .to(
          `.${styles.heroEyebrow}`,
          { autoAlpha: 0, y: -50, ease: "power1.in", duration: 0.4 },
          0,
        )
        .to(
          `.${styles.heroTitle}`,
          { autoAlpha: 0, y: -90, ease: "power1.in", duration: 0.5 },
          0.05,
        )
        .to(
          `.${styles.heroSub}`,
          { autoAlpha: 0, y: -80, ease: "power1.in", duration: 0.5 },
          0.15,
        )
        .to(
          `.${styles.heroCta}`,
          { autoAlpha: 0, y: -60, ease: "power1.in", duration: 0.5 },
          0.25,
        );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: heroRef, dependencies: [modelReady], revertOnUpdate: true },
  );

  return (
    <section ref={heroRef} className={styles.hero} id="hero">
      <div className={styles.heroCanvas}>
        <Canvas
          eventSource={heroRef}
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: "none" }}
        >
          <color attach="background" args={["#0b0817"]} />
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 6, 4]}
            intensity={1.6}
            color="#ffffff"
          />
          <pointLight position={[-4, -2, -3]} intensity={0.6} color="#ff6ec4" />
          <pointLight position={[4, -3, 2]} intensity={0.7} color="#4ec9ff" />

          <Hero3D
            groupRef={modelGroupRef}
            onModelReady={() => setModelReady(true)}
          />
        </Canvas>
      </div>

      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>AI-POWERED · WEB FUTURE</p>
        <h1 className={styles.heroTitle}>
          Shape what&apos;s <span>next.</span>
        </h1>
        <p className={styles.heroSub}>
          A collection of web applications I&apos;ve designed and built across
          different domains and use cases — built with a focus on clean code,
          scalability, performance, and great user experiences.
        </p>
        <a className={styles.heroCta} href="#next">
          Explore more
        </a>
      </div>

      <div className={styles.heroHint} aria-hidden="true">
        <span className={styles.heroHintLine} />
        scroll
      </div>
    </section>
  );
}
