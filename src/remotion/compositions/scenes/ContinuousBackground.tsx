import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  interpolateColors,
  AbsoluteFill,
} from "remotion";
import { Noise } from "../../library/components/effects/Noise";
import { FloatingOrbs } from "./FloatingOrbs";

/**
 * Continuous background layer that lives behind all scenes.
 * Colors morph smoothly across the full timeline so transitions
 * never reveal a jarring background mismatch.
 */

interface ContinuousBackgroundProps {
  /** Frame where each scene starts (after transition math) */
  sceneBreaks: number[];
  /** Total composition duration */
  totalDuration: number;
}

// Each scene's color palette  [topLeft, topRight, bottomLeft, bottomRight]
const SCENE_PALETTES: [string, string, string, string][] = [
  ["#FF206E", "#A855F7", "#41EAD4", "#3B82F6"], // Scene 1 – Intro
  ["#A855F7", "#3B82F6", "#FF206E", "#6366F1"], // Scene 2 – Glass Cards
  ["#6366F1", "#FF206E", "#0EA5E9", "#A855F7"], // Scene 3 – Notifications
  ["#FF206E", "#FBFF12", "#41EAD4", "#A855F7"], // Scene 4 – Finale
];

function lerpColor(a: string, b: string, t: number): string {
  return interpolateColors(t, [0, 1], [a, b]);
}

export const ContinuousBackground: React.FC<ContinuousBackgroundProps> = ({
  sceneBreaks,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame / fps) * 0.35;

  // Determine which palette segment we're in and blend progress
  let segIndex = 0;
  let blendProgress = 0;

  for (let i = 0; i < sceneBreaks.length - 1; i++) {
    if (frame >= sceneBreaks[i]) {
      segIndex = i;
      const segStart = sceneBreaks[i];
      const segEnd = sceneBreaks[i + 1];
      blendProgress = interpolate(frame, [segStart, segEnd], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
  }

  const paletteA =
    SCENE_PALETTES[Math.min(segIndex, SCENE_PALETTES.length - 1)];
  const paletteB =
    SCENE_PALETTES[Math.min(segIndex + 1, SCENE_PALETTES.length - 1)];

  const c0 = lerpColor(paletteA[0], paletteB[0], blendProgress);
  const c1 = lerpColor(paletteA[1], paletteB[1], blendProgress);
  const c2 = lerpColor(paletteA[2], paletteB[2], blendProgress);
  const c3 = lerpColor(paletteA[3], paletteB[3], blendProgress);

  // Animated blob positions
  const x1 = 30 + Math.sin(t * 0.7) * 20;
  const y1 = 20 + Math.cos(t * 0.5) * 15;
  const x2 = 70 + Math.cos(t * 0.6) * 20;
  const y2 = 25 + Math.sin(t * 0.8) * 15;
  const x3 = 25 + Math.sin(t * 0.9 + 1) * 20;
  const y3 = 75 + Math.cos(t * 0.4) * 15;
  const x4 = 75 + Math.cos(t * 0.5 + 2) * 20;
  const y4 = 80 + Math.sin(t * 0.7 + 1) * 15;

  const bgImage = `
    radial-gradient(circle at ${x1}% ${y1}%, ${c0} 0%, transparent 55%),
    radial-gradient(circle at ${x2}% ${y2}%, ${c1} 0%, transparent 55%),
    radial-gradient(circle at ${x3}% ${y3}%, ${c2} 0%, transparent 55%),
    radial-gradient(circle at ${x4}% ${y4}%, ${c3} 0%, transparent 55%)
  `;

  // Orb colors also morph
  const orbColors = [`${c0}90`, `${c1}80`, `${c2}70`, `${c3}80`];

  return (
    <AbsoluteFill>
      {/* Mesh gradient base */}
      <AbsoluteFill
        style={{
          backgroundColor: "#0C0F0A",
          backgroundImage: bgImage,
        }}
      />

      {/* Continuous floating orbs */}
      <FloatingOrbs
        count={16}
        colors={orbColors}
        seed="bg-orbs"
        minSize={4}
        maxSize={14}
      />

      {/* Film grain texture */}
      <Noise type="grain" intensity={0.25} speed={0.4} opacity={0.12} />
    </AbsoluteFill>
  );
};
