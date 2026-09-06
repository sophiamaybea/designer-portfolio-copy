// ───────────────────────────────────────────────────────────────
//  PHYSICS IMAGE ASSETS  —  EDIT THIS LIST TO USE YOUR OWN IMAGES
// ───────────────────────────────────────────────────────────────
//  Add, remove or replace entries here. You do NOT need to touch
//  any of the physics code — only this array.
//
//  Each entry:
//    src    → image URL (PNG with transparency is ideal)
//    scale  → relative size of the object (default 1)
//    weight → relative density / heft   (default 1)
//
//  Aspect ratio is read automatically from the image, so artwork
//  is never stretched or distorted.
// ───────────────────────────────────────────────────────────────

export const physicsImages = [
  { src: "/assets/glass/glass-face-a.webp", scale: 1.0, weight: 1.0 },
  { src: "/assets/glass/glass-face-b.webp", scale: 1.0, weight: 1.05 },
  { src: "/assets/glass/pink-organic.webp", scale: 0.95, weight: 0.8 },
  { src: "/assets/glass/glass-moth.webp", scale: 1.15, weight: 0.75 },
  { src: "/assets/glass/glass-fish.webp", scale: 1.05, weight: 0.95 },
  { src: "/assets/glass/orange-round.webp", scale: 0.9, weight: 1.05 },
  { src: "/assets/glass/orange-bar.webp", scale: 1.0, weight: 0.85 },
  { src: "/assets/glass/orange-dish.webp", scale: 1.05, weight: 1.0 },
  { src: "/assets/glass/pink-round.webp", scale: 0.95, weight: 1.0 },
  { src: "/assets/glass/yellow-bar.webp", scale: 1.0, weight: 0.85 },
];

export default physicsImages;