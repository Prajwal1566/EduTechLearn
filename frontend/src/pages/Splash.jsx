import { useState, useEffect, useRef } from "react";
import logo from "../asset/logow.png"; // adjust path to match your project

// ── Brand tokens ────────────────────────────────────────────────
const C = {
    primaryDark: "#4C003E",
    primaryLight: "#99037d",
    accentPurple: "#B946D1",
    accentPink: "#EC4899",
    white: "#FFFFFF",
    grayLight: "#F3F4F6",
    grayDark: "#1F2937",
};

export default function SplashScreen({ onFinish }) {
    const [phase, setPhase] = useState("idle");
    const particlesRef = useRef(null);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("logo"), 150);
        const t2 = setTimeout(() => setPhase("text"), 1100);
        const t3 = setTimeout(() => setPhase("tagline"), 2000);
        const t4 = setTimeout(() => setPhase("done"), 3200);
        const t5 = setTimeout(() => onFinish?.(), 3900);
        return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
    }, [onFinish]);

    // Spawn branded floating particles on logo arrival
    useEffect(() => {
        if (phase !== "logo" || !particlesRef.current) return;
        const cont = particlesRef.current;
        cont.innerHTML = "";
        const colors = [
            `rgba(236,72,153,0.85)`,
            `rgba(185,70,209,0.8)`,
            `rgba(153,3,125,0.75)`,
            `rgba(255,150,200,0.6)`,
        ];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const d = document.createElement("div");
                const x = 10 + Math.random() * 80;
                const size = 2 + Math.random() * 3.5;
                const dur = 2.4 + Math.random() * 2;
                const col = colors[Math.floor(Math.random() * colors.length)];
                d.style.cssText = `
          position:absolute;
          bottom:${8 + Math.random() * 35}%;
          left:${x}%;
          width:${size}px; height:${size}px;
          border-radius:50%;
          background:${col};
          animation:floatPt ${dur}s ease-out forwards;
        `;
                cont.appendChild(d);
            }, i * 100);
        }
    }, [phase]);

    const logoVisible = phase !== "idle";
    const textVisible = ["text", "tagline", "done"].includes(phase);
    const tagVisible = ["tagline", "done"].includes(phase);
    const barWidth = { idle: "0%", logo: "18%", text: "55%", tagline: "82%", done: "100%" }[phase];

    return (
        <div style={s.root}>
            <style>{`
        @keyframes drift1  { from{transform:translate(-15px,-20px)} to{transform:translate(25px,15px)} }
        @keyframes drift2  { from{transform:translate(10px,10px)}   to{transform:translate(-20px,-18px)} }
        @keyframes spin    { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes floatPt { 0%{opacity:0;transform:translateY(0) scale(0)} 20%{opacity:1} 80%{opacity:.6} 100%{opacity:0;transform:translateY(-90px) scale(1.2)} }
        @keyframes ringPop { 0%{transform:translate(-50%,-50%) scale(1);opacity:.55} 100%{transform:translate(-50%,-50%) scale(2.7);opacity:0} }
        @keyframes shimmerBar { 0%,100%{background-position:200% center} 50%{background-position:0% center} }
      `}</style>

            {/* Ambient orbs */}
            <div style={{
                ...s.orb, width: 320, height: 320,
                background: `radial-gradient(circle,rgba(153,3,125,0.35) 0%,transparent 70%)`,
                top: "0%", left: "-12%", animation: "drift1 9s ease-in-out infinite alternate"
            }} />
            <div style={{
                ...s.orb, width: 260, height: 260,
                background: `radial-gradient(circle,rgba(236,72,153,0.2) 0%,transparent 70%)`,
                bottom: "0%", right: "-8%", animation: "drift2 11s ease-in-out infinite alternate"
            }} />
            <div style={{
                ...s.orb, width: 180, height: 180,
                background: `radial-gradient(circle,rgba(185,70,209,0.15) 0%,transparent 70%)`,
                top: "55%", left: "10%"
            }} />

            {/* Spinning dashed ring */}
            <div style={{ ...s.spinRing, animation: "spin 18s linear infinite" }} />
            {/* Static inner ring */}
            <div style={{ ...s.innerRing }} />

            {/* Burst rings on logo arrival */}
            {logoVisible && <>
                <div style={{ ...s.burstRing, borderColor: `rgba(236,72,153,0.55)`, animation: "ringPop 1s ease-out forwards" }} />
                <div style={{ ...s.burstRing, borderColor: `rgba(185,70,209,0.4)`, animation: "ringPop 1s ease-out 0.18s forwards" }} />
            </>}

            {/* Particles */}
            <div ref={particlesRef} style={s.particles} />

            {/* Logo */}
            <div style={{
                ...s.logoWrap,
                transform: logoVisible ? "scale(1) rotate(0deg)" : "scale(0.05) rotate(-8deg)",
                opacity: logoVisible ? 1 : 0,
                transition: "transform 0.85s cubic-bezier(0.34,1.56,0.64,1), opacity 0.55s ease",
            }}>
                {phase === "logo" && <div style={s.logoGlow} />}
                <img src={logo} alt="EDU TECH" style={s.logoImg} />
            </div>

            {/* EDU | TECH */}
            <div style={s.textRow}>
                <span style={{
                    ...s.edu,
                    opacity: textVisible ? 1 : 0,
                    transform: textVisible ? "translateX(0)" : "translateX(-32px)",
                    transition: "opacity 0.6s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)",
                }}>EDU</span>

                <div style={{
                    ...s.divider,
                    opacity: textVisible ? 1 : 0,
                    transform: textVisible ? "scaleY(1)" : "scaleY(0)",
                    transition: "opacity 0.4s ease 0.1s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
                }} />

                <span style={{
                    ...s.tech,
                    opacity: textVisible ? 1 : 0,
                    transform: textVisible ? "translateX(0)" : "translateX(32px)",
                    transition: "opacity 0.6s ease 0.18s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.18s",
                }}>TECH</span>
            </div>

            {/* Tagline */}
            <p style={{
                ...s.tagline,
                opacity: tagVisible ? 1 : 0,
                transform: tagVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.9s ease, transform 0.9s ease",
            }}>E-Learning Website</p>

            {/* Shimmer underline */}
            <div style={{
                ...s.underline,
                width: tagVisible ? 190 : 0,
                transition: "width 0.9s cubic-bezier(0.4,0,0.2,1) 0.3s",
            }} />

            {/* Progress bar */}
            <div style={s.barTrack}>
                <div style={{ ...s.barFill, width: barWidth }} />
            </div>

            {/* Fade-out overlay */}
            <div style={{
                ...s.fadeOut,
                opacity: phase === "done" ? 1 : 0,
                transition: "opacity 0.7s ease 0.5s",
                pointerEvents: phase === "done" ? "all" : "none",
            }} />
        </div>
    );
}

const s = {
    root: {
        position: "fixed", inset: 0, zIndex: 9999,
        background: `radial-gradient(ellipse at 50% 30%, ${C.primaryDark} 0%, #2a0022 45%, #0f000b 100%)`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        overflow: "hidden", userSelect: "none",
    },
    orb: { position: "absolute", borderRadius: "50%", pointerEvents: "none" },
    spinRing: {
        position: "absolute", width: 420, height: 420, borderRadius: "50%",
        border: `1px dashed rgba(185,70,209,0.18)`,
        top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
    },
    innerRing: {
        position: "absolute", width: 260, height: 260, borderRadius: "50%",
        border: `0.5px solid rgba(236,72,153,0.12)`,
        top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
    },
    burstRing: {
        position: "absolute", width: 220, height: 220, borderRadius: "50%",
        border: "1.5px solid", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)", pointerEvents: "none",
    },
    particles: { position: "absolute", inset: 0, pointerEvents: "none" },
    logoWrap: { position: "relative", marginBottom: 8, willChange: "transform,opacity" },
    logoGlow: {
        position: "absolute", inset: -22, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(236,72,153,0.5) 0%, rgba(185,70,209,0.28) 40%, transparent 70%)`,
        pointerEvents: "none",
    },
    logoImg: {
        width: 190, height: 190, objectFit: "contain", display: "block",
        filter: "brightness(0) invert(1)", position: "relative", zIndex: 1,
    },
    textRow: { display: "flex", alignItems: "center", gap: 12, marginTop: 2 },
    edu: {
        fontSize: "clamp(28px,6vw,54px)", fontWeight: 900,
        fontFamily: "'Segoe UI',sans-serif", letterSpacing: "0.08em",
        color: C.white, willChange: "transform,opacity",
    },
    divider: {
        width: 3, height: "clamp(28px,4.5vw,50px)",
        background: `linear-gradient(180deg, ${C.accentPink}, ${C.accentPurple}, ${C.primaryLight})`,
        borderRadius: 2,
    },
    tech: {
        fontSize: "clamp(28px,6vw,54px)", fontWeight: 900,
        fontFamily: "'Segoe UI',sans-serif", letterSpacing: "0.08em",
        background: `linear-gradient(135deg, ${C.accentPink} 0%, ${C.accentPurple} 45%, ${C.primaryLight} 100%)`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text", willChange: "transform,opacity",
    },
    tagline: {
        margin: "12px 0 0", fontSize: 12,
        color: `rgba(236,72,153,0.8)`,
        letterSpacing: "0.28em", textTransform: "uppercase",
        fontFamily: "'Segoe UI',sans-serif", fontWeight: 500,
        willChange: "transform,opacity",
    },
    underline: {
        height: 1.5,
        background: `linear-gradient(90deg, transparent, ${C.accentPink}, ${C.accentPurple}, ${C.primaryLight}, transparent)`,
        borderRadius: 2, marginTop: 8,
    },
    barTrack: {
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        width: 160, height: 2, borderRadius: 2,
        background: `rgba(153,3,125,0.2)`, overflow: "hidden",
    },
    barFill: {
        height: "100%", borderRadius: 2,
        background: `linear-gradient(90deg, ${C.primaryDark}, ${C.primaryLight}, ${C.accentPink})`,
        backgroundSize: "200% auto",
        animation: "shimmerBar 2s linear infinite",
        transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
    },
    fadeOut: {
        position: "absolute", inset: 0, background: "#0f000b", zIndex: 10,
    },
};