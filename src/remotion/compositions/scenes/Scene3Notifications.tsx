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

const notifications = [
  {
    icon: "ph:bell-ringing-fill",
    iconColor: "%23FBFF12",
    title: "New Follower",
    message: "Sarah just followed you",
    time: "Just now",
    accent: "#FBFF12",
  },
  {
    icon: "ph:heart-fill",
    iconColor: "%23FF206E",
    title: "Your post is trending!",
    message: "2.4k likes in 1 hour",
    time: "1m ago",
    accent: "#FF206E",
  },
  {
    icon: "ph:chat-circle-text-fill",
    iconColor: "%2341EAD4",
    title: "New Comment",
    message: '"This is amazing! 🔥"',
    time: "3m ago",
    accent: "#41EAD4",
  },
  {
    icon: "ph:share-network-fill",
    iconColor: "%23A855F7",
    title: "Shared 128 times",
    message: "Your reel went viral",
    time: "5m ago",
    accent: "#A855F7",
  },
];

export const Scene3Notifications: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Counter animation
  const counterValue = Math.min(
    9847,
    Math.round(
      interpolate(frame, [10, 70], [0, 9847], { extrapolateRight: "clamp" }),
    ),
  );

  // Heading
  const headingSpring = spring({
    frame: frame - 3,
    fps,
    config: { damping: 15, stiffness: 130 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: "50%",
          transform: `translateX(-50%) scale(${headingSpring})`,
          opacity: headingSpring,
          textAlign: "center",
        }}
      >
        <TextAnimation
          style={{
            fontFamily: headingFont,
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.fromTo(
              split.chars,
              { opacity: 0 },
              { opacity: 1, duration: 0.2, stagger: 0.03, ease: "power2.out" },
            );
            return tl;
          }}
        >
          ACTIVITY
        </TextAnimation>
      </div>

      {/* Big Counter */}
      <div
        style={{
          position: "absolute",
          top: 90,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: headingFont,
            fontSize: 56,
            fontWeight: 700,
            background: "linear-gradient(135deg, #41EAD4, #A855F7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: spring({
              frame: frame - 8,
              fps,
              config: { damping: 20, stiffness: 100 },
            }),
          }}
        >
          {counterValue.toLocaleString()}
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
            marginTop: 2,
            opacity: spring({
              frame: frame - 14,
              fps,
              config: { damping: 20, stiffness: 100 },
            }),
          }}
        >
          Total Engagements
        </div>
      </div>

      {/* Notification Stack */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: "50%",
          transform: "translateX(-50%)",
          width: 340,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {notifications.map((notif, idx) => {
          const notifDelay = 15 + idx * 8;
          const notifSpring = spring({
            frame: frame - notifDelay,
            fps,
            config: { damping: 12, stiffness: 180 },
          });
          const notifX = interpolate(
            notifSpring,
            [0, 1],
            [idx % 2 === 0 ? -150 : 150, 0],
          );
          const floatOffset = Math.sin((frame / fps) * 1.2 + idx * 0.8) * 2;

          return (
            <div
              key={idx}
              style={{
                transform: `translateX(${notifX}px) translateY(${floatOffset}px)`,
                opacity: notifSpring,
              }}
            >
              <Glass
                blur={16}
                opacity={0.1}
                borderRadius={18}
                borderOpacity={0.2}
                noise={0.03}
              >
                <div
                  style={{
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: `${notif.accent}20`,
                      border: `1px solid ${notif.accent}40`,
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
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: headingFont,
                        fontSize: 14,
                        color: "white",
                        fontWeight: 600,
                        marginBottom: 2,
                      }}
                    >
                      {notif.title}
                    </div>
                    <div
                      style={{
                        fontFamily: bodyFont,
                        fontSize: 12,
                        color: "rgba(255,255,255,0.55)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {notif.message}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: bodyFont,
                      fontSize: 10,
                      color: "rgba(255,255,255,0.35)",
                      flexShrink: 0,
                    }}
                  >
                    {notif.time}
                  </div>
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
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: interpolate(frame, [55, 70], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Glass blur={12} opacity={0.15} borderRadius={30} borderOpacity={0.3}>
          <div
            style={{
              padding: "12px 32px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Img
              src="https://api.iconify.design/ph:arrow-up-bold.svg?color=%2341EAD4&width=16"
              style={{
                width: 16,
                height: 16,
                transform: `translateY(${Math.sin((frame / fps) * 3) * 3}px)`,
              }}
            />
            <span
              style={{
                fontFamily: headingFont,
                fontSize: 13,
                color: "#41EAD4",
                fontWeight: 600,
                letterSpacing: "1px",
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
