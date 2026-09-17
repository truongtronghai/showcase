import type { RefObject } from "react";
import type { SceneState } from "./types";
import HeroObject from "./HeroObject";
import HeroParticles from "./HeroParticles";
import HeroLights from "./HeroLights";
import HeroEffects from "./HeroEffects";

interface HeroSceneProps {
  sceneState: RefObject<SceneState>;
  reduceMotion: boolean;
  isMobile: boolean;
}

export default function HeroScene({
  sceneState,
  reduceMotion,
  isMobile,
}: HeroSceneProps) {
  return (
    <>
      <HeroLights sceneState={sceneState} reduceMotion={reduceMotion} />
      <HeroObject
        sceneState={sceneState}
        reduceMotion={reduceMotion}
        isMobile={isMobile}
      />
      <HeroParticles
        sceneState={sceneState}
        reduceMotion={reduceMotion}
        isMobile={isMobile}
      />
      <HeroEffects reduceMotion={reduceMotion} isMobile={isMobile} />
    </>
  );
}
