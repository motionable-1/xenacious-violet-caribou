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
import { ContinuousBackground } from "./scenes/ContinuousBackground";

// Transition durations
const TRANS_DURATION = 15;

// Scene durations
const SCENE1 = 120;
const SCENE2 = 120;
const SCENE3 = 110;
const SCENE4 = 130;

// Scene start frames (after transition overlap math)
// Scene1: 0
// Scene2: 120 - 15 = 105
// Scene3: 105 + 120 - 15 = 210
// Scene4: 210 + 110 - 15 = 305
// Total: 120 + 120 + 110 + 130 - 15 - 15 - 15 = 435
const SCENE_BREAKS = [0, 105, 210, 305];
const TOTAL_DURATION = 450;

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
        {/* Continuous background — lives behind everything, never transitions */}
        <ContinuousBackground
          sceneBreaks={SCENE_BREAKS}
          totalDuration={TOTAL_DURATION}
        />

        {/* Scene content transitions on top */}
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={SCENE1}>
            <Scene1Intro />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slide({ direction: "from-bottom" })}
            timing={linearTiming({ durationInFrames: TRANS_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={SCENE2}>
            <Scene2GlassCards />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANS_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={SCENE3}>
            <Scene3Notifications />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slide({ direction: "from-left" })}
            timing={linearTiming({ durationInFrames: TRANS_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={SCENE4}>
            <Scene4Finale />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* Transition whoosh sound effects */}
        <Sequence from={SCENE_BREAKS[1]} durationInFrames={30}>
          <Audio src={WHOOSH_URL} volume={0.6} />
        </Sequence>
        <Sequence from={SCENE_BREAKS[2]} durationInFrames={30}>
          <Audio src={WHOOSH_URL} volume={0.5} />
        </Sequence>
        <Sequence from={SCENE_BREAKS[3]} durationInFrames={30}>
          <Audio src={WHOOSH_URL} volume={0.5} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
