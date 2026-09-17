"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { SceneState } from "./types";
import HeroCanvas from "./HeroCanvas";
import HeroContent from "./HeroContent";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 768px)";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const sceneState = useRef<SceneState>({
    mx: 0,
    my: 0,
    scroll: 0,
    intro: 0,
    reduceMotion: false,
  });
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia(MOTION_QUERY);
    const mqMobile = window.matchMedia(MOBILE_QUERY);
    const applyMotion = () => {
      const reduced = mqMotion.matches;
      setReduceMotion(reduced);
      sceneState.current.reduceMotion = reduced;
    };
    const applyMobile = () => setIsMobile(mqMobile.matches);
    applyMotion();
    applyMobile();
    mqMotion.addEventListener?.("change", applyMotion);
    mqMobile.addEventListener?.("change", applyMobile);
    return () => {
      mqMotion.removeEventListener?.("change", applyMotion);
      mqMobile.removeEventListener?.("change", applyMobile);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      sceneState.current.mx = e.clientX / window.innerWidth - 0.5;
      sceneState.current.my = e.clientY / window.innerHeight - 0.5;
    };
    const onLeave = () => {
      sceneState.current.mx = 0;
      sceneState.current.my = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion]);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;
      const q = gsap.utils.selector(hero);

      if (reduceMotion) {
        gsap.set(sceneState.current, { intro: 1 });
        gsap.set(q("[data-hero-veil]"), { autoAlpha: 0 });
        gsap.set(q("[data-hero-canvas]"), { autoAlpha: 1 });
        return;
      }

      const state = sceneState.current;
      const cleanups: Array<() => void> = [];

      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      introTl
        .fromTo(
          q("[data-hero-veil]"),
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: 1.15, ease: "power2.inOut" },
          0,
        )
        .fromTo(
          q("[data-hero-bg]"),
          { scale: 1.12 },
          { scale: 1, duration: 2.4, ease: "power2.out" },
          0,
        )
        .fromTo(
          q("[data-hero-canvas]"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.7, ease: "power2.inOut" },
          0.2,
        )
        .to(state, { intro: 1, duration: 1.6, ease: "power2.inOut" }, 0.45)
        .fromTo(
          q("[data-hero-eyebrow]"),
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          0.85,
        )
        .fromTo(
          q("[data-hero-line] > span"),
          { yPercent: 110 },
          { yPercent: 0, duration: 1.15, ease: "power4.out", stagger: 0.09 },
          0.9,
        )
        .fromTo(
          q("[data-hero-sub]"),
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.85 },
          1.25,
        )
        .fromTo(
          q("[data-hero-cta]"),
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          1.45,
        )
        .fromTo(
          q("[data-hero-scroll]"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.7 },
          1.7,
        );

      const cta = q("[data-hero-cta]")[0];
      if (cta) {
        const xTo = gsap.quickTo(cta, "x", {
          duration: 0.45,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(cta, "y", {
          duration: 0.45,
          ease: "power3.out",
        });
        const onMove = (e: MouseEvent) => {
          const r = cta.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
        };
        const onEnter = () => document.addEventListener("pointermove", onMove);
        const onExit = () => {
          document.removeEventListener("pointermove", onMove);
          xTo(0);
          yTo(0);
        };
        cta.addEventListener("mouseenter", onEnter);
        cta.addEventListener("mouseleave", onExit);
        cleanups.push(() => {
          cta.removeEventListener("mouseenter", onEnter);
          cta.removeEventListener("mouseleave", onExit);
          document.removeEventListener("pointermove", onMove);
        });
      }

      const scrubTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      scrubTl
        .to(state, { scroll: 1, duration: 1 }, 0)
        .to(q("[data-hero-bg]"), { scale: 1.35, duration: 1 }, 0)
        .to(
          q("[data-hero-line]"),
          { autoAlpha: 0, y: -80, ease: "power1.in", duration: 0.55 },
          0.05,
        )
        .to(
          q("[data-hero-eyebrow]"),
          { autoAlpha: 0, y: -46, ease: "power1.in", duration: 0.5 },
          0,
        )
        .to(
          q("[data-hero-sub]"),
          { autoAlpha: 0, y: -70, ease: "power1.in", duration: 0.5 },
          0.14,
        )
        .to(
          q("[data-hero-cta]"),
          { autoAlpha: 0, y: -54, ease: "power1.in", duration: 0.5 },
          0.22,
        )
        .to(q("[data-hero-scroll]"), { autoAlpha: 0, duration: 0.5 }, 0);

      return () => {
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: heroRef, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  return (
    <section ref={heroRef} className={styles.hero} id="hero">
      <div className={styles.heroBg} data-hero-bg />
      <div className={styles.heroCanvas} data-hero-canvas>
        <HeroCanvas
          sceneState={sceneState}
          reduceMotion={reduceMotion}
          isMobile={isMobile}
        />
      </div>
      <HeroContent />
      <div className={styles.heroVeil} data-hero-veil aria-hidden="true" />
    </section>
  );
}
