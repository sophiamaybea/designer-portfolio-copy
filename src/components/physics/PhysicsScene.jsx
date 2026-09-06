import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import PhysicsImageObject from "./PhysicsImageObject";

// deterministic pseudo-random per index+salt (stable across renders)
const rnd = (i, salt) => {
  const s = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

// Orthographic camera mapped 1:1 to world pixels: x→[0,width], y→[0,height].
function SceneCamera({ width, height }) {
  const { camera } = useThree();
  useLayoutEffect(() => {
    camera.left = 0;
    camera.right = width;
    camera.top = height;
    camera.bottom = 0;
    camera.near = 0.1;
    camera.far = 3000;
    camera.position.set(width / 2, height / 2, 1000);
    camera.lookAt(width / 2, height / 2, 0);
    camera.updateProjectionMatrix();
  }, [camera, width, height]);
  return null;
}

function Walls({ width, height, depth, friction, restitution }) {
  const t = Math.max(2, depth * 0.5);
  const long = width / 2 + t;
  const tall = height / 2 + t;
  return (
    <>
      <RigidBody type="fixed" position={[width / 2, -t, 0]} colliders={false}>
        <CuboidCollider args={[long, t, depth]} friction={friction} restitution={restitution * 0.8} />
      </RigidBody>
      <RigidBody type="fixed" position={[width / 2, height + t, 0]} colliders={false}>
        <CuboidCollider args={[long, t, depth]} friction={friction} restitution={restitution * 0.8} />
      </RigidBody>
      <RigidBody type="fixed" position={[-t, height / 2, 0]} colliders={false}>
        <CuboidCollider args={[t, tall, depth]} friction={friction} restitution={restitution * 0.8} />
      </RigidBody>
      <RigidBody type="fixed" position={[width + t, height / 2, 0]} colliders={false}>
        <CuboidCollider args={[t, tall, depth]} friction={friction} restitution={restitution * 0.8} />
      </RigidBody>
    </>
  );
}

// Invisible kinematic collider that tracks the pointer and physically
// shoves the artwork. Stationary, it doesn't push; moving, it does.
function PointerCollider({ width, height, radius, reducedMotion }) {
  const ref = useRef(null);
  const cur = useRef({ x: width / 2, y: height / 2 });
  const tgt = useRef({ x: width / 2, y: height / 2 });
  const armed = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (state.pointer.x !== last.current.x || state.pointer.y !== last.current.y) {
      armed.current = true;
    }
    last.current.x = state.pointer.x;
    last.current.y = state.pointer.y;
    if (!armed.current) {
      ref.current?.setNextKinematicTranslation({ x: width / 2, y: -height * 3, z: 0 });
      return;
    }
    tgt.current.x = ((state.pointer.x + 1) / 2) * width;
    tgt.current.y = ((state.pointer.y + 1) / 2) * height;
    const lerp = reducedMotion ? 0.25 : 0.4;
    cur.current.x += (tgt.current.x - cur.current.x) * lerp;
    cur.current.y += (tgt.current.y - cur.current.y) * lerp;
    ref.current?.setNextKinematicTranslation({
      x: cur.current.x,
      y: cur.current.y,
      z: 0,
    });
  });

  return (
    <RigidBody ref={ref} type="kinematicPosition" position={[width / 2, height / 2, 0]} colliders={false}>
      <CuboidCollider args={[radius, radius, radius * 0.6]} friction={0.8} restitution={0.15} />
    </RigidBody>
  );
}

// Full-area invisible plane that receives pointer events (image meshes
// opt out of raycasting) and turns taps into small outward impulses.
function InteractionPlane({ width, height, pointerRadius, strength, bodies }) {
  const down = useRef({ x: 0, y: 0, t: 0, moved: false, active: false });

  const onDown = (e) => {
    down.current = { x: e.point.x, y: e.point.y, t: performance.now(), moved: false, active: true };
  };
  const onMove = (e) => {
    if (!down.current.active) return;
    if (Math.hypot(e.point.x - down.current.x, e.point.y - down.current.y) > height * 0.03) {
      down.current.moved = true;
    }
  };
  const onUp = (e) => {
    const d = down.current;
    down.current.active = false;
    if (d.moved) return;
    if (performance.now() - d.t > 240) return;
    const px = e.point.x;
    const py = e.point.y;
    const R = pointerRadius * 3.2;
    bodies.current.forEach((b) => {
      if (!b) return;
      const p = b.translation();
      const dx = p.x - px;
      const dy = p.y - py;
      const dist = Math.hypot(dx, dy);
      if (dist > R) return;
      const f = 1 - dist / R;
      const inv = dist > 0.001 ? 1 / dist : 1;
      const ux = dx * inv;
      const uy = dy * inv;
      const imp = strength * height * 0.05 * f;
      b.applyImpulse({ x: ux * imp * 0.7, y: (uy * 0.5 + 1) * imp, z: 0 }, true);
      b.applyTorqueImpulse({ x: 0, y: 0, z: (rnd(px * dy, 5) - 0.5) * imp * 0.04 }, true);
    });
  };

  return (
    <mesh position={[width / 2, height / 2, -2]} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

// Vertex/fragment shaders that knock out the white JPEG background so
// only the glass shape remains (soft-edged, color-preserving).
const KNOCKOUT_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const KNOCKOUT_FRAG = `
  precision mediump float;
  uniform sampler2D map;
  uniform float cutoff;
  uniform float soft;
  varying vec2 vUv;
  void main() {
    vec4 c = texture2D(map, vUv);
    float lum = dot(c.rgb, vec3(0.299, 0.587, 0.114));
    float mx = max(c.r, max(c.g, c.b));
    float mn = min(c.r, min(c.g, c.b));
    float sat = mx - mn;
    // "whiteness" = bright AND desaturated; saturated colors (yellow, cyan) survive.
    float whitey = clamp(lum - sat * 0.6, 0.0, 1.0);
    float a = 1.0 - smoothstep(cutoff, cutoff + soft, whitey);
    if (a <= 0.002) discard;
    gl_FragColor = vec4(c.rgb, a);
  }
`;

export default function PhysicsScene({
  images,
  count,
  width,
  height,
  gravity,
  friction,
  restitution,
  interactionStrength,
  pointerRadius,
  reducedMotion,
}) {
  const srcs = useMemo(() => images.map((i) => i.src), [images]);
  const textures = useTexture(srcs);

  const texBySrc = useMemo(() => {
    const map = {};
    images.forEach((img, i) => {
      const tex = textures[i];
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      map[img.src] = tex;
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, textures]);

  // shared geometry + per-image material (memoised)
  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  const materialBySrc = useMemo(() => {
    const map = {};
    images.forEach((img) => {
      map[img.src] = new THREE.ShaderMaterial({
        uniforms: {
          map: { value: texBySrc[img.src] },
          cutoff: { value: 0.925 },
          soft: { value: 0.055 },
        },
        vertexShader: KNOCKOUT_VERT,
        fragmentShader: KNOCKOUT_FRAG,
        transparent: true,
        depthWrite: true,
        side: THREE.DoubleSide,
      });
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texBySrc, images]);

  const thickness = useMemo(() => Math.max(2, height * 0.014), [height]);
  const bodies = useRef([]);

  const register = useMemo(() => (i, b) => {
    bodies.current[i] = b;
  }, []);

  const descriptors = useMemo(() => {
    const arr = [];
    const cols = Math.max(2, Math.ceil(Math.sqrt(count * (width / height))));
    for (let i = 0; i < count; i++) {
      const img = images[i % images.length];
      const tex = texBySrc[img.src];
      const aspect = tex?.image?.width && tex?.image?.height
        ? tex.image.width / tex.image.height
        : 1;
      const scale = img.scale ?? 1;
      const weight = img.weight ?? 1;
      const oh = height * (0.125 + 0.075 * rnd(i, 1)) * scale;
      let ow = oh * aspect;
      if (ow > width * 0.42) {
        const k = (width * 0.42) / ow;
        ow *= k;
        // keep oh proportional so aspect preserved
      }
      const marginX = ow * 0.55 + 4;
      let x = marginX + (width - 2 * marginX) * rnd(i, 2);

      let y, rot, vx, vy, wz;
      if (reducedMotion) {
        // calm grid resting near the floor
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cellW = width / cols;
        y = oh * 0.6 + row * oh * 1.05;
        x = cellW * (col + 0.5);
        rot = 0;
        vx = 0;
        vy = 0;
        wz = 0;
      } else {
        y = height * (0.32 + 0.62 * rnd(i, 3));
        rot = (rnd(i, 4) - 0.5) * 1.0;
        vx = (rnd(i, 5) - 0.5) * height * 0.22;
        vy = -height * (0.07 + 0.14 * rnd(i, 6));
        wz = (rnd(i, 7) - 0.5) * 1.8;
      }

      arr.push({
        src: img.src,
        width: ow,
        height: oh,
        position: [x, y],
        rotationZ: rot,
        velocity: [vx, vy, 0],
        angularZ: wz,
        density: 0.9 * weight,
      });
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, width, height, images, texBySrc, reducedMotion]);

  const pr = pointerRadius ?? height * 0.085;
  const ld = 0.78;
  const ad = 0.48;

  return (
    <>
      <SceneCamera width={width} height={height} />
      <ambientLight intensity={0.95} />
      <directionalLight position={[width * 0.3, height * 1.1, 600]} intensity={0.5} />
      <directionalLight position={[width * 0.7, -height * 0.4, 500]} intensity={0.18} />

      <Physics gravity={[0, gravity, 0]}>
        <Walls width={width} height={height} depth={thickness * 6} friction={friction} restitution={restitution} />
        <PointerCollider width={width} height={height} radius={pr * interactionStrength} reducedMotion={reducedMotion} />
        <InteractionPlane
          width={width}
          height={height}
          pointerRadius={pr}
          strength={interactionStrength}
          bodies={bodies}
        />
        {descriptors.map((d, i) => (
          <PhysicsImageObject
            key={i}
            index={i}
            geometry={geometry}
            material={materialBySrc[d.src]}
            width={d.width}
            height={d.height}
            position={d.position}
            rotationZ={d.rotationZ}
            velocity={d.velocity}
            angularZ={d.angularZ}
            thickness={thickness}
            friction={friction}
            restitution={restitution}
            density={d.density}
            linearDamping={ld}
            angularDamping={ad}
            reducedMotion={reducedMotion}
            register={register}
          />
        ))}
      </Physics>
    </>
  );
}