"use client";
import { useMusic } from "./MusicProvider";

export default function MusicButton() {
  const { isMuted, toggleMute } = useMusic();

  return (
    <button
      onClick={toggleMute}
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
      aria-label={isMuted ? "Unmute music" : "Mute music"}
    >
      {isMuted ? "🔇" : "🔊"}
    </button>
  );
}
