import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const INFO_TEXTS = ["Graphic Designer", "BASED: Berlin", "hello@alexmoreau.design"];

function TypewriterInfo({ isInView }) {
  const [visibleTexts, setVisibleTexts] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const startDelay = setTimeout(() => setTyping(true), 600);
    return () => clearTimeout(startDelay);
  }, [isInView]);

  useEffect(() => {
    if (!typing || currentIndex >= INFO_TEXTS.length) return;
    const full = INFO_TEXTS[currentIndex];
    let i = 0;
    setCurrentText("");
    const timer = setInterval(() => {
      i++;
      setCurrentText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(timer);
        setTimeout(() => {
          setVisibleTexts(prev => [...prev, full]);
          setCurrentText("");
          setCurrentIndex(idx => idx + 1);
        }, 120);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [typing, currentIndex]);

  return (
    <>
      <div className="flex gap-6 leading-tight">
        {visibleTexts.slice(0, 2).map((t, i) => <span key={i}>{t}</span>)}
        {currentIndex === 2 && <span>{currentText}<span className="opacity-70">|</span></span>}
      </div>
      {visibleTexts.slice(2).map((t, i) => <div key={i + 2} className="-mt-1">{t}</div>)}
      {currentIndex > 2 && currentIndex < INFO_TEXTS.length && (
        <span>{currentText}<span className="opacity-70">|</span></span>
      )}
    </>
  );
}
import { projects } from "@/lib/projectData";

// Pre-generate fixed hotspot positions spread across the full screen
const sizes = [
  { w: 145, h: 194 },  // small portrait
  { w: 218, h: 290 },  // medium portrait
  { w: 290, h: 363 },  // large portrait
  { w: 242, h: 169 },  // landscape
  { w: 182, h: 182 },  // square
  { w: 315, h: 218 },  // wide landscape
  { w: 121, h: 218 },  // narrow portrait
  { w: 266, h: 315 },  // tall
];

// Grid column lines at 1/12 intervals (in %)
const gridLines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (i / 12) * 100);

const generateHotspots = () => {
  const spots = [];
  const placements = [
    { col: 1,  y: 22 },
    { col: 2,  y: 68 },
    { col: 4,  y: 40 },
    { col: 5,  y: 75 },
    { col: 6,  y: 18 },
    { col: 7,  y: 55 },
    { col: 9,  y: 30 },
    { col: 10, y: 72 },
    { col: 11, y: 45 },
    { col: 3,  y: 55 },
  ];

  // 2 hotspots per project: cover image at index i, first gallery image at index i+5
  const imageAssignments = [
    ...projects.map(p => p.image),
    ...projects.map((p, i) => {
      // skip video files — use next image instead
      const img = p.images.find(src => !/\.mp4$|\.webm$|\.mov$/i.test(src));
      return img || p.image;
    }),
  ];

  // Override: 3rd hotspot from right (col 9 = placement idx 6) → The Blue Shift 3rd image
  imageAssignments[6] = "https://media.base44.com/images/public/6a0c41d815b4ff33c8825d04/e96f25aed_untitled_Gemini-3-_Nano-Banana-Pro__2026-02-25_10-10-57.png";

  // Override: 6th hotspot from left (col6 = placement idx 4) → Vexta 4th image
  imageAssignments[4] = "https://media.base44.com/images/public/6a0c41d815b4ff33c8825d04/5f3283972_Screenshot_2026-05-27_at_1428.png";
  sizes[4] = { w: Math.round(182 * 1.5), h: Math.round(182 * 1.5) }; // 50% larger

  // Override: 3rd hotspot from right (idx 6) — increase size by 200%
  sizes[6] = { w: Math.round(121 * 3), h: Math.round(218 * 3) };

  // idx 0 uses projects[0].image dynamically (no override needed)

  placements.forEach((p, i) => {
    spots.push({
      id: i,
      x: gridLines[p.col - 1],
      y: p.y,
      imageUrl: imageAssignments[i],
      size: sizes[i % sizes.length],
      contain: false,
    });
  });

  // Re-enable contain for idx 4 and 6 only
  spots[4].contain = true;
  spots[6].contain = true;

  return spots;
};

const hotspots = generateHotspots();

// Mobile: 6-column grid (5 grid lines at 1/6 intervals)
const mobileGridLines = [1,2,3,4,5].map(i => (i / 6) * 100);

const mobilePlacements = [
  { col: 1, y: 8 },
  { col: 5, y: 20 },
  { col: 2, y: 35 },
  { col: 5, y: 48 },
  { col: 3, y: 62 },
  { col: 4, y: 74 },
  { col: 2, y: 88 },
  { col: 4, y: 95 },
]

const generateMobileHotspots = () => {
  const imageAssignments = [
    ...projects.map(p => p.image),
    ...projects.map((p) => {
      const img = p.images.find(src => !/\.mp4$|\.webm$|\.mov$/i.test(src));
      return img || p.image;
    }),
  ];
  imageAssignments[6] = "https://media.base44.com/images/public/6a0c41d815b4ff33c8825d04/e96f25aed_untitled_Gemini-3-_Nano-Banana-Pro__2026-02-25_10-10-57.png";
  imageAssignments[4] = "https://media.base44.com/images/public/6a0c41d815b4ff33c8825d04/5f3283972_Screenshot_2026-05-27_at_1428.png";
  return mobilePlacements.map((p, i) => ({
    id: i,
    x: mobileGridLines[p.col - 1],
    y: p.y,
    imageUrl: imageAssignments[i],
    size: { w: Math.round(sizes[i % sizes.length].w * 0.6), h: Math.round(sizes[i % sizes.length].h * 0.6) },
    contain: i === 4 || i === 6,
  }));
};

const mobileHotspots = generateMobileHotspots();

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [hoveredId, setHoveredId] = useState(null);
  const [autoId, setAutoId] = useState(null);
  const lastAutoIdRef = useRef(null);
  const activeHotspots = isMobile ? mobileHotspots : hotspots;

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    let showTimer, hideTimer;

    const cycle = () => {
      if (hoveredId !== null) return;
      let randomId = activeHotspots[Math.floor(Math.random() * activeHotspots.length)].id;
      while (randomId === lastAutoIdRef.current) {
        randomId = activeHotspots[Math.floor(Math.random() * activeHotspots.length)].id;
      }
      lastAutoIdRef.current = randomId;
      setAutoId(randomId);
      hideTimer = setTimeout(() => {
        setAutoId(null);
        showTimer = setTimeout(cycle, 1200 + Math.random() * 1800);
      }, 1500 + Math.random() * 1000);
    };

    showTimer = setTimeout(cycle, 800);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, [hoveredId]);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden"
      aria-label="Introduction"
    >
      {/* Hotspot hit areas */}
      {activeHotspots.map((spot) => (
        <div
          key={spot.id}
          className="absolute z-20"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            transform: "translate(-50%, -50%)",
            width: `${spot.size.w}px`,
            height: `${spot.size.h}px`,
          }}
          onMouseEnter={() => setHoveredId(spot.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Hotspot indicator dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0 bg-cobalt"
            style={{ width: '7.7px', height: '7.7px', marginLeft: '-3px' }}
            animate={{
              y: spot.id % 3 === 0
                ? [0, -(12 + (spot.id * 7 + 3) % 26), -(12 + (spot.id * 7 + 3) % 26), 0, 0, 0]
                : spot.id % 3 === 1
                ? [0, -(12 + (spot.id * 7 + 3) % 26), 0, 0, 0]
                : [0, -(12 + (spot.id * 7 + 3) % 26), 0]
            }}
            transition={{
              duration: (spot.id % 3 === 0 ? 4.5 : spot.id % 3 === 1 ? 3.8 : 2.2) + (spot.id * 3 + 1) % 4 * 0.4,
              times: spot.id % 3 === 0
                ? [0, 0.25, 0.55, 0.75, 0.88, 1]
                : spot.id % 3 === 1
                ? [0, 0.3, 0.6, 0.82, 1]
                : [0, 0.45, 1],
              repeat: Infinity,
              ease: "easeInOut",
              delay: (spot.id * 5 + 2) % 11 * 0.28,
            }}
          />
          <AnimatePresence>
            {(hoveredId === spot.id || (hoveredId === null && autoId === spot.id)) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.25 } }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="w-full h-full overflow-hidden pointer-events-none relative z-10"
              >
                <img
                  src={spot.imageUrl}
                  alt="Project preview"
                  className={`w-full h-full ${spot.contain ? 'object-contain' : 'object-cover'}`}
                />
                {!spot.contain && <div className="absolute inset-0 bg-charcoal/10" />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Name + Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-0"
      >
        <h1 className="font-body text-[106px] md:text-[141px] min-[1440px]:text-[9.8vw] font-light tracking-tighter whitespace-nowrap text-left text-foreground" style={{ lineHeight: 0.82 }}>
          Alex<br />Moreau
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-2 md:gap-6 text-xs md:text-sm font-mono tracking-widest uppercase text-muted-foreground mt-8 leading-none"
        >
          <TypewriterInfo isInView={isInView} />
        </motion.div>
      </motion.div>
    </section>
  );
}