Act as an elite Creative Frontend Developer and Motion Designer specializing in high-performance, immersive landing pages using React, GSAP, and CSS Modules.

I want you to build an ultra-premium, cinematic Hero Section to showcase the debut of a brand-new cab/car model. The core animation sequence must feature a high-end vehicle that smoothly enters the viewport, transitions into a full 3D spin showcase, and reveals bold, stylized launch typography.

Please generate the complete, production-ready code split into two files:

1. `CarDebutHero.jsx` (The React component)
2. `CarDebutHero.module.css` (The isolated scoped styles)

### 1. Visual & Asset Architecture (3D CSS + Layering)

- **The Environment:** A deep, dramatic luxury dark background (e.g., carbon grays `#111116` or deep night blues) with a faux-3D perspective studio floor grid or reflection plane.
- **The Car Asset:** Since we are using standard web tech without WebGL, structure the car showcase using one of two methods (choose the cleanest implementation for React):
  - **Option A (3D Layered CSS):** An inline SVG or layered PNG system wrapped in a `transform-style: preserve-3d` container, using GSAP to animate `rotationY` for a true perspective spin.
  - **Option B (High-Fidelity Frame Sequence):** A continuous, smooth sequence of 36 high-resolution isometric angles of the car pre-loaded into an array, where GSAP smoothly animates the active image index to create a flawless 360-degree rotation.
- **The Cinematic Lighting:** Include stylized overlay layers for headlights/taillights that flare up on impact or engine start, plus a moving overhead "studio light bar" gradient overlay.

### 2. Animation Timeline & Cinematic Sequence

The GSAP timeline must handle these sequential steps with explosive, high-production energy:

1. **The Entrance (The Debut):** The car drives/slides horizontally or sweeps in from the shadows/edge of the screen with a heavy, premium acceleration curve (`power3.inOut`).
2. **The Hard Braking / Power Slide:** As it hits the center of the viewport, it rapidly decelerates, performing a micro-squat (`scaleY`) and camera shake to simulate real weight and braking physics.
3. **The 3D Spin Showcase:** Immediately upon settling, the vehicle initiates a smooth, majestic 360-degree rotation along the Y-axis. During the spin, activate subtle lighting changes (headlights flash on, ambient studio reflections slide across the body).
4. **Kinetic Typography Reveal:** As the car completes its rotation and faces the user, a massive, futuristic headline (e.g., "THE NEXT GENERATION") breaks out. Use staggered letter reveals or a clean mask-clip reveal from behind the car layer.

### 3. Structural & Styling Requirements (`CarDebutHero.module.css`)

- **Layout:** Full-bleed layout (`100vw`, `100vh`) with `overflow: hidden`.
- **3D Viewport Setup:** Establish a strong perspective context on the parent container (`perspective: 1200px`) to ensure 3D rotations feel realistic and deep.
- **Performance Optimization:** Enforce `will-change: transform, opacity, filter` and use hardware-accelerated CSS properties to prevent frame drops or stuttering during the spin.
- **Responsive Framing:** Ensure the car bounding box remains perfectly centered and respects aspect-ratio locks so it fits cleanly on ultra-wide desktop monitors down to mobile viewports.

Provide the complete, fully written codebase including all mock CSS shapes/SVGs for the vehicle and glowing effects, without skipping lines or using placeholders.
