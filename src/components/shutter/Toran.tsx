import { Marigold, Leaf } from "./Marigold";

export function Toran() {
  const items = Array.from({ length: 28 });
  return (
    <div className="toran-wrap pointer-events-none absolute inset-x-0 top-0 z-30">
      <svg
        viewBox="0 0 1000 60"
        preserveAspectRatio="none"
        className="w-full h-[60px]"
      >
        <path
          d="M0 10 Q 250 55 500 20 T 1000 15"
          stroke="#78350f"
          strokeWidth="3"
          fill="none"
        />
      </svg>
      <div className="absolute inset-x-0 top-2 flex justify-between px-2">
        {items.map((_, i) => {
          const isLeaf = i % 4 === 1 || i % 4 === 3;
          const delay = (i % 6) * 0.25;
          const drop = 20 + Math.sin(i * 0.8) * 18;
          return (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{ transform: `translateY(${drop}px)` }}
            >
              {isLeaf ? (
                <Leaf delay={delay} />
              ) : (
                <Marigold delay={delay} size={i % 2 === 0 ? 46 : 38} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
