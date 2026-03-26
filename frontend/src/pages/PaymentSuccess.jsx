import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ps-root {
    min-height: 100vh;
    background: #1f001d;
    font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }

  /* Orbs */
  .ps-orb {
    position: fixed; border-radius: 50%;
    filter: blur(90px); pointer-events: none; z-index: 0;
    animation: floatOrb 10s ease-in-out infinite;
  }
  .ps-orb-1 { width:420px; height:420px; background:radial-gradient(circle,#9900ff22,transparent); top:-80px; left:-80px; }
  .ps-orb-2 { width:360px; height:360px; background:radial-gradient(circle,#ff00aa18,transparent); bottom:-60px; right:-60px; animation-delay:-4s; }
  @keyframes floatOrb {
    0%,100% { transform:translate(0,0) scale(1); }
    50% { transform:translate(20px,-30px) scale(1.05); }
  }

  /* ── CARD ── */
  .ps-card {
    position: relative; z-index: 1;
    width: 440px; max-width: 94%;
    border-radius: 28px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.1);
    backdrop-filter: blur(32px);
    padding: 48px 40px 40px;
    text-align: center;
    box-shadow: 0 32px 80px rgba(0,0,0,.5), 0 0 60px rgba(153,3,125,.1);
    animation: cardIn .6s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes cardIn {
    from { opacity:0; transform:translateY(30px) scale(.97); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }

  /* ── PROCESSING PHASE ── */
  .ps-processing { animation: fadeIn .4s ease both; }
  .ps-success    { animation: fadeIn .5s ease both; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

  /* Spinner */
  .ps-spinner-wrap {
    width: 88px; height: 88px;
    margin: 0 auto 24px;
    position: relative;
  }
  .ps-spinner {
    width: 88px; height: 88px;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,.07);
    border-top-color: #cc05a0;
    border-right-color: rgba(204,5,160,.4);
    animation: spin 1s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .ps-spinner-icon {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 30px;
    animation: pulse 1.4s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }

  .ps-proc-title {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 20px;
    color: #fff; margin-bottom: 8px;
  }
  .ps-proc-sub {
    font-size: 13px; color: rgba(255,255,255,.38); margin-bottom: 28px; line-height: 1.6;
  }

  /* Progress bar */
  .ps-progress-wrap {
    height: 4px; border-radius: 99px;
    background: rgba(255,255,255,.08);
    overflow: hidden; margin-bottom: 16px;
  }
  .ps-progress-fill {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, #99037d, #ff66cc);
    transition: width .4s ease;
  }

  /* Steps */
  .ps-steps {
    display: flex; flex-direction: column; gap: 8px;
    text-align: left;
  }
  .ps-step {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: 12px;
    font-size: 13px; font-weight: 500;
    transition: all .3s ease;
  }
  .ps-step.pending  { color: rgba(255,255,255,.28); background: rgba(255,255,255,.02); }
  .ps-step.active   { color: rgba(255,255,255,.8);  background: rgba(153,3,125,.1); border: 1px solid rgba(153,3,125,.2); }
  .ps-step.done     { color: #44ee88; background: rgba(68,238,136,.07); border: 1px solid rgba(68,238,136,.18); }

  .ps-step-dot {
    width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 11px;
    transition: all .3s;
  }
  .ps-step.pending .ps-step-dot  { background: rgba(255,255,255,.07); border: 1.5px solid rgba(255,255,255,.15); }
  .ps-step.active .ps-step-dot   { background: rgba(153,3,125,.3); border: 1.5px solid #cc05a0; animation: spinDot 1s linear infinite; }
  .ps-step.done .ps-step-dot     { background: rgba(68,238,136,.2); border: 1.5px solid #44ee88; }
  @keyframes spinDot { to { transform: rotate(360deg); } }

  /* ── SUCCESS PHASE ── */
  /* Big animated checkmark */
  .ps-check-wrap {
    width: 96px; height: 96px;
    margin: 0 auto 24px;
    position: relative;
  }

  .ps-check-circle {
    width: 96px; height: 96px; border-radius: 50%;
    background: rgba(68,238,136,.12);
    border: 2px solid rgba(68,238,136,.35);
    display: flex; align-items: center; justify-content: center;
    animation: popIn .5s cubic-bezier(0.16,1,0.3,1) both;
    box-shadow: 0 0 40px rgba(68,238,136,.2);
  }
  @keyframes popIn {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  /* SVG checkmark draw animation */
  .ps-check-svg { width: 44px; height: 44px; }
  .ps-check-path {
    fill: none; stroke: #44ee88; stroke-width: 3.5;
    stroke-linecap: round; stroke-linejoin: round;
    stroke-dasharray: 60; stroke-dashoffset: 60;
    animation: drawCheck .6s .3s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  @keyframes drawCheck { to { stroke-dashoffset: 0; } }

  /* Confetti dots */
  .ps-confetti { position: absolute; inset: 0; pointer-events: none; }
  .ps-dot {
    position: absolute; border-radius: 50%;
    animation: confettiFly .8s ease-out both;
  }
  @keyframes confettiFly {
    from { transform: translate(0,0) scale(0); opacity: 1; }
    to   { transform: var(--tx) scale(1); opacity: 0; }
  }

  .ps-success-title {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px;
    color: #fff; margin-bottom: 8px;
  }
  .ps-success-sub {
    font-size: 13px; color: rgba(255,255,255,.45);
    margin-bottom: 28px; line-height: 1.6;
  }

  /* Course pill */
  .ps-course-pill {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px; border-radius: 14px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.1);
    margin-bottom: 24px; text-align: left;
  }
  .ps-course-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: linear-gradient(135deg,#99037d,#4C003E);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .ps-course-label { font-size: 11px; color: rgba(255,255,255,.35); letter-spacing:.5px; text-transform:uppercase; }
  .ps-course-name  { font-size: 14px; font-weight: 600; color: #fff; margin-top: 2px; }

  /* CTA button */
  .ps-cta {
    width: 100%; padding: 14px;
    background: linear-gradient(135deg, #99037d, #4C003E 60%, #7a0260);
    border: none; border-radius: 13px;
    color: #fff; font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700; letter-spacing: .4px;
    cursor: pointer; position: relative; overflow: hidden;
    transition: all .3s ease;
    box-shadow: 0 8px 28px rgba(153,3,125,.4);
    margin-bottom: 12px;
  }
  .ps-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(153,3,125,.55); }
  .ps-cta:active { transform: translateY(0); }
  .ps-cta::after {
    content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
    animation: shimmer 3s ease-in-out infinite;
  }
  @keyframes shimmer { 0%{left:-100%} 50%,100%{left:150%} }

  .ps-secondary {
    display: inline-block;
    font-size: 13px; color: rgba(255,255,255,.35);
    cursor: pointer; transition: color .2s;
    background: none; border: none;
    font-family: 'DM Sans', sans-serif;
    text-decoration: underline; text-underline-offset: 3px;
  }
  .ps-secondary:hover { color: rgba(255,255,255,.7); }
`;

const STEPS = [
  { label: "Verifying payment details" },
  { label: "Processing transaction"    },
  { label: "Unlocking your course"     },
];

const CONFETTI_COLORS = ["#ff66cc","#cc05a0","#44ee88","#ffcc44","#66aaff","#ff8844"];

export default function PaymentSuccess() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const user      = JSON.parse(localStorage.getItem("user"));

  const [phase,        setPhase]        = useState("processing"); // processing | success
  const [currentStep,  setCurrentStep]  = useState(0);
  const [progress,     setProgress]     = useState(0);
  const [courseName,   setCourseName]   = useState("Your Course");

  /* Save purchase once */
  useEffect(() => {
    const key = `purchased_${user?.id}_${location.state?.courseId}`;
    if (user && location.state?.courseId && !sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "true");
      fetch("http://127.0.0.1:5000/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, course_id: location.state.courseId }),
      }).catch(err => console.error("Failed to save purchase", err));
    }

    /* Fetch course name if we have an id */
    if (location.state?.courseId) {
      fetch(`http://127.0.0.1:5000/api/courses/${location.state.courseId}`)
        .then(r => r.json())
        .then(d => { if (d?.title) setCourseName(d.title); })
        .catch(() => {});
    }
  }, [location.state?.courseId, user]);

  /* Animated processing sequence */
  useEffect(() => {
    const timers = [];

    // Step 0 active immediately
    setCurrentStep(0);
    setProgress(15);

    timers.push(setTimeout(() => { setCurrentStep(1); setProgress(50);  }, 1200));
    timers.push(setTimeout(() => { setCurrentStep(2); setProgress(80);  }, 2400));
    timers.push(setTimeout(() => {                    setProgress(100); }, 3400));
    timers.push(setTimeout(() => { setPhase("success"); }, 3800));

    return () => timers.forEach(clearTimeout);
  }, []);

  const stepStatus = (i) => {
    if (i < currentStep)  return "done";
    if (i === currentStep) return "active";
    return "pending";
  };

  /* Confetti positions */
  const confetti = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 6 + (i % 3) * 3,
    tx: `translate(${(Math.cos((i / 12) * Math.PI * 2) * 70)}px, ${(Math.sin((i / 12) * Math.PI * 2) * 70)}px)`,
    delay: `${(i * 0.05).toFixed(2)}s`,
    top:  `${48 + Math.sin(i) * 24}%`,
    left: `${48 + Math.cos(i) * 24}%`,
  }));

  return (
    <>
      <style>{styles}</style>
      <div className="ps-root">
        <div className="ps-orb ps-orb-1" />
        <div className="ps-orb ps-orb-2" />

        <div className="ps-card">

          {/* ── PROCESSING ── */}
          {phase === "processing" && (
            <div className="ps-processing">
              <div className="ps-spinner-wrap">
                <div className="ps-spinner" />
                <div className="ps-spinner-icon">💳</div>
              </div>

              <div className="ps-proc-title">Processing Payment</div>
              <div className="ps-proc-sub">Please wait while we verify<br />your transaction securely.</div>

              <div className="ps-progress-wrap">
                <div className="ps-progress-fill" style={{ width: `${progress}%` }} />
              </div>

              <div className="ps-steps">
                {STEPS.map((s, i) => (
                  <div key={i} className={`ps-step ${stepStatus(i)}`}>
                    <div className="ps-step-dot">
                      {stepStatus(i) === "done"   && "✓"}
                      {stepStatus(i) === "active"  && "◌"}
                      {stepStatus(i) === "pending" && ""}
                    </div>
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SUCCESS ── */}
          {phase === "success" && (
            <div className="ps-success">
              <div className="ps-check-wrap">
                <div className="ps-check-circle">
                  <svg className="ps-check-svg" viewBox="0 0 44 44">
                    <path className="ps-check-path" d="M10 22 L19 31 L34 14" />
                  </svg>
                </div>
                {/* Confetti burst */}
                <div className="ps-confetti">
                  {confetti.map(c => (
                    <div key={c.id} className="ps-dot" style={{
                      width: c.size, height: c.size,
                      background: c.color,
                      top: c.top, left: c.left,
                      animationDelay: c.delay,
                      "--tx": c.tx,
                    }} />
                  ))}
                </div>
              </div>

              <div className="ps-success-title">Payment Successful!</div>
              <div className="ps-success-sub">
                Your course has been unlocked.<br />Start learning right away!
              </div>

              <div className="ps-course-pill">
                <div className="ps-course-icon">🎓</div>
                <div>
                  <div className="ps-course-label">Enrolled in</div>
                  <div className="ps-course-name">{courseName}</div>
                </div>
              </div>

              <button
                className="ps-cta"
                onClick={() => navigate(`/course/${location.state?.courseId}`)}
              >
                Start Learning →
              </button>

              <button
                className="ps-secondary"
                onClick={() => navigate("/my-courses")}
              >
                Go to My Courses
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}