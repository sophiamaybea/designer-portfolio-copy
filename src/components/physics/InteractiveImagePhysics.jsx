import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useInView } from "framer-motion";
import { useDeviceConfig } from "./useDeviceConfig";
import PhysicsScene from "./PhysicsScene";

// Reusable interactive Rapier physics field of image objects.
// Move the cursor (or drag a finger) through the artwork and it gets
// physically knocked, rolled and piled. Props keep it portable.
export default function InteractiveImagePhysics({
  images = [],
  objectCount,
  interactionStrength = 1,
  gravity = -700,
  restitution = 0.5,
  friction = 0.35,
  height = 560,
  background,
  pointerRadius,
}) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { count, reducedMotion } = useDeviceConfig(objectCount);
  const inView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let last = 0;
    const ro = new ResizeObserver((entries) => {
      const now = performance.now();
      if (now - last < 120) return;
      last = now;
      const cr = entries[0].contentRect;
      if (cr.width > 0 && cr.height > 0) setSize({ width: cr.width, height: cr.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const w = size.width;
  const h = size.height || height;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height, background: background || "transparent" }}
      aria-hidden="true"
    >
      {inView && w > 0 && (
        <div className="absolute inset-0">
          <Canvas
            flat
            orthographic
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            style={{ position: "absolute", inset: 0, background: "transparent" }}
          >
            <Suspense fallback={null}>
              <PhysicsScene
                key={`${Math.round(w)}x${Math.round(h)}`}
                images={images}
                count={count}
                width={w}
                height={h}
                gravity={gravity}
                friction={friction}
                restitution={restitution}
                interactionStrength={interactionStrength}
                pointerRadius={pointerRadius}
                reducedMotion={reducedMotion}
              />
            </Suspense>
          </Canvas>
        </div>
      )}
    </div>
  );
}