import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

const PEBBLES = [
  { label: "COURSES", route: "/courses", asset: "/pebbles/glass-face-a.webp", size: 148, tint: 0 },
  { label: "JOURNAL", route: "/journal", asset: "/pebbles/glass-moth.webp", size: 132, tint: 1 },
  { label: "ABOUT", route: "/about", asset: "/pebbles/glass-fish.webp", size: 122, tint: 2 },
  { label: "COURSES", route: "/courses", asset: "/pebbles/glass-moth.webp", size: 106, tint: 3 },
  { label: "CONTACT", route: "/contact", asset: "/pebbles/glass-face-a.webp", size: 118, tint: 4 },
  { label: "JOURNAL", route: "/journal", asset: "/pebbles/glass-fish.webp", size: 98, tint: 5 },
  { label: "ABOUT", route: "/about", asset: "/pebbles/glass-face-a.webp", size: 92, tint: 2 },
  { label: "COURSES", route: "/courses", asset: "/pebbles/glass-fish.webp", size: 136, tint: 1 },
  { label: "JOURNAL", route: "/journal", asset: "/pebbles/glass-moth.webp", size: 112, tint: 4 },
];

const STARTS = [
  [0.08, 0.12],
  [0.72, 0.08],
  [0.84, 0.42],
  [0.16, 0.62],
  [0.52, 0.72],
  [0.42, 0.12],
  [0.66, 0.5],
  [0.28, 0.36],
  [0.78, 0.74],
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function InteractivePebbles() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const fieldRef = useRef(null);
  const nodesRef = useRef([]);
  const bodiesRef = useRef([]);
  const frameRef = useRef(0);
  const sizeRef = useRef({ width: 1, height: 1 });
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const scrollKickRef = useRef(0);
  const dragRef = useRef(null);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return undefined;

    const measure = () => {
      const rect = field.getBoundingClientRect();
      sizeRef.current = { width: rect.width, height: rect.height };

      if (!bodiesRef.current.length) {
        bodiesRef.current = PEBBLES.map((pebble, index) => {
          const mobileScale = rect.width < 700 ? 0.72 : 1;
          const size = pebble.size * mobileScale;
          const maxX = Math.max(1, rect.width - size);
          const maxY = Math.max(1, rect.height - size);
          const angle = index * 1.77 + 0.4;
          const speed = rect.width < 700 ? 0.72 : 1.08;

          return {
            ...pebble,
            size,
            x: STARTS[index][0] * maxX,
            y: STARTS[index][1] * maxY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            rotation: index * 31,
            spin: (index % 2 === 0 ? 0.2 : -0.17) * (0.75 + index * 0.035),
            dragging: false,
            moved: false,
            startX: 0,
            startY: 0,
            lastPX: 0,
            lastPY: 0,
          };
        });
      } else {
        bodiesRef.current.forEach((body, index) => {
          const mobileScale = rect.width < 700 ? 0.72 : 1;
          body.size = PEBBLES[index].size * mobileScale;
          body.x = clamp(body.x, 0, Math.max(0, rect.width - body.size));
          body.y = clamp(body.y, 0, Math.max(0, rect.height - body.size));
        });
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(field);

    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollRef.current;
      lastScrollRef.current = current;
      scrollKickRef.current = clamp(scrollKickRef.current + delta * 0.025, -4.5, 4.5);
    };

    lastScrollRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reduced) {
      bodiesRef.current.forEach((body, index) => {
        const node = nodesRef.current[index];
        if (!node) return;
        node.style.width = `${body.size}px`;
        node.style.height = `${body.size}px`;
        node.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.rotation}deg)`;
      });

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      };
    }

    let previous = performance.now();

    const tick = (time) => {
      const dt = Math.min((time - previous) / 16.666, 1.45);
      previous = time;
      const { width, height } = sizeRef.current;
      const bodies = bodiesRef.current;
      const pointer = pointerRef.current;
      const scrollKick = scrollKickRef.current;

      for (let i = 0; i < bodies.length; i += 1) {
        const body = bodies[i];
        if (body.dragging) continue;

        const radius = body.size * 0.44;
        const cx = body.x + body.size / 2;
        const cy = body.y + body.size / 2;

        if (pointer.active) {
          const dx = cx - pointer.x;
          const dy = cy - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          const range = 190 + radius;

          if (distance < range) {
            const force = Math.pow(1 - distance / range, 1.7) * 0.72;
            body.vx += (dx / distance) * force * dt;
            body.vy += (dy / distance) * force * dt;
            body.spin += (dx / distance) * 0.003;
          }
        }

        body.vy += scrollKick * 0.018 * dt;
        body.vx += Math.sin(time * 0.00035 + i * 2.2) * 0.0028 * dt;
        body.vy += Math.cos(time * 0.00029 + i * 1.7) * 0.0024 * dt;

        body.x += body.vx * dt;
        body.y += body.vy * dt;
        body.rotation += body.spin * dt;

        const maxX = Math.max(0, width - body.size);
        const maxY = Math.max(0, height - body.size);

        if (body.x <= 0) {
          body.x = 0;
          body.vx = Math.abs(body.vx) * 0.92;
          body.spin += 0.04;
        } else if (body.x >= maxX) {
          body.x = maxX;
          body.vx = -Math.abs(body.vx) * 0.92;
          body.spin -= 0.04;
        }

        if (body.y <= 0) {
          body.y = 0;
          body.vy = Math.abs(body.vy) * 0.92;
          body.spin -= 0.03;
        } else if (body.y >= maxY) {
          body.y = maxY;
          body.vy = -Math.abs(body.vy) * 0.92;
          body.spin += 0.03;
        }

        body.vx *= 0.9992;
        body.vy *= 0.9992;
        body.spin *= 0.9996;

        const speed = Math.hypot(body.vx, body.vy);
        if (speed < 0.48) {
          body.vx += Math.cos(i * 2.31 + time * 0.0002) * 0.01;
          body.vy += Math.sin(i * 1.83 + time * 0.0002) * 0.01;
        }
      }

      for (let i = 0; i < bodies.length; i += 1) {
        for (let j = i + 1; j < bodies.length; j += 1) {
          const a = bodies[i];
          const b = bodies[j];
          if (a.dragging || b.dragging) continue;

          const ar = a.size * 0.39;
          const br = b.size * 0.39;
          const ax = a.x + a.size / 2;
          const ay = a.y + a.size / 2;
          const bx = b.x + b.size / 2;
          const by = b.y + b.size / 2;
          const dx = bx - ax;
          const dy = by - ay;
          const distance = Math.hypot(dx, dy) || 0.001;
          const minDistance = ar + br;

          if (distance < minDistance) {
            const nx = dx / distance;
            const ny = dy / distance;
            const overlap = (minDistance - distance) * 0.52;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;

            const relative = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
            if (relative < 0) {
              const impulse = -relative * 0.92;
              a.vx -= impulse * nx;
              a.vy -= impulse * ny;
              b.vx += impulse * nx;
              b.vy += impulse * ny;
              a.spin -= impulse * 0.035;
              b.spin += impulse * 0.035;
            }
          }
        }
      }

      scrollKickRef.current *= 0.91;

      bodies.forEach((body, index) => {
        const node = nodesRef.current[index];
        if (!node) return;
        node.style.width = `${body.size}px`;
        node.style.height = `${body.size}px`;
        node.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) rotate(${body.rotation}deg)`;
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  const updatePointer = (event) => {
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    };
  };

  const shockwave = (event) => {
    if (event.target !== event.currentTarget) return;
    updatePointer(event);
    const pointer = pointerRef.current;

    bodiesRef.current.forEach((body) => {
      const cx = body.x + body.size / 2;
      const cy = body.y + body.size / 2;
      const dx = cx - pointer.x;
      const dy = cy - pointer.y;
      const distance = Math.hypot(dx, dy) || 1;
      const force = clamp(12 - distance * 0.018, 1.2, 9);
      body.vx += (dx / distance) * force;
      body.vy += (dy / distance) * force;
      body.spin += (dx / distance) * 0.35;
    });
  };

  const startDrag = (event, index) => {
    event.preventDefault();
    event.stopPropagation();
    const body = bodiesRef.current[index];
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!body || !rect) return;

    body.dragging = true;
    body.moved = false;
    body.startX = event.clientX;
    body.startY = event.clientY;
    body.lastPX = event.clientX;
    body.lastPY = event.clientY;
    body.vx = 0;
    body.vy = 0;
    dragRef.current = index;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const drag = (event, index) => {
    const body = bodiesRef.current[index];
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!body?.dragging || !rect) return;

    const nextX = event.clientX - rect.left - body.size / 2;
    const nextY = event.clientY - rect.top - body.size / 2;
    const dx = event.clientX - body.lastPX;
    const dy = event.clientY - body.lastPY;

    body.vx = dx * 0.72;
    body.vy = dy * 0.72;
    body.x = clamp(nextX, 0, Math.max(0, rect.width - body.size));
    body.y = clamp(nextY, 0, Math.max(0, rect.height - body.size));
    body.lastPX = event.clientX;
    body.lastPY = event.clientY;
    body.moved = body.moved || Math.hypot(event.clientX - body.startX, event.clientY - body.startY) > 8;
  };

  const endDrag = (event, index) => {
    const body = bodiesRef.current[index];
    if (!body) return;

    body.dragging = false;
    body.vx = clamp(body.vx, -12, 12);
    body.vy = clamp(body.vy, -12, 12);
    dragRef.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);

    if (!body.moved) navigate(body.route);
  };

  return (
    <div
      ref={fieldRef}
      className="pebble-field"
      onPointerMove={updatePointer}
      onPointerLeave={() => {
        pointerRef.current.active = false;
      }}
      onPointerDown={shockwave}
      aria-label="Interactive glass pebble navigation. Drag, flick or tap the pebbles."
    >
      <div className="pebble-instruction" aria-hidden="true">
        <span>DRAG + FLICK</span>
        <span>CLICK EMPTY SPACE TO SCATTER</span>
      </div>

      {PEBBLES.map((pebble, index) => (
        <button
          key={`${pebble.label}-${index}`}
          ref={(node) => {
            nodesRef.current[index] = node;
          }}
          type="button"
          className={`glass-pebble glass-pebble-tint-${pebble.tint}`}
          onPointerDown={(event) => startDrag(event, index)}
          onPointerMove={(event) => drag(event, index)}
          onPointerUp={(event) => endDrag(event, index)}
          onPointerCancel={(event) => endDrag(event, index)}
          onClick={(event) => {
            if (event.detail === 0) navigate(pebble.route);
          }}
          aria-label={`${pebble.label}. Drag or press to open.`}
        >
          <span className="glass-pebble-body">
            <img src={pebble.asset} alt="" draggable="false" />
            <span className="glass-pebble-sheen" aria-hidden="true" />
          </span>
          <span className="glass-pebble-label">{pebble.label}</span>
        </button>
      ))}
    </div>
  );
}
