import React from "react";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";

interface MeshGradientBgProps {
  colors?: [string, string, string, string];
  speed?: number;
}

export const MeshGradientBg: React.FC<MeshGradientBgProps> = ({
  colors = ["#FF206E", "#41EAD4", "#FBFF12", "#A855F7"],
  speed = 0.3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) * speed;

  const x1 = 30 + Math.sin(t * 0.7) * 20;
  const y1 = 20 + Math.cos(t * 0.5) * 15;
  const x2 = 70 + Math.cos(t * 0.6) * 20;
  const y2 = 25 + Math.sin(t * 0.8) * 15;
  const x3 = 25 + Math.sin(t * 0.9 + 1) * 20;
  const y3 = 75 + Math.cos(t * 0.4) * 15;
  const x4 = 75 + Math.cos(t * 0.5 + 2) * 20;
  const y4 = 80 + Math.sin(t * 0.7 + 1) * 15;

  const bg = `
    radial-gradient(circle at ${x1}% ${y1}%, ${colors[0]}CC 0%, transparent 50%),
    radial-gradient(circle at ${x2}% ${y2}%, ${colors[1]}CC 0%, transparent 50%),
    radial-gradient(circle at ${x3}% ${y3}%, ${colors[2]}99 0%, transparent 50%),
    radial-gradient(circle at ${x4}% ${y4}%, ${colors[3]}CC 0%, transparent 50%)
  `;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0C0F0A",
        background: bg,
      }}
    />
  );
};
