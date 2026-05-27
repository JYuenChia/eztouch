import { useEffect, useState } from "react";

export default function SplashScreen({ onNext }) {
  const [dotsActive, setDotsActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotsActive(d => (d + 1) % 3);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onNext}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {/* Static splash image fills the whole screen */}
      <img
        src="/splash.png"
        alt="EzTouch Splash"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
        }}
      />

      {/* Dots indicator */}
      <div style={{
        position: "absolute",
        bottom: 60,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 10,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: dotsActive === i ? 24 : 10,
            height: 10,
            borderRadius: 5,
            background: dotsActive === i ? "white" : "rgba(255,255,255,0.4)",
            transition: "all 0.4s ease",
          }} />
        ))}
      </div>

      {/* Tap hint */}
      <p style={{
        position: "absolute",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        whiteSpace: "nowrap",
        color: "rgba(255,255,255,0.6)",
        fontSize: 13,
        fontFamily: "system-ui, sans-serif",
        margin: 0,
      }}>Tap anywhere to continue</p>
    </div>
  );
}