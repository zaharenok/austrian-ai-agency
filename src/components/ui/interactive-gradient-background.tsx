'use client';

import { useEffect, useRef } from 'react';

export function InteractiveGradientBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const handlePointerMove = (e: PointerEvent) => {
      const { currentTarget, clientX: x, clientY: y } = e;
      const target = currentTarget as HTMLElement;
      const { top: t, left: l, width: w, height: h } = target.getBoundingClientRect();
      target.style.setProperty('--posX', `${x - l - w / 2}`);
      target.style.setProperty('--posY', `${y - t - h / 2}`);
    };

    el.addEventListener('pointermove', handlePointerMove);
    return () => el.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 -z-10"
      style={{
        '--posX': '0',
        '--posY': '0',
        backgroundImage: `
          linear-gradient(115deg, rgb(211 255 215), rgb(0 0 0)),
          radial-gradient(90% 100% at calc(50% + var(--x)) calc(0% + var(--y)), rgb(200 200 200), rgb(22 0 45)),
          radial-gradient(100% 100% at calc(80% - var(--x)) calc(0% - var(--y)), rgb(250 255 0), rgb(36 0 0)),
          radial-gradient(150% 210% at calc(100% + var(--x)) calc(0% + var(--y)), rgb(20 175 125), rgb(0 10 255)),
          radial-gradient(100% 100% at calc(100% - var(--x)) calc(30% - var(--y)), rgb(255 77 0), rgb(0 200 255)),
          linear-gradient(60deg, rgb(255 0 0), rgb(120 86 255))
        `,
        backgroundBlendMode: 'overlay, overlay, difference, difference, difference, normal',
        '--x': 'calc(var(--posX, 0) * 1px)',
        '--y': 'calc(var(--posY, 0) * 1px)',
      } as React.CSSProperties}
    />
  );
}
