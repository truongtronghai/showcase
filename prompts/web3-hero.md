## Task: Build an Impressive Cinematic Hero Section

Create a **high-end, cinematic hero section** for my React application using:

- React
- TypeScript
- Vite
- React Three Fiber (`@react-three/fiber`)
- Three.js
- GSAP + GSAP ScrollTrigger
- Tailwind CSS
- `@react-three/drei` where useful

The goal is to make the hero feel like a **premium technology / Web3 / AI product landing page**, similar in visual quality to an award-winning interactive agency website.

### 1. Visual Direction

Create a dark, immersive cinematic scene.

The hero should have:

- Full viewport height: `100vh`
- Almost-black / deep-space background
- A large 3D object as the visual centerpiece
- Subtle volumetric-looking atmosphere
- Floating particles / dust
- Soft glow around the 3D object
- Strong depth and layering
- Cinematic lighting
- Subtle film-like movement
- Premium typography
- Lots of negative space

Avoid making it look like a generic SaaS landing page.

Think:

> futuristic + cinematic + mysterious + premium + technological

The first 2–3 seconds should immediately create a strong visual impression.

### 2. 3D Scene

Use React Three Fiber to create the main visual.

Create a visually interesting abstract 3D object, for example:

- a futuristic metallic sphere
- an abstract geometric structure
- a slowly rotating crystalline object
- a dark chrome/glass orb
- an energy core surrounded by particles

Choose the concept that produces the strongest cinematic result.

The object should NOT simply rotate continuously at a constant speed.

Instead:

- slow idle movement
- subtle rotation
- slight floating motion
- subtle scale/breathing effect
- camera parallax
- mouse interaction

The object should feel alive.

Use `@react-three/drei` helpers where appropriate.

### 3. Camera

Use a perspective camera.

Create subtle cinematic camera movement.

Mouse movement should influence the camera very slightly:

```text
mouse X → camera horizontal movement
mouse Y → camera vertical movement
```

The movement must be extremely subtle.

Do not create an exaggerated “3D website demo” effect.

The camera should feel like a real cinematic camera.

### 4. GSAP Animation

Use GSAP for all major UI/cinematic timeline animations.

Create an initial hero entrance animation:

```text
0.0s
↓
Background appears

0.2s
↓
3D scene begins fading in

0.5s
↓
3D object slowly emerges

0.8s
↓
Headline reveals

1.1s
↓
Supporting text reveals

1.4s
↓
CTA appears

1.6s+
↓
Scene enters cinematic idle state
```

Use:

- `gsap.timeline()`
- `gsap.from()`
- `gsap.to()`
- staggered text animation
- opacity
- transform
- clip-path where appropriate

Do NOT animate everything at the same time.

The animation should have rhythm.

### 5. Typography

Create a large, bold headline.

Example concept:

```text
BUILD
THE
FUTURE.
```

or:

```text
WHERE
DIGITAL
MEETS
REALITY.
```

Use large typography with strong visual hierarchy.

The headline should feel integrated into the 3D scene rather than simply sitting on top of it.

Possible layout:

```text
┌─────────────────────────────────────────────┐
│                                             │
│  SMALL EYEBROW                              │
│                                             │
│  BUILD                                      │
│  THE FUTURE.                3D OBJECT       │
│                             ◉               │
│  Short supporting                           │
│  description                                │
│                                             │
│  [ EXPLORE ]                                │
│                                             │
│                          SCROLL ↓            │
└─────────────────────────────────────────────┘
```

### 6. Scroll Interaction

Use GSAP ScrollTrigger.

When the user starts scrolling:

1. The camera slowly moves toward / around the 3D object.
2. The 3D object rotates based on scroll progress.
3. The object slightly scales.
4. Text begins moving out of the viewport.
5. Particles react subtly.
6. The hero transitions naturally into the next section.

Create a smooth cinematic transition rather than an abrupt section change.

The animation should be tied to scroll progress where appropriate.

### 7. Mouse Interaction

Add subtle mouse interaction.

Mouse movement should influence:

- camera position
- object rotation
- particle movement
- light position

Use interpolation / damping so the movement feels smooth.

Avoid directly setting large transformations from raw mouse coordinates.

### 8. Particles

Add a particle field around the main object.

Particles should:

- move very slowly
- have different depths
- create a sense of scale
- respond subtly to mouse movement
- respond subtly to scroll

Do not create thousands of expensive React components.

Prefer a performant Three.js/R3F approach such as:

- `THREE.Points`
- instanced geometry
- buffer attributes

### 9. Lighting

Create cinematic lighting rather than generic Three.js lighting.

Use a combination of:

- ambient light
- directional light
- point lights
- rim lighting
- emissive material

The object should have strong highlights and deep shadows.

The scene should have depth.

### 10. Post Processing

If appropriate, use `@react-three/postprocessing`.

Consider:

- Bloom
- Vignette
- subtle Noise
- Depth of Field

Keep the effect subtle.

The goal is:

> cinematic

NOT:

> overprocessed gaming effect.

### 11. UI Layer

Keep the HTML/UI layer separate from the R3F canvas.

Suggested structure:

```text
Hero
├── HeroCanvas
│   ├── Camera
│   ├── MainObject
│   ├── Particles
│   ├── Lights
│   └── Effects
│
└── HeroContent
    ├── Eyebrow
    ├── Headline
    ├── Description
    ├── CTA
    └── ScrollIndicator
```

The UI should remain accessible HTML rather than rendering text inside Three.js.

### 12. Component Architecture

Keep the implementation clean.

Suggested structure:

```text
components/
  hero/
    Hero.tsx
    HeroCanvas.tsx
    HeroScene.tsx
    HeroObject.tsx
    HeroParticles.tsx
    HeroContent.tsx
    HeroEffects.tsx
```

Separate:

- 3D scene
- UI
- animation logic
- effects

Avoid putting everything into one huge component.

### 13. Animation Architecture

Create reusable GSAP timelines instead of scattering animation calls everywhere.

Make sure GSAP animations are properly cleaned up when React components unmount.

Use:

```ts
gsap.context();
```

or the appropriate React-safe GSAP pattern.

Avoid memory leaks.

Avoid creating duplicate ScrollTriggers during React development / Strict Mode.

### 14. Performance

This is important.

The hero must remain smooth.

Target:

> 60 FPS on a modern desktop.

Avoid:

- unnecessary React re-renders
- React state for every animation frame
- creating Three.js objects every render
- excessive particle counts
- expensive post-processing
- unnecessary geometry complexity

Use:

- refs
- `useFrame`
- memoization where appropriate
- instancing / buffer geometry
- damping
- GPU-friendly animation

GSAP should control DOM/UI animation.

R3F / Three.js should control the 3D scene.

Do not force React state updates every frame.

### 15. Responsive Design

Desktop should be the cinematic experience.

On mobile:

- reduce particle count
- simplify post-processing
- reduce camera movement
- reduce animation complexity
- keep the 3D object visible
- preserve the visual hierarchy

Do not simply hide the entire 3D experience on mobile.

### 16. Accessibility

The hero must still be usable without animation.

Respect:

```css
prefers-reduced-motion
```

When reduced motion is enabled:

- disable major camera movement
- disable excessive particle movement
- simplify GSAP entrance animations
- keep content visible immediately

All important content must remain accessible as HTML.

### 17. UX Details

Add a subtle scroll indicator at the bottom.

Example:

```text
SCROLL
   ↓
```

The indicator should gently animate.

CTA should have a premium hover interaction.

For example:

- subtle magnetic movement
- glow
- border animation
- smooth GSAP hover transition

Keep it elegant.

### 18. Important Constraints

Do NOT:

- use generic template-style gradients everywhere
- use excessive neon colors
- create a cheesy “crypto website” aesthetic
- make the 3D object rotate constantly at a fixed speed
- use huge amounts of text
- use React state for animation frames
- create unnecessary abstractions
- install unnecessary dependencies
- rewrite unrelated parts of the project

First inspect the existing project structure and installed dependencies.

Reuse existing dependencies whenever possible.

### 19. Implementation Process

Before writing code:

1. Inspect the existing project.
2. Identify the current React/Vite/Tailwind setup.
3. Check installed Three.js/R3F/GSAP dependencies.
4. Identify the appropriate existing entry point.
5. Determine the smallest set of files that need to change.

Then implement the hero.

After implementation:

1. Run TypeScript/type checking.
2. Run linting.
3. Run the smallest relevant test.
4. Run the production build.
5. Fix any errors.
6. Do not modify unrelated files.

### 20. Quality Bar

Do not stop at:

> "The hero works."

The target is:

> "This looks like a premium interactive agency / Web3 / AI landing page."

Pay particular attention to:

- composition
- animation timing
- depth
- lighting
- typography
- camera movement
- transitions
- visual hierarchy
- performance

The final result should feel **cinematic, intentional, and expensive**.

Before finishing, review the implementation specifically for:

- visual quality
- animation smoothness
- React rendering performance
- GSAP cleanup
- ScrollTrigger cleanup
- responsive behavior
- reduced-motion support
- TypeScript correctness
- unnecessary dependencies
- unnecessary complexity
