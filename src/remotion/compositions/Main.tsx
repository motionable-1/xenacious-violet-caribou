import React from "react";
import {
  AbsoluteFill,
  Artifact,
  useCurrentFrame,
  Audio,
  Sequence,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2GlassCards } from "./scenes/Scene2GlassCards";
import { Scene3Notifications } from "./scenes/Scene3Notifications";
import { Scene4Finale } from "./scenes/Scene4Finale";

// Transition durations
const TRANS_DURATION = 15;

// Scene durations (including transition overlap)
const SCENE1 = 120;
const SCENE2 = 120;
const SCENE3 = 110;
const SCENE4 = 130;

// Total: 120 + 120 + 110 + 130 - 15 - 15 - 15 = 435 frames (~14.5s)
// With 15 frames buffer at end = 450

const WHOOSH_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770416096365_vwntv1sgxpn_sfx_whoosh_swipe_transition_sound_.mp3";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <AbsoluteFill>
        <TransitionSeries>
          {/* Scene 1: Kinetic Intro */}
          <TransitionSeries.Sequence durationInFrames={SCENE1}>
            <Scene1Intro />
          </TransitionSeries.Sequence>

          {/* Transition 1→2: Slide up */}
          <TransitionSeries.Transition
            presentation={slide({ direction: "from-bottom" })}
            timing={linearTiming({ durationInFrames: TRANS_DURATION })}
          />

          {/* Scene 2: Glass Cards */}
          <TransitionSeries.Sequence durationInFrames={SCENE2}>
            <Scene2GlassCards />
          </TransitionSeries.Sequence>

          {/* Transition 2→3: Fade */}
          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANS_DURATION })}
          />

          {/* Scene 3: Notifications */}
          <TransitionSeries.Sequence durationInFrames={SCENE3}>
            <Scene3Notifications />
          </TransitionSeries.Sequence>

          {/* Transition 3→4: Slide from right */}
          <TransitionSeries.Transition
            presentation={slide({ direction: "from-left" })}
            timing={linearTiming({ durationInFrames: TRANS_DURATION })}
          />

          {/* Scene 4: Finale CTA */}
          <TransitionSeries.Sequence durationInFrames={SCENE4}>
            <Scene4Finale />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* Transition whoosh sound effects at each transition point */}
        <Sequence from={SCENE1 - TRANS_DURATION} durationInFrames={30}>
          <Audio src={WHOOSH_URL} volume={0.6} />
        </Sequence>
        <Sequence
          from={SCENE1 + SCENE2 - 2 * TRANS_DURATION}
          durationInFrames={30}
        >
          <Audio src={WHOOSH_URL} volume={0.5} />
        </Sequence>
        <Sequence
          from={SCENE1 + SCENE2 + SCENE3 - 3 * TRANS_DURATION}
          durationInFrames={30}
        >
          <Audio src={WHOOSH_URL} volume={0.5} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
