import { useEffect, useState } from "react";

// Picks an object count per device class and detects reduced-motion.
// desktop ≥1024 → up to `objectCount`, tablet 768–1023 ~70%, mobile <768 ~50%.
export function useDeviceConfig(objectCount) {
  const compute = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let base = objectCount && objectCount > 0 ? objectCount : 22;
    let count;
    if (w >= 1024) count = base;
    else if (w >= 768) count = Math.round(base * 0.7);
    else count = Math.round(base * 0.5);

    count = Math.min(Math.max(count, 4), 30);
    if (reduced) count = Math.min(count, 8);
    return { count, reduced };
  };

  const [cfg, setCfg] = useState(compute);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setCfg(compute()));
    };
    window.addEventListener("resize", on);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener?.("change", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", on);
      mq.removeEventListener?.("change", on);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectCount]);

  return cfg;
}

export default useDeviceConfig;