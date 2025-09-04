"use client";
import React, { createContext, useContext, useRef, useState } from "react";

const MusicContext = createContext();

export function useMusic() {
  return useContext(MusicContext);
}

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      audio.play().catch(() => {});
    } else {
      audio.muted = true;
    }
    setIsMuted(!isMuted);
  };

  return (
    <MusicContext.Provider value={{ isMuted, toggleMute }}>
      <audio
        ref={audioRef}
        src="/assets/soundtrack.mp3"
        loop
        muted={isMuted}
        preload="auto"
      />
      {children}
    </MusicContext.Provider>
  );
}
