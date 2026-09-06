import React, { useEffect, useRef } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

// A single image rendered as a rigid body: a thin textured slab whose
// front face is the artwork. Collider is a simplified box that matches
// the artwork's aspect ratio. Pure physics — no keyframes.
export default function PhysicsImageObject({
  index,
  geometry,
  material,
  width,
  height,
  position,
  rotationZ,
  velocity,
  angularZ,
  thickness,
  friction,
  restitution,
  density,
  linearDamping,
  angularDamping,
  reducedMotion,
  register,
}) {
  const ref = useRef(null);

  useEffect(() => {
    register(index, ref.current);
    return () => register(index, null);
  }, [index, register]);

  return (
    <RigidBody
      ref={ref}
      type="dynamic"
      position={[position[0], position[1], 0]}
      rotation={[0, 0, rotationZ]}
      linearVelocity={velocity}
      angularVelocity={[0, 0, angularZ]}
      linearDamping={linearDamping}
      angularDamping={angularDamping}
      gravityScale={reducedMotion ? 0 : 1}
      ccd={!reducedMotion}
      canSleep
      colliders={false}
    >
      <CuboidCollider
        args={[width / 2, height / 2, thickness / 2]}
        friction={friction}
        restitution={restitution}
        density={density}
      />
      <mesh
        geometry={geometry}
        material={material}
        scale={[width, height, 1]}
        raycast={() => null}
      />
    </RigidBody>
  );
}