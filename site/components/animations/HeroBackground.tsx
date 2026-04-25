"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { ShaderPlane } from "./silver-hero-background";

/**
 * Renders the silver-hero-background ShaderPlane scaled to fill the viewport.
 * Uses orthographic-style world coordinates from useThree's viewport so the
 * plane geometry [2,2] maps cleanly to the visible area.
 */
function FullscreenShader() {
  const { viewport } = useThree();
  // ShaderPlane geometry is [2,2]; scaling by half the viewport in world units
  // makes the plane exactly fill the camera's frustum at z=0.
  return (
    <group scale={[viewport.width / 2, viewport.height / 2, 1]}>
      <ShaderPlane
        position={[0, 0, 0]}
        color1="#050B1E"
        color2="#315381"
        intensityScale={0.55}
      />
    </group>
  );
}

export function HeroBackground({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 10 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <FullscreenShader />
      </Canvas>
    </div>
  );
}
