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
import { MeshGradientBg } from "./MeshGradientBg";
import { FloatingOrbs } from "./FloatingOrbs";
import { Noise } from "../../library/components/effects/Noise";

const { fontFamily: headingFont } = loadSpaceGrotesk("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});
const { fontFamily: bodyFont } = loadInter("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

interface NotificationData {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  accent: string;
  delay: number;
}

const notifications: NotificationData[] = [
  {
    icon: "ph:bell-ringing-fill",
    iconColor: "%23FBFF12",
    title: "New follower! 🎉",
    subtitle: "Sarah just followed you",
    accent: "#FBFF12",
    delay: 5,
  },
  {
    icon: "ph:heart-fill",
    iconColor: "%23FF206E",
    title: "Your post is trending",
    subtitle: "2.4k likes in the last hour",
    accent: "#FF206E",
    delay: 18,
  },
  {
    icon: "ph:fire-fill",
    iconColor: "%23FF6B35",
    title: "Story milestone! 🔥",
    subtitle: "10k views reached",
    accent: "#FF6B35",
    delay: 32,
  },
  {
    icon: "ph:confetti-fill",
    iconColor: "%23A855F7",
    title: "Featured creator 🏆",
    subtitle: "You made the explore page!",
    accent: "#A855F7",
    delay: 45,
  },
];

export const Scene3Notifications: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleSpring = spring({ frame: frame - 3, fps, config: { damping: 15, stiffness: 120 } });

  // Phone screen glow
  const screenGlow = 0.3 + Math.sin((frame / fps) * 2) * 0.15;

  return (
    <AbsoluteFill>
      <MeshGradientBg
        colors={["#6366F1", "#FF206E", "#FBFF12", "#41EAD4"]}
        speed={0.35}
      />
      <FloatingOrbs
        count={8}
        colors={["#6366F160", "#FF206E50", "#FBFF1240"]}
        seed="notif-orbs"
        minSize={3}
        maxSize={7}
      />
      <Noise type="grain" intensity={0.25} speed={0.4} opacity={0.12} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: titleSpring,
          textAlign: "center",
          width: "100%",
          padding: "0 40px",
        }}
      >
        <TextAnimation
          className="text-balance"
          style={{
            fontFamily: headingFont,
            fontSize: 15,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              { opacity: 0 },
              { opacity: 1, duration: 0.2, stagger: 0.02, ease: "power2.out" }
            );
            return tl;
          }}
        >
          STAY UPDATED
        </TextAnimation>
      </div>

      {/* Phone frame glow */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 360,
          height: 700,
          borderRadius: 36,
          boxShadow: `0 0 60px 15px rgba(99, 102, 241, ${screenGlow})`,
          pointerEvents: "none",
        }}
      />

      {/* Notification Stack */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 340,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {notifications.map((notif, idx) => {
          const notifSpring = spring({
            frame: frame - notif.delay,
            fps,
            config: { damping: 12, stiffness: 160 },
          });
          const slideX = interpolate(notifSpring, [0, 1], [300, 0]);
          const notifOpacity = interpolate(notifSpring, [0, 0.2], [0, 1], {
            extrapolateRight: "clamp",
          });

          // Subtle wiggle after landing
          const wiggleFrame = frame - notif.delay - 15;
          const wiggle = wiggleFrame > 0 ? Math.sin(wiggleFrame * 0.5) * interpolate(wiggleFrame, [0, 20], [3, 0], { extrapolateRight: "clamp" }) : 0;

          return (
            <div
              key={idx}
              style={{
                transform: `translateX(${slideX}px) rotate(${wiggle}deg)`,
                opacity: notifOpacity,
              }}
            >
              <Glass blur={16} opacity={0.1} borderRadius={18} borderOpacity={0.2} noise={0.03}>
                <div
                  style={{
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  {/* Icon circle */}
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 14,
                      background: `${notif.accent}20`,
                      border: `1px solid ${notif.accent}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Img
                      src={`https://api.iconify.design/${notif.icon}.svg?color=${notif.iconColor}&width=22`}
                      style={{ width: 22, height: 22 }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: headingFont,
                        fontSize: 14,
                        color: "white",
                        fontWeight: 600,
                        marginBottom: 3,
                      }}
                    >
                      {notif.title}
                    </div>
                    <div
                      style={{
                        fontFamily: bodyFont,
                        fontSize: 12,
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {notif.subtitle}
                    </div>
                  </div>

                  {/* Time dot */}
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: notif.accent,
                      boxShadow: `0 0 8px ${notif.accent}60`,
                      flexShrink: 0,
                    }}
                  />
                </div>
              </Glass>
            </div>
          );
        })}
      </div>

      {/* Swipe Up CTA */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <Glass blur={14} opacity={0.12} borderRadius={30} borderOpacity={0.3}>
          <div
            style={{
              padding: "12px 32px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Img
              src="https://api.iconify.design/ph:arrow-up-bold.svg?color=%2341EAD4&width=18"
              style={{
                width: 18,
                height: 18,
                transform: `translateY(${Math.sin((frame / fps) * 3) * 4}px)`,
              }}
            />
            <span
              style={{
                fontFamily: headingFont,
                fontSize: 13,
                color: "#41EAD4",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Swipe Up
            </span>
          </div>
        </Glass>
      </div>
    </AbsoluteFill>
  );
};
