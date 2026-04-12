import React, { useRef, useEffect, useMemo } from 'react';
import {
  motion,
  useMotionValue, useSpring, useTransform,
  useInView, animate
} from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Leaf, ChevronDown, ArrowRight, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '', duration = 2, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    const ctrl = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) { if (node) node.textContent = Math.round(v) + suffix; },
    });
    return () => ctrl.stop();
  }, [inView, to, duration, delay, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// ─── Animated Bar Chart ───────────────────────────────────────────────────────
const BAR_DATA = [
  { label: 'UAE',   value: 88, color: '#22c55e' },
  { label: 'UK',    value: 62, color: '#4ade80' },
  { label: 'USA',   value: 75, color: '#86efac' },
  { label: 'Japan', value: 50, color: '#16a34a' },
  { label: 'KSA',   value: 70, color: '#15803d' },
];

function BarChart() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="w-full">
      <div className="flex items-end justify-between gap-2 h-24">
        {BAR_DATA.map((b, i) => (
          <div key={b.label} className="flex flex-col items-center gap-1.5 flex-1">
            <div className="relative w-full flex items-end justify-center h-20">
              <motion.div
                initial={{ height: 0 }}
                animate={inView ? { height: `${b.value}%` } : {}}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-t-md"
                style={{ background: `linear-gradient(to top, ${b.color}cc, ${b.color})` }}
              />
            </div>
            <span className="text-[9px] font-semibold text-[#166534]/70 tracking-wide">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── World Map with Route Lines ───────────────────────────────────────────────
// Simplified SVG world outline + curved export routes from India (origin ~56%,45%)
const ROUTES = [
  { id: 'uae',   d: 'M 510,268  Q 540,230 560,215', label: 'UAE',    cx: 565, cy: 210, delay: 0.2 },
  { id: 'uk',    d: 'M 510,268  Q 440,180 370,150', label: 'UK',     cx: 365, cy: 145, delay: 0.5 },
  { id: 'usa',   d: 'M 510,268  Q 380,160 200,175', label: 'USA',    cx: 192, cy: 170, delay: 0.8 },
  { id: 'japan', d: 'M 510,268  Q 590,230 650,200', label: 'Japan',  cx: 658, cy: 195, delay: 1.1 },
  { id: 'ksa',   d: 'M 510,268  Q 520,240 530,220', label: 'KSA',    cx: 534, cy: 215, delay: 1.4 },
];

function WorldMap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <svg
        viewBox="0 0 800 420"
        className="w-full h-auto"
        style={{ maxHeight: 220 }}
      >
        <defs>
          <radialGradient id="mapGlow" cx="65%" cy="60%" r="30%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Simplified flat world continents */}
        {/* North America */}
        <path d="M 60,120 Q 80,90 130,100 L150,150 Q140,190 120,200 L90,195 Q60,170 60,120Z"
          fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.8" />
        {/* South America */}
        <path d="M 130,220 L160,210 Q175,250 165,300 L140,320 Q115,300 120,260Z"
          fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.8" />
        {/* Europe */}
        <path d="M 355,100 Q 375,90 400,95 L420,120 Q405,140 380,145 L355,135Z"
          fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.8" />
        {/* Africa */}
        <path d="M 370,160 Q400,150 420,165 L435,220 Q430,270 400,290 L375,275 Q355,230 360,180Z"
          fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.8" />
        {/* Middle East */}
        <path d="M 480,195 L515,190 Q530,205 525,230 L500,240 Q475,230 475,210Z"
          fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.8" />
        {/* India */}
        <path d="M 520,245 Q540,240 550,255 L545,285 Q535,300 520,295 Q505,280 510,260Z"
          fill="#16a34a" stroke="#15803d" strokeWidth="1.2" filter="url(#glow)" />
        {/* China/East Asia */}
        <path d="M 590,150 Q640,140 670,160 L680,195 Q655,210 620,205 L590,185Z"
          fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.8" />
        {/* Japan */}
        <path d="M 670,175 Q680,170 690,178 L688,195 Q678,200 668,195Z"
          fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.8" />
        {/* Australia */}
        <path d="M 640,290 Q685,280 710,300 L715,340 Q690,360 655,355 L630,335 Q620,310 640,290Z"
          fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.8" />

        {/* Glow beneath India */}
        <circle cx="530" cy="268" r="45" fill="url(#mapGlow)" />

        {/* Route Lines */}
        {ROUTES.map((r) => (
          <motion.path
            key={r.id}
            d={r.d}
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="120"
            initial={{ strokeDashoffset: 120, opacity: 0 }}
            animate={inView ? { strokeDashoffset: 0, opacity: 0.8 } : {}}
            transition={{ duration: 1, delay: r.delay, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 0 3px #22c55e)' }}
          />
        ))}

        {/* Travelling pulse dots on routes */}
        {inView && ROUTES.map((r) => (
          <motion.circle
            key={`dot-${r.id}`}
            r="3"
            fill="#22c55e"
            style={{ filter: 'drop-shadow(0 0 4px #22c55e)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: r.delay + 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <animateMotion dur="2s" repeatCount="indefinite" begin={`${r.delay + 0.8}s`}>
              <mpath href={`#path-${r.id}`} />
            </animateMotion>
          </motion.circle>
        ))}

        {/* Hidden paths for animateMotion */}
        {ROUTES.map((r) => (
          <path key={`hidden-${r.id}`} id={`path-${r.id}`} d={r.d} fill="none" stroke="none" />
        ))}

        {/* Destination pulsing circles */}
        {ROUTES.map((r) => (
          <g key={`dest-${r.id}`}>
            <motion.circle
              cx={r.cx} cy={r.cy} r="5"
              fill="#22c55e"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 0.9 } : {}}
              transition={{ duration: 0.4, delay: r.delay + 0.9 }}
              style={{ filter: 'drop-shadow(0 0 4px #22c55e)', transformOrigin: `${r.cx}px ${r.cy}px` }}
            />
            <motion.circle
              cx={r.cx} cy={r.cy} r="9"
              fill="none"
              stroke="#22c55e"
              strokeWidth="1"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={inView ? { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] } : {}}
              transition={{ duration: 2.2, delay: r.delay + 1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${r.cx}px ${r.cy}px` }}
            />
            <motion.text
              x={r.cx + 8} y={r.cy + 4}
              fontSize="8" fontWeight="700" fill="#166534" fontFamily="Poppins, sans-serif"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: r.delay + 1.1 }}
            >
              {r.label}
            </motion.text>
          </g>
        ))}

        {/* India origin dot + label */}
        <circle cx="530" cy="268" r="6" fill="#15803d" style={{ filter: 'drop-shadow(0 0 6px #16a34a)' }} />
        <motion.circle
          cx="530" cy="268" r="14"
          fill="none" stroke="#16a34a" strokeWidth="1.5"
          animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '530px 268px' }}
        />
        <text x="540" y="260" fontSize="9" fontWeight="800" fill="#14532d" fontFamily="Poppins, sans-serif">🇮🇳 India</text>
      </svg>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Hero({ scrollTo }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 30, stiffness: 90 };
  const smX = useSpring(mouseX, springCfg);
  const smY = useSpring(mouseY, springCfg);
  const bgX = useTransform(smX, [-0.5, 0.5], [20, -20]);
  const bgY = useTransform(smY, [-0.5, 0.5], [20, -20]);
  const midX = useTransform(smX, [-0.5, 0.5], [30, -30]);
  const midY = useTransform(smY, [-0.5, 0.5], [30, -30]);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        scale: 0.92, y: -80, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const particles = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    id: i,
    size: Math.random() * 3.5 + 1.5,
    left: `${Math.random() * 100}%`,
    top: `${75 + Math.random() * 25}%`,
    duration: Math.random() * 14 + 10,
    delay: Math.random() * 7,
    color: i % 2 === 0 ? '#c8a84b' : '#4ade80',
  })), []);

  const words = 'Naturally Fresh, Globally Delivered'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex items-center justify-center h-[100vh] min-h-[700px] overflow-hidden"
      style={{ backgroundColor: '#f0fdf4' }}
    >
      {/* ── Background base */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, #dcfce7 0%, #f0fdf4 45%, #fef9ee 100%)' }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain2">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain2)" />
        </svg>
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #15803d 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
      </div>

      {/* ── Organic blobs */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 z-0 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 12, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[15%] -left-[10%] w-[700px] h-[700px] rounded-full blur-[140px]"
          style={{ background: 'rgba(134,239,172,0.30)' }} />
        <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, -10, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-[10%] -right-[5%] w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{ background: 'rgba(253,224,71,0.12)' }} />
      </motion.div>

      {/* ── Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div key={p.id}
            animate={{ y: [0, -300], opacity: [0, 0.6, 0], rotate: [0, 360] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
            className="absolute rounded-full"
            style={{ width: p.size, height: p.size, left: p.left, top: p.top, backgroundColor: p.color, filter: 'blur(0.5px)' }}
          />
        ))}
      </div>

      {/* ── Layer: floating leaves (parallax mid) */}
      <motion.div style={{ x: midX, y: midY }} className="absolute inset-0 z-0 pointer-events-none">
        <motion.div animate={{ y: [0, -24, 0], rotate: [0, 20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[3%] opacity-[0.10]">
          <Leaf className="w-20 h-20 text-[#15803d]" />
        </motion.div>
        <motion.div animate={{ y: [0, 28, 0], rotate: [0, -18, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-[22%] left-[8%] opacity-[0.08]">
          <Leaf className="w-14 h-14 text-[#16a34a]" />
        </motion.div>
      </motion.div>

      {/* ── Main content: two-column grid */}
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto px-5 pt-24 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

        {/* LEFT: Text + CTA */}
        <div className="flex flex-col items-start">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 border shadow-sm"
            style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', borderColor: 'rgba(22,101,52,0.18)', color: '#14532d' }}
          >
            <Award className="w-4 h-4 text-[#16a34a]" />
            <span className="text-sm font-semibold tracking-wide uppercase">Trusted Global Exporter</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] leading-[1.08] tracking-tight mb-5 text-[#0f3d2e]">
            {words.map((word, i) => {
              const accent = word === 'Globally' || word === 'Delivered';
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 44, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block mr-[0.22em] last:mr-0 ${accent
                    ? 'bg-gradient-to-br from-[#16a34a] via-[#4ade80] to-[#a3e635] bg-clip-text text-transparent'
                    : ''}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base lg:text-lg leading-relaxed max-w-xl mb-8 font-medium"
            style={{ color: 'rgba(15,61,46,0.68)' }}
          >
            Exporting premium Indian agricultural products worldwide while supporting local farmers and celebrating authentic flavors.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-6 sm:gap-8 mb-8"
          >
            {[
              { val: 30, suffix: '+', label: 'Countries' },
              { val: 98, suffix: '%', label: 'On-time delivery' },
              { val: 5, suffix: '+', label: 'Years exporting' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#15803d]">
                  <Counter to={s.val} suffix={s.suffix} delay={1.5} />
                </span>
                <span className="text-xs text-[#166534]/60 font-medium mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(22,163,74,0.35)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('Products')}
              className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-white text-sm shadow-xl"
              style={{ background: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)', boxShadow: '0 8px 28px rgba(22,163,74,0.28)' }}
            >
              <Leaf className="w-4 h-4" />
              Explore Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(22,163,74,0.08)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('Contact')}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full font-bold text-[#15803d] text-sm border-2 border-[#16a34a]/25 backdrop-blur-md transition-all"
              style={{ background: 'rgba(255,255,255,0.65)' }}
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>

        {/* RIGHT: Animated Map + Chart Card — visible on all screens, stacked below on mobile */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4"
        >
          {/* World Map Card */}
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(22,163,74,0.18)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="rounded-3xl p-5 border"
            style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(18px)', borderColor: 'rgba(22,101,52,0.12)', boxShadow: '0 8px 40px rgba(22,163,74,0.10)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-bold text-[#0f3d2e]">Global Export Routes</div>
                <div className="text-[11px] text-[#166534]/60 font-medium">Live trade connections from India</div>
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                LIVE
              </div>
            </div>
            <WorldMap />
          </motion.div>

          {/* Bar Chart Card */}
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(22,163,74,0.18)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="rounded-3xl p-5 border"
            style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(18px)', borderColor: 'rgba(22,101,52,0.12)', boxShadow: '0 8px 40px rgba(22,163,74,0.10)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-bold text-[#0f3d2e]">Export Volume by Region</div>
                <div className="text-[11px] text-[#166534]/60 font-medium">Metric tonnes — FY 2025</div>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> +34% YoY
              </div>
            </div>
            <BarChart />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center">
          <div className="w-[1.5px] h-12 bg-gradient-to-b from-transparent via-[#16a34a]/50 to-[#16a34a]" />
          <div className="w-9 h-9 rounded-full flex items-center justify-center border shadow-md -mt-2"
            style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(10px)', borderColor: 'rgba(22,163,74,0.2)' }}>
            <ChevronDown className="w-4 h-4 text-[#15803d]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
