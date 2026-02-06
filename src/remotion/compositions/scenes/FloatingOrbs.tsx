import React, { useMemo } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  random,
  AbsoluteFill,
} from "remotion";

interface FloatingOrbsProps {
  count?: number;
  colors?: string[];
  seed?: string;
  minSize?: number;
  maxSize?: number;
}

export const FloatingOrbs: React.FC<FloatingOrbsProps> = ({
  count = 12,
  colors = ["#FF206E", "#41EAD4", "#A855F7", "#FBFF12"],
  seed = "orbs",
  minSize = 4,
  maxSize = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;

  const orbs = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: random(`${seed}-x-${i}`) * width,
      y: random(`${seed}-y-${i}`) * height,
      size: minSize + random(`${seed}-s-${i}`) * (maxSize - minSize),
      color: colors[Math.floor(random(`${seed}-c-${i}`) * colors.length)],
      speedX: (random(`${seed}-sx-${i}`) - 0.5) * 30,
      speedY: (random(`${seed}-sy-${i}`) - 0.5) * 20,
      phase: random(`${seed}-p-${i}`) * Math.PI * 2,
      pulseSpeed: 0.5 + random(`${seed}-ps-${i}`) * 2,
    }));
  }, [count, colors, seed, width, height, minSize, maxSize]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {orbs.map((orb, i) => {
        const px = orb.x + Math.sin(t * 0.5 + orb.phase) * orb.speedX;
        const py = orb.y + Math.cos(t * 0.3 + orb.phase) * orb.speedY;
        const pulse = 0.6 + Math.sin(t * orb.pulseSpeed + orb.phase) * 0.4;
        const glowSize = orb.size * 3;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              backgroundColor: orb.color,
              opacity: pulse * 0.8,
              boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px ${orb.color}60`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
