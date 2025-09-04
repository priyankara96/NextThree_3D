"use client";
import { useRef } from "react";
import { useMusic } from "./MusicProvider";

export default function MusicButton() {
  const { isMuted, toggleMute } = useMusic();
  const hoverAudioRef = useRef(null);

  const handleMouseEnter = () => {
    if (isMuted) return; // <-- only play if NOT muted!
    const audio = hoverAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <>
      <button
        onClick={toggleMute}
        onMouseEnter={handleMouseEnter}
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: 1000,
          background: "#fff",
          border: "none",
          borderRadius: "50%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          width: 60,
          height: 60,
          fontSize: 28,
          cursor: "pointer",
        }}
        aria-label={isMuted ? "Unmute all sounds" : "Mute all sounds"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
      <audio
        ref={hoverAudioRef}
        src="/assets/button-hover-click.wav"
        preload="auto"
      />
    </>
  );
}
