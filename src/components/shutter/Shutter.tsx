import { useEffect, useRef, useState } from "react";
import shutterDesign from "@/assets/shutter-design.jpg.asset.json";
import shutterSound from "@/assets/shutter-sound.mp3.asset.json";
import afterOpenSound from "@/assets/after-open.mp3.asset.json";
import { Toran } from "./Toran";

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
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (afterAudioRef.current) {
        afterAudioRef.current.pause();
        afterAudioRef.current.currentTime = 0;
      }
      setOpen(false);
      setReset((n) => n + 1);
      return;
    }
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(shutterSound.url);
        audioRef.current.preload = "auto";
      }
      if (!afterAudioRef.current) {
        afterAudioRef.current = new Audio(afterOpenSound.url);
        afterAudioRef.current.preload = "auto";
      }
      audioRef.current.currentTime = 0;
      void audioRef.current.play();
      const shutterEl = audioRef.current;
      const onEnded = () => {
        try {
          if (afterAudioRef.current) {
            afterAudioRef.current.currentTime = 0;
            void afterAudioRef.current.play();
          }
        } catch { /* ignore */ }
        shutterEl.removeEventListener("ended", onEnded);
      };
      shutterEl.addEventListener("ended", onEnded);
    } catch {
      /* ignore */
    }
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
      <img
        src={shutterDesign.url}
        alt="Chanchal Man dukaan design"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-x-0 top-0 z-20 h-[68px] shutter-housing" />
      <div
        className={`shutter absolute inset-x-0 top-[68px] z-10 origin-top ${
          open ? "shutter-open" : ""
        }`}
      >
        <div className="shutter-metal h-full w-full" />
        <div className="shutter-handle" />
      </div>
      <Toran />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-8 z-40 text-center text-sm tracking-[0.3em] text-amber-100/90 transition-opacity duration-500 ${
          open ? "opacity-0" : "opacity-100 animate-pulse"
        }`}
      >
        TAP · CLICK · SPACE — खोलिए
      </div>
      {open && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
            setReset((n) => n + 1);
          }}
          className="absolute bottom-6 right-6 z-40 rounded-full border border-amber-100/40 bg-black/40 px-4 py-2 text-xs tracking-widest text-amber-100 backdrop-blur hover:bg-black/60"
        >
          CLOSE SHUTTER
        </button>
      )}
    </div>
  );
}
