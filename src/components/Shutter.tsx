import { useEffect, useRef, useState } from "react";
import shutterDesign from "@/assets/shutter-design.jpg.asset.json";
import shutterSound from "@/assets/shutter-sound.mp3.asset.json";
import afterOpenSound from "@/assets/after-open.mp3.asset.json";

/* ---------- Marigold + Leaf (SVG) ---------- */
function Marigold({ delay = 0, size = 44 }: { delay?: number; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="marigold" style={{ animationDelay: `${delay}s` }}>
      <g transform="translate(50 50)">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx="0" cy="-28" rx="12" ry="20" fill="#f59e0b" opacity="0.95" transform={`rotate(${(i * 360) / 12})`} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <ellipse key={`b${i}`} cx="0" cy="-20" rx="10" ry="16" fill="#ea580c" transform={`rotate(${(i * 360) / 10 + 18})`} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={`c${i}`} cx="0" cy="-12" rx="8" ry="12" fill="#b91c1c" transform={`rotate(${(i * 360) / 8})`} />
        ))}
        <circle r="6" fill="#7c2d12" />
      </g>
    </svg>
  );
}

function Leaf({ delay = 0 }: { delay?: number }) {
  return (
    <svg width="26" height="34" viewBox="0 0 40 60" className="marigold" style={{ animationDelay: `${delay}s` }}>
      <path d="M20 2 C 4 20, 4 40, 20 58 C 36 40, 36 20, 20 2 Z" fill="#166534" />
      <path d="M20 6 L20 54" stroke="#052e16" strokeWidth="1.5" />
    </svg>
  );
}

/* ---------- Toran (garland) ---------- */
function Toran() {
  const [count, setCount] = useState(28);
  useEffect(() => {
    const update = () => setCount(window.innerWidth < 640 ? 14 : window.innerWidth < 1024 ? 20 : 28);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const items = Array.from({ length: count });
  return (
    <div className="toran-wrap pointer-events-none absolute inset-x-0 top-0 z-30">
      <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px]">
        <path d="M0 10 Q 250 55 500 20 T 1000 15" stroke="#78350f" strokeWidth="3" fill="none" />
      </svg>
      <div className="absolute inset-x-0 top-2 flex justify-between px-1 sm:px-2">
        {items.map((_, i) => {
          const isLeaf = i % 4 === 1 || i % 4 === 3;
          const delay = (i % 6) * 0.25;
          const drop = 14 + Math.sin(i * 0.8) * 14;
          const mSize = i % 2 === 0 ? 34 : 28;
          const dSize = i % 2 === 0 ? 46 : 38;
          return (
            <div key={i} className="flex flex-col items-center shrink-0" style={{ transform: `translateY(${drop}px)` }}>
              {isLeaf ? <Leaf delay={delay} /> : <Marigold delay={delay} size={typeof window !== "undefined" && window.innerWidth < 640 ? mSize : dSize} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Shutter (main) ---------- */
export function Shutter() {
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const afterAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        trigger();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function trigger() {
    if (open) {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
      if (afterAudioRef.current) { afterAudioRef.current.pause(); afterAudioRef.current.currentTime = 0; }
      setOpen(false);
      setReset((n) => n + 1);
      return;
    }
    try {
      if (!audioRef.current) { audioRef.current = new Audio(shutterSound.url); audioRef.current.preload = "auto"; }
      if (!afterAudioRef.current) { afterAudioRef.current = new Audio(afterOpenSound.url); afterAudioRef.current.preload = "auto"; }
      audioRef.current.currentTime = 0;
      void audioRef.current.play();
      const shutterEl = audioRef.current;
      const onEnded = () => {
        try {
          if (afterAudioRef.current) { afterAudioRef.current.currentTime = 0; void afterAudioRef.current.play(); }
        } catch { /* ignore */ }
        shutterEl.removeEventListener("ended", onEnded);
      };
      shutterEl.addEventListener("ended", onEnded);
    } catch { /* ignore */ }
    setOpen(true);
  }

  return (
    <div
      key={reset}
      className="relative h-screen w-screen overflow-hidden bg-black select-none cursor-pointer"
      onClick={trigger}
      role="button"
      tabIndex={0}
      aria-label="Pull shutter up"
    >
      <img src={shutterDesign.url} alt="Chanchal Man dukaan design" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-20 h-[68px] shutter-housing" />
      <div className={`shutter absolute inset-x-0 top-[68px] z-10 origin-top ${open ? "shutter-open" : ""}`}>
        <div className="shutter-metal h-full w-full" />
        <div className="shutter-handle" />
      </div>
      <Toran />
      <div className={`pointer-events-none absolute inset-x-0 bottom-8 z-40 text-center text-sm tracking-[0.3em] text-amber-100/90 transition-opacity duration-500 ${open ? "opacity-0" : "opacity-100 animate-pulse"}`}>
        TAP · CLICK · SPACE — खोलिए
      </div>
      {open && (
        <button
          onClick={(e) => { e.stopPropagation(); setOpen(false); setReset((n) => n + 1); }}
          className="absolute bottom-6 right-6 z-40 rounded-full border border-amber-100/40 bg-black/40 px-4 py-2 text-xs tracking-widest text-amber-100 backdrop-blur hover:bg-black/60"
        >
          CLOSE SHUTTER
        </button>
      )}
    </div>
  );
}
