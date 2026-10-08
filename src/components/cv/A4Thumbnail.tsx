import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

const A4_W = 794;
const A4_H = 1123;

/** Affiche une feuille A4 complète réduite à la largeur de son conteneur. */
export function A4Thumbnail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / A4_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-white"
      style={{ aspectRatio: `${A4_W} / ${A4_H}` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0"
        style={{
          width: A4_W,
          height: A4_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
