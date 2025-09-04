"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useMusic } from "./MusicProvider";
import "./ThreeStorySection.css";

// Camera steps array
const STEPS = [
  {
    camera: { position: [-9.25, 2.5, -2.38], fov: 50 },
    orbitTarget: [-2, 1.5, 1],
    overlay: {
      heading: "Our Story of Compassion",
      desc: "The Chitra Lane school in Sri Lanka started in 1967 with three volunteers helping two children with special needs. Today, it supports 250 students and runs a resource center providing early intervention, therapy, and education, creating brighter futures for children across the country.",
      align: "right",
      number: "01",
    },
  },
  {
    camera: { position: [-8.13, 2.5, -4.14], fov: 50 },
    orbitTarget: [-2, 1.5, 1],
    overlay: {
      heading: "Nurturing Lives, Building Futures",
      desc: "The Chitra Lane Welfare Society supports children with special needs, including down’s syndrome, cerebral palsy, autism, and ADHD. We offer education for ages 5 to 21, along with evaluation, intervention, and vocational training.",
      align: "left",
      number: "02",
    },
  },
  {
    camera: { position: [9.25, 2.5, 2.38], fov: 50 },
    orbitTarget: [-2, 1.5, 1],
    overlay: {
      heading: "Donate For Help",
      desc: "Join our Child Sponsorship Scheme to support children at Chitra Lane. Your help provides transport, meals, clothing, and medical care. No long-term commitment is required—just a month’s notice if you stop. Make a difference today and brighten a child’s future!",
      align: "right",
      number: "03",
    },
  },
];

// Linear interpolation for smooth transition
function lerp(a, b, t) {
  return a.map((v, i) => v + (b[i] - v) * t);
}

// Car model loader
function CarModel() {
  const { scene } = useGLTF("/models/car.glb");
  return <primitive object={scene} />;
}
useGLTF.preload("/models/car.glb");

// Camera animation for scroll
function AnimatedCamera({ cameraPos, orbitTarget }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.set(...cameraPos.get());
    camera.lookAt(...orbitTarget.get());
    camera.updateProjectionMatrix();
  });
  return null;
}

export default function ThreeStorySection() {
  // Use global mute state from MusicProvider
  const { isMuted } = useMusic();

  // Refs for hover and click sounds
  const slideBtnHoverRef = useRef(null);
  const slideBtnClickRef = useRef(null);

  // Play hover sound if not muted
  const handleSlideBtnMouseEnter = () => {
    if (isMuted) return;
    const audio = slideBtnHoverRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  // Play click sound if not muted
  const handleSlideBtnClick = () => {
    if (isMuted) return;
    const audio = slideBtnClickRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  // Track scroll position
  const [scrollT, setScrollT] = useState(0);
  const sectionRef = useRef();

  // Listen to window scroll, map [0, sectionHeight*3) to [0,1]
  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height - windowHeight;
      const scrollY = Math.min(
        Math.max(-rect.top, 0),
        totalHeight > 1 ? totalHeight : 1
      );
      setScrollT(scrollY / totalHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interpolate steps based on scrollT
  const nSlides = STEPS.length;
  const exactStep = scrollT * (nSlides - 1);
  const i = Math.floor(exactStep);
  const t = exactStep - i;
  const stepA = STEPS[i];
  const stepB = STEPS[Math.min(i + 1, nSlides - 1)];

  const cameraPosArr = lerp(stepA.camera.position, stepB.camera.position, t);
  const orbitTargetArr = lerp(stepA.orbitTarget, stepB.orbitTarget, t);

  // react-spring for smoothness
  const spring = useSpring({
    cameraPos: cameraPosArr,
    orbitTarget: orbitTargetArr,
    config: { mass: 1, tension: 120, friction: 32 },
  });

  // Overlay: show the current step, simple
  const showIdx = Math.round(exactStep);

  return (
    <section ref={sectionRef} style={{ position: "relative" }}>
      {/* Fixed 3D Canvas */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          pointerEvents: "none", // overlays/buttons on slides still work
        }}
      >
        <Canvas camera={{ position: cameraPosArr, fov: 50 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <CarModel />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1.5}
            castShadow
          />
          <directionalLight position={[-10, 5, -10]} intensity={0.8} />
          <OrbitControls
            target={orbitTargetArr}
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
          />
          <AnimatedCamera
            cameraPos={spring.cameraPos}
            orbitTarget={spring.orbitTarget}
          />
        </Canvas>
      </div>

      {/* Slides: each is 100vh, stacked vertically */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {STEPS.map((step, idx) => (
          <div
            key={idx}
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent:
                step.overlay.align === "left" ? "flex-start" : "flex-end",
              position: "relative",
              pointerEvents: "auto",
            }}
            className={`three-slide three-overlay ${
              step.overlay.align === "left" ? "left" : "right"
            }`}
          >
            {/* Step number */}
            <div
              className="slide-number"
              aria-hidden
              style={{
                position: "absolute",
                fontSize: "19vw",
                color: "#0001",
                top: "12%",
                left: step.overlay.align === "left" ? "2vw" : "auto",
                right: step.overlay.align === "right" ? "3vw" : "auto",
                fontWeight: 600,
                zIndex: 0,
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {step.overlay.number}
            </div>
            {/* Content */}
            <div
              style={{
                maxWidth: "700px",
                margin:
                  step.overlay.align === "left" ? "0 0 0 6vw" : "0 7vw 0 0",
                zIndex: 1,
                background: "transparent",
                pointerEvents: "auto",
              }}
            >
              <h1 className="slide-heading">{step.overlay.heading}</h1>
              <p className="slide-desc">{step.overlay.desc}</p>
              {idx === 1 && (
                <a
                  className="slide-btn"
                  href="#what-we-do"
                  onMouseEnter={handleSlideBtnMouseEnter}
                  onClick={handleSlideBtnClick}
                >
                  What We Do →
                </a>
              )}
              {idx === 2 && (
                <a
                  className="slide-btn"
                  href="#donate"
                  onMouseEnter={handleSlideBtnMouseEnter}
                  onClick={handleSlideBtnClick}
                >
                  Donate Us →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Slide button hover and click sound effects */}
      <audio
        ref={slideBtnHoverRef}
        src="/assets/button-hover-click.wav"
        preload="auto"
      />
      <audio
        ref={slideBtnClickRef}
        src="/assets/old-computer-click.mp3"
        preload="auto"
      />
    </section>
  );
}
