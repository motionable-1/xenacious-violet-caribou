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
import { Glow } from "../../library/components/effects/Glow";
import { KineticText } from "../../library/components/text/KineticText";
import { Particles } from "../../library/components/effects/Particles";

const { fontFamily: headingFont } = loadSpaceGrotesk("normal", {
  weights: ["700"],
  subsets: ["latin"],
});
const { fontFamily: bodyFont } = loadInter("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const Scene4Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Big CTA entrance
  const ctaSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, stiffness: 140, mass: 1.3 },
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.3, 1]);
  const ctaRotate = interpolate(ctaSpring, [0, 1], [-8, 0]);

  // Subtitle
  const subSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  // CTA Button
  const btnSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const btnScale = interpolate(btnSpring, [0, 1], [0.5, 1]);

  // Glow pulse behind CTA
  const glowPulse = 0.6 + Math.sin((frame / fps) * 2.5) * 0.4;

  // Social icons stagger
  const socialDelay = [38, 42, 46, 50];

  // Sparkle particles trigger
  const showParticles = frame > 25;

  // Kinetic marquee visibility
  const marqueeOpacity = interpolate(frame, [10, 20], [0, 0.15], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      {/* Sparkle particles */}
      {showParticles && (
        <Particles
          type="sparks"
          count={30}
          speed={0.8}
          colors={["#FBFF12", "#41EAD4", "#FF206E", "#FFFFFF"]}
          seed="finale-sparks"
          size={[2, 5]}
          gravity={-30}
        />
      )}

      {/* Kinetic marquee backgrounds */}
      <div
        style={{
          position: "absolute",
          top: "18%",
          width: "100%",
          opacity: marqueeOpacity,
        }}
      >
        <KineticText
          fontSize={80}
          fontFamily={headingFont}
          fontWeight={700}
          color="rgba(255,255,255,0.08)"
          speed={0.8}
          gap={40}
        >
          FOLLOW • LIKE • SHARE •
        </KineticText>
      </div>
      <div
        style={{
          position: "absolute",
          top: "75%",
          width: "100%",
          opacity: marqueeOpacity,
        }}
      >
        <KineticText
          fontSize={80}
          fontFamily={headingFont}
          fontWeight={700}
          color="rgba(255,255,255,0.06)"
          speed={0.6}
          reverse
          gap={40}
        >
          CREATE • INSPIRE • CONNECT •
        </KineticText>
      </div>

      {/* Main Content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 36px",
        }}
      >
        {/* Big CTA Text */}
        <div
          style={{
            position: "absolute",
            top: "28%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${ctaScale}) rotate(${ctaRotate}deg)`,
            textAlign: "center",
            width: "100%",
            padding: "0 28px",
          }}
        >
          <TextAnimation
            className="text-balance"
            style={{
              fontFamily: headingFont,
              fontSize: 58,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              textShadow:
                "0 0 60px rgba(255, 32, 110, 0.6), 0 4px 30px rgba(0,0,0,0.4)",
            }}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.fromTo(
                split.words,
                { opacity: 0, y: 60, scale: 0.6, rotationZ: -5 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotationZ: 0,
                  duration: 0.7,
                  stagger: 0.08,
                  ease: "back.out(1.5)",
                },
              );
              return tl;
            }}
          >
            MAKE IT YOURS
          </TextAnimation>
        </div>

        {/* Subtitle */}
        <div
          style={{
            position: "absolute",
            top: "44%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: subSpring,
            textAlign: "center",
            width: "100%",
            padding: "0 50px",
          }}
        >
          <TextAnimation
            style={{
              fontFamily: bodyFont,
              fontSize: 17,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
            }}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.fromTo(
                split.words,
                { opacity: 0, y: 10 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.3,
                  stagger: 0.04,
                  ease: "power2.out",
                },
              );
              return tl;
            }}
          >
            Stand out on every platform with stunning stories
          </TextAnimation>
        </div>

        {/* CTA Button */}
        <div
          style={{
            position: "absolute",
            top: "56%",
            left: "50%",
            transform: `translateX(-50%) scale(${btnScale})`,
            opacity: btnSpring,
          }}
        >
          <Glow
            color="#FF206E"
            intensity={20 * glowPulse}
            layers={2}
            layerGrowth={1.8}
          >
            <Glass
              blur={10}
              opacity={0.2}
              borderRadius={50}
              borderOpacity={0.4}
            >
              <div
                style={{
                  padding: "16px 48px",
                  background: "linear-gradient(135deg, #FF206E, #A855F7)",
                  borderRadius: 50,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: headingFont,
                    fontSize: 16,
                    color: "white",
                    fontWeight: 700,
                    letterSpacing: "1px",
                  }}
                >
                  GET STARTED
                </span>
                <Img
                  src="https://api.iconify.design/ph:arrow-right-bold.svg?color=%23ffffff&width=18"
                  style={{ width: 18, height: 18 }}
                />
              </div>
            </Glass>
          </Glow>
        </div>

        {/* Social Icons Row */}
        <div
          style={{
            position: "absolute",
            top: "68%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 24,
          }}
        >
          {[
            { icon: "ph:instagram-logo-fill", color: "%23FF206E" },
            { icon: "ph:tiktok-logo-fill", color: "%2341EAD4" },
            { icon: "ph:twitter-logo-fill", color: "%233B82F6" },
            { icon: "ph:youtube-logo-fill", color: "%23FBFF12" },
          ].map((social, idx) => {
            const iconSpring = spring({
              frame: frame - socialDelay[idx],
              fps,
              config: { damping: 10, stiffness: 200 },
            });
            const floatY = Math.sin((frame / fps) * 2 + idx * 0.9) * 3;

            return (
              <div
                key={idx}
                style={{
                  transform: `scale(${iconSpring}) translateY(${floatY}px)`,
                  opacity: iconSpring,
                }}
              >
                <Glass
                  blur={12}
                  opacity={0.1}
                  borderRadius={16}
                  borderOpacity={0.2}
                >
                  <div
                    style={{
                      padding: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Img
                      src={`https://api.iconify.design/${social.icon}.svg?color=${social.color}&width=28`}
                      style={{ width: 28, height: 28 }}
                    />
                  </div>
                </Glass>
              </div>
            );
          })}
        </div>

        {/* Bottom tag */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: interpolate(frame, [50, 65], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span
            style={{
              fontFamily: bodyFont,
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "2px",
            }}
          >
            @YOURBRAND
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
