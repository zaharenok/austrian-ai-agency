"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full bg-zinc-50 dark:bg-[#0E0918] text-foreground transition-bg",
        className
      )}
      {...props}
    >
        {/* n8n.io inspired gradient - warm orange/red tones on deep purple */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(35deg, rgba(238,79,39,0.15) 0%, rgba(255,155,38,0.12) 40%, rgba(107,33,239,0.1) 70%, rgba(238,79,39,0.18) 100%)",
            filter: "blur(120px)",
            opacity: mounted ? 0.3 : 0,
            transition: "opacity 1s ease-in-out",
            animation: "auroraMove 15s ease-in-out infinite alternate"
          }}
        />

        {/* Secondary accent layer with purple tones */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(circle at 70% 30%, rgba(255,155,38,0.2) 0%, rgba(255,155,38,0) 30%), radial-gradient(circle at 30% 70%, rgba(107,33,239,0.15) 0%, rgba(107,33,239,0) 30%)",
            filter: "blur(90px)",
            opacity: mounted ? 0.35 : 0,
            transition: "opacity 1s ease-in-out",
            animation: "auroraRotate 20s ease-in-out infinite"
          }}
        />

        {/* Subtle glow effect */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 10%, rgba(196,187,211,0.08) 0%, rgba(196,187,211,0) 25%)",
            opacity: mounted ? 0.4 : 0,
            transition: "opacity 1s ease-in-out",
            animation: "auroraBlink 8s ease-in-out infinite"
          }}
        />

        {showRadialGradient && (
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-background via-background/40 to-transparent" />
        )}
        
        {/* Контент */}
        <div className="relative z-20 w-full">{children}</div>

      <style jsx global>{`
        @keyframes auroraMove {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 100%;
          }
        }
        
        @keyframes auroraRotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        
        @keyframes auroraBlink {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
};
