"use client";

// Baseras på "Glowing Shadow" av designali-in (21st.dev, demo-id 5655).
// Anpassad variant för Lins & Lager: fast sepiaguld (#C8A96E) i stället för
// färgcykling, responsiv bredd runt godtyckligt innehåll och subtilare
// opacitet. Respekterar prefers-reduced-motion.

import { type ReactNode } from "react";

interface GlowingShadowProps {
  children: ReactNode;
  className?: string;
}

export function GlowingShadow({ children, className }: GlowingShadowProps) {
  return (
    <>
      <style>{`
        @property --ll-rotate {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }

        .ll-glow-container {
          --ll-glow-color: hsl(38deg 45% 62%); /* #C8A96E sepiaguld */
          --ll-animation-speed: 7s;
          position: relative;
          display: block;
          isolation: isolate;
          border-radius: calc(var(--radius) + 12px);
          box-shadow: 0 0 52px -8px hsl(38deg 40% 55% / 0.28);
        }

        .ll-glow {
          display: block;
          position: absolute;
          inset: -18%;
          z-index: -1;
          pointer-events: none;
          animation: ll-orbit var(--ll-animation-speed) linear infinite;
        }

        .ll-glow:after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 42%;
          aspect-ratio: 1;
          border-radius: 50%;
          transform: translate(-50%, -50%) rotateZ(calc(var(--ll-rotate) * 1deg)) translateY(-52%);
          background: radial-gradient(closest-side, var(--ll-glow-color), transparent);
          filter: blur(26px);
          opacity: 0.5;
          transition: opacity 0.5s ease;
        }

        .ll-glow-container:hover .ll-glow:after {
          opacity: 0.8;
        }

        @keyframes ll-orbit {
          from {
            --ll-rotate: 0;
          }
          to {
            --ll-rotate: 360;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ll-glow {
            animation: none;
          }
        }
      `}</style>
      <div className={className ? `ll-glow-container ${className}` : "ll-glow-container"}>
        {children}
        <span className="ll-glow" aria-hidden="true" />
      </div>
    </>
  );
}