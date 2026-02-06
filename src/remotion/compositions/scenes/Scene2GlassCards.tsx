import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  AbsoluteFill,
  Img,
} from "remotion";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Glass } from "../../library/components/effects/Glass";

const { fontFamily: headingFont } = loadSpaceGrotesk("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});
const { fontFamily: bodyFont } = loadInter("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const Scene2GlassCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card 1 entrance (from left, rotated)
  const card1Spring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const card1X = interpolate(card1Spring, [0, 1], [-200, 0]);
  const card1Rotate = interpolate(card1Spring, [0, 1], [-15, -3]);
  const card1Opacity = interpolate(card1Spring, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Card 2 entrance (from right)
  const card2Spring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const card2X = interpolate(card2Spring, [0, 1], [200, 0]);
  const card2Rotate = interpolate(card2Spring, [0, 1], [15, 3]);
  const card2Opacity = interpolate(card2Spring, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Badge pop
  const badgeSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 8, stiffness: 250 },
  });

  // "50% OFF" gradient text reveal
  const offerReveal = spring({
    frame: frame - 20,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  // Floating card hover effect
  const floatY = Math.sin((frame / fps) * 1.5) * 5;

  // Progress bar animation
  const progressWidth = interpolate(frame, [30, 90], [0, 85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Heart beat
  const heartBeat = 1 + Math.sin((frame / fps) * 4) * 0.08;

  return (
    <AbsoluteFill>
      {/* Section Label */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: spring({
            frame: frame - 3,
            fps,
            config: { damping: 20, stiffness: 100 },
          }),
        }}
      >
        <TextAnimation
          style={{
            fontFamily: headingFont,
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.03,
                ease: "power2.out",
              },
            );
            return tl;
          }}
        >
          EXCLUSIVE OFFERS
        </TextAnimation>
      </div>

      {/* Card 1 - Promo card */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: "50%",
          transform: `translateX(-50%) translateX(${card1X}px) translateY(${floatY}px) rotate(${card1Rotate}deg)`,
          opacity: card1Opacity,
          width: 320,
        }}
      >
        <Glass
          blur={18}
          opacity={0.12}
          borderRadius={24}
          borderOpacity={0.25}
          noise={0.04}
        >
          <div style={{ padding: "28px 24px" }}>
            {/* Badge */}
            <div
              style={{
                position: "absolute",
                top: -12,
                right: 20,
                transform: `scale(${badgeSpring})`,
                background: "linear-gradient(135deg, #FF206E, #FF6B6B)",
                borderRadius: 20,
                padding: "6px 16px",
                boxShadow: "0 4px 15px rgba(255, 32, 110, 0.4)",
              }}
            >
              <span
                style={{
                  fontFamily: headingFont,
                  fontSize: 12,
                  color: "white",
                  fontWeight: 700,
                }}
              >
                LIMITED
              </span>
            </div>

            {/* Offer Text */}
            <div style={{ opacity: offerReveal, marginBottom: 16 }}>
              <TextAnimation
                style={{
                  fontFamily: headingFont,
                  fontSize: 48,
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #FBFF12, #FF206E, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                }}
                createTimeline={({ textRef, tl, SplitText }) => {
                  const split = new SplitText(textRef.current, {
                    type: "chars",
                  });
                  tl.fromTo(
                    split.chars,
                    { opacity: 0, scale: 1.4, rotationX: 90 },
                    {
                      opacity: 1,
                      scale: 1,
                      rotationX: 0,
                      duration: 0.5,
                      stagger: 0.04,
                      ease: "back.out(2)",
                    },
                  );
                  return tl;
                }}
              >
                50% OFF
              </TextAnimation>
            </div>

            <p
              style={{
                fontFamily: bodyFont,
                fontSize: 14,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.5,
                marginTop: 4,
              }}
            >
              Premium collection available now
            </p>

            {/* Progress bar */}
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Claimed
                </span>
                <span
                  style={{
                    fontFamily: headingFont,
                    fontSize: 11,
                    color: "#41EAD4",
                  }}
                >
                  {Math.round(progressWidth)}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progressWidth}%`,
                    height: "100%",
                    borderRadius: 3,
                    background: "linear-gradient(90deg, #41EAD4, #A855F7)",
                    boxShadow: "0 0 10px #41EAD450",
                  }}
                />
              </div>
            </div>
          </div>
        </Glass>
      </div>

      {/* Card 2 - Social Engagement */}
      <div
        style={{
          position: "absolute",
          top: 500,
          left: "50%",
          transform: `translateX(-50%) translateX(${card2X}px) translateY(${-floatY}px) rotate(${card2Rotate}deg)`,
          opacity: card2Opacity,
          width: 320,
        }}
      >
        <Glass
          blur={18}
          opacity={0.12}
          borderRadius={24}
          borderOpacity={0.25}
          noise={0.04}
        >
          <div style={{ padding: "24px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #41EAD4, #3B82F6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img
                  src="https://api.iconify.design/ph:user-fill.svg?color=%23ffffff&width=24"
                  style={{ width: 24, height: 24 }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: headingFont,
                    fontSize: 15,
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  @designstudio
                </div>
                <div
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  2 min ago
                </div>
              </div>
            </div>

            <TextAnimation
              style={{
                fontFamily: bodyFont,
                fontSize: 16,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.6,
              }}
              createTimeline={({ textRef, tl, SplitText }) => {
                const split = new SplitText(textRef.current, { type: "words" });
                tl.fromTo(
                  split.words,
                  { opacity: 0, y: 8 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.05,
                    ease: "power2.out",
                  },
                );
                return tl;
              }}
            >
              Creating magic with every pixel ✨
            </TextAnimation>

            {/* Engagement bar */}
            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 18,
                paddingTop: 14,
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {[
                {
                  icon: "ph:heart-fill",
                  color: "%23FF206E",
                  label: "2.4k",
                  beat: true,
                },
                {
                  icon: "ph:chat-circle-fill",
                  color: "%2341EAD4",
                  label: "128",
                  beat: false,
                },
                {
                  icon: "ph:share-fill",
                  color: "%23A855F7",
                  label: "56",
                  beat: false,
                },
              ].map((item, idx) => {
                const iconSpring = spring({
                  frame: frame - 40 - idx * 4,
                  fps,
                  config: { damping: 10, stiffness: 200 },
                });
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      opacity: iconSpring,
                      transform: `scale(${iconSpring * (item.beat ? heartBeat : 1)})`,
                    }}
                  >
                    <Img
                      src={`https://api.iconify.design/${item.icon}.svg?color=${item.color}&width=18`}
                      style={{ width: 18, height: 18 }}
                    />
                    <span
                      style={{
                        fontFamily: bodyFont,
                        fontSize: 12,
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Glass>
      </div>
    </AbsoluteFill>
  );
};
