import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
} from "@react-three/postprocessing";

interface HeroEffectsProps {
  reduceMotion: boolean;
  isMobile: boolean;
}

export default function HeroEffects({
  reduceMotion,
  isMobile,
}: HeroEffectsProps) {
  if (reduceMotion) return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={isMobile ? 0.42 : 0.58}
        luminanceThreshold={0.26}
        luminanceSmoothing={0.6}
        mipmapBlur
        radius={0.72}
      />
      {!isMobile && <Noise opacity={0.035} />}
      <Vignette eskil={false} offset={0.16} darkness={0.88} />
    </EffectComposer>
  );
}
