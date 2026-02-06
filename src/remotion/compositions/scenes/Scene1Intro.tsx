import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  AbsoluteFill,
  Img,
} from "remotion";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { MeshGradientBg } from "./MeshGradientBg";
import { FloatingOrbs } from "./FloatingOrbs";
import { Noise } from "../../library/components/effects/Noise";

const { fontFamily: headingFont } = loadSpaceGrotesk("normal", {
  weights: ["700"],
  subsets: ["latin"],
});

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flash overlay for impact
  const flashOpacity = interpolate(frame, [0, 4, 12], [1, 0.8, 0], {
    extrapolateRight: "clamp",
  });

  // Main title spring
  const titleSpring = spring({ frame: frame - 6, fps, config: { damping: 12, stiffness: 180, mass: 1.2 } });
  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.7, 1]);

  // Subtitle entrance
  const subSpring = spring({ frame: frame - 18, fps, config: { damping: 15, stiffness: 120 } });
  const subY = interpolate(subSpring, [0, 1], [40, 0]);

  // Decorative line
  const lineWidth = spring({ frame: frame - 12, fps, config: { damping: 20, stiffness: 100 } });

  // Emoji/icon pop-ins (staggered)
  const icon1 = spring({ frame: frame - 22, fps, config: { damping: 8, stiffness: 200 } });
  const icon2 = spring({ frame: frame - 26, fps, config: { damping: 8, stiffness: 200 } });
  const icon3 = spring({ frame: frame - 30, fps, config: { damping: 8, stiffness: 200 } });

  // Pulse ring
  const ringProgress = interpolate(frame, [10, 60], [0, 1], { extrapolateRight: "clamp" });
  const ringScale = interpolate(ringProgress, [0, 1], [0.5, 2.5]);
  const ringOpacity = interpolate(ringProgress, [0, 0.3, 1], [0, 0.5, 0]);

  // Background rotation for depth
  const bgRotate = interpolate(frame, [0, 120], [0, 3], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Animated mesh gradient BG */}
      <div style={{ transform: `rotate(${bgRotate}deg) scale(1.1)` }}>
        <MeshGradientBg
          colors={["#FF206E", "#A855F7", "#41EAD4", "#3B82F6"]}
          speed={0.4}
        />
      </div>

      {/* Floating orbs */}
      <FloatingOrbs
        count={15}
        colors={["#FF206E80", "#41EAD480", "#A855F780", "#FBFF1280"]}
        seed="intro-orbs"
        minSize={3}
        maxSize={8}
      />

      {/* Subtle noise texture */}
      <Noise type="grain" intensity={0.3} speed={0.5} opacity={0.15} />

      {/* Pulse ring effect */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "2px solid #41EAD4",
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          opacity: ringOpacity,
        }}
      />

      {/* Content Container */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 40px",
        }}
      >
        {/* Decorative line */}
        <div
          style={{
            position: "absolute",
            top: "32%",
            left: "50%",
            transform: "translateX(-50%)",
            width: `${lineWidth * 120}px`,
            height: 3,
            background: "linear-gradient(90deg, transparent, #41EAD4, transparent)",
            borderRadius: 2,
          }}
        />

        {/* Main Title */}
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            transform: `translate(-50%, -50%) translateY(${titleY}px) scale(${titleScale})`,
            textAlign: "center",
            width: "100%",
            padding: "0 32px",
          }}
        >
          <TextAnimation
            className="text-balance"
            style={{
              fontFamily: headingFont,
              fontSize: 62,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              textShadow: "0 0 40px rgba(65, 234, 212, 0.5), 0 4px 20px rgba(0,0,0,0.5)",
              letterSpacing: "-1px",
            }}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.fromTo(
                split.chars,
                { opacity: 0, y: 30, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.03, ease: "back.out(1.7)" }
              );
              return tl;
            }}
          >
            FRESH STORIES
          </TextAnimation>
        </div>

        {/* Subtitle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) translateY(${subY}px)`,
            opacity: subSpring,
            textAlign: "center",
            width: "100%",
            padding: "0 48px",
          }}
        >
          <TextAnimation
            style={{
              fontFamily: headingFont,
              fontSize: 22,
              fontWeight: 500,
              color: "#41EAD4",
              letterSpacing: "6px",
              textTransform: "uppercase",
            }}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.fromTo(
                split.chars,
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.04, ease: "power3.out" }
              );
              return tl;
            }}
          >
            TRENDING NOW
          </TextAnimation>
        </div>

        {/* Floating emoji icons */}
        <div
          style={{
            position: "absolute",
            top: "62%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 28,
          }}
        >
          {[
            { scale: icon1, icon: "ph:fire-fill", color: "%23FF206E" },
            { scale: icon2, icon: "ph:lightning-fill", color: "%2341EAD4" },
            { scale: icon3, icon: "ph:star-four-fill", color: "%23FBFF12" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                transform: `scale(${item.scale})`,
                opacity: item.scale,
              }}
            >
              <Img
                src={`https://api.iconify.design/${item.icon}.svg?color=${item.color}&width=36`}
                style={{ width: 36, height: 36 }}
              />
            </div>
          ))}
        </div>

        {/* Swipe indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: interpolate(frame, [40, 55], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 30,
                height: 50,
                borderRadius: 15,
                border: "2px solid rgba(255,255,255,0.4)",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  position: "absolute",
                  left: "50%",
                  top: interpolate(
                    frame % 40,
                    [0, 20, 40],
                    [10, 30, 10]
                  ),
                  transform: "translateX(-50%)",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: headingFont,
                fontSize: 11,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              SWIPE
            </span>
          </div>
        </div>
      </AbsoluteFill>

      {/* Flash overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: "white",
          opacity: flashOpacity,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
