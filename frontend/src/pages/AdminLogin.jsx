import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .al-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a060a;
    font-family: 'Space Grotesk', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Subtle radial glow in background */
  .al-bg-glow {
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(153,3,125,0.12) 0%, transparent 70%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  /* ── CARD ── */
  .al-card {
    position: relative; z-index: 10;
    width: 400px; max-width: 94vw;
    background: #100810;
    border: 1px solid rgba(153,3,125,0.25);
    border-radius: 12px;
    padding: 36px 32px 32px;
    box-shadow:
      0 0 60px rgba(153,3,125,0.1),
      0 24px 64px rgba(0,0,0,0.7);
    animation: fadeUp 0.45s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* Top accent line */
  .al-top-line {
    position: absolute; top: 0; left: 10%; right: 10%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #99037d, transparent);
    border-radius: 0 0 2px 2px;
  }

  /* Logo + title */
  .al-brand {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 28px;
  }
  .al-icon {
    width: 44px; height: 44px;
    background: rgba(153,3,125,0.1);
    border: 1px solid rgba(153,3,125,0.3);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  .al-brand-text {}
  .al-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; font-weight: 500;
    color: rgba(153,3,125,0.7); letter-spacing: 2.5px;
    text-transform: uppercase; margin-bottom: 2px;
  }
  .al-title {
    font-weight: 700; font-size: 18px; color: #fff; letter-spacing: -0.3px;
  }

  /* Divider */
  .al-divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin-bottom: 24px;
  }

  /* Error */
  .al-error {
    background: rgba(255,40,40,0.07);
    border: 1px solid rgba(255,60,60,0.2);
    border-left: 2px solid #ff4444;
    color: #ff9999;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; padding: 9px 12px;
    border-radius: 6px; margin-bottom: 16px;
  }

  /* Attempts */
  .al-attempts {
    background: rgba(255,140,0,0.05);
    border: 1px solid rgba(255,140,0,0.15);
    color: rgba(255,160,60,0.8);
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; padding: 7px 12px;
    border-radius: 6px; margin-bottom: 14px; letter-spacing: 0.3px;
  }

  /* Field */
  .al-field { margin-bottom: 14px; }
  .al-field-label {
    display: block; margin-bottom: 6px;
    font-size: 12px; font-weight: 500;
    color: rgba(255,255,255,0.4); letter-spacing: 0.3px;
  }
  .al-input-wrap { position: relative; }
  .al-input {
    width: 100%;
    padding: 11px 14px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    color: #fff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .al-input::placeholder { color: rgba(255,255,255,0.18); }
  .al-input:focus {
    border-color: rgba(153,3,125,0.6);
    background: rgba(153,3,125,0.05);
    box-shadow: 0 0 0 3px rgba(153,3,125,0.1);
  }
  .al-input:disabled { opacity: 0.35; cursor: not-allowed; }
  .al-input.with-eye { padding-right: 44px; }

  .al-eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    font-size: 14px; color: rgba(255,255,255,0.25); padding: 4px;
    transition: color 0.2s;
  }
  .al-eye:hover { color: rgba(153,3,125,0.8); }

  /* Remember */
  .al-remember {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 20px;
  }
  .al-checkbox { width: 14px; height: 14px; accent-color: #99037d; cursor: pointer; }
  .al-remember-label { font-size: 12px; color: rgba(255,255,255,0.3); cursor: pointer; }

  /* Button */
  .al-btn {
    width: 100%;
    padding: 13px;
    background: linear-gradient(135deg, #7a0260 0%, #4c003e 100%);
    border: 1px solid rgba(153,3,125,0.4);
    border-radius: 8px;
    color: #fff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px; font-weight: 600; letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 20px rgba(153,3,125,0.25);
    position: relative; overflow: hidden;
  }
  .al-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: rgba(255,255,255,0.06);
    opacity: 0; transition: opacity 0.2s;
  }
  .al-btn:hover:not(:disabled)::before { opacity: 1; }
  .al-btn:hover:not(:disabled) {
    box-shadow: 0 6px 28px rgba(153,3,125,0.4);
    transform: translateY(-1px);
  }
  .al-btn:active:not(:disabled) { transform: translateY(0); }
  .al-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* Footer */
  .al-footer {
    margin-top: 20px; padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,0.04);
    display: flex; align-items: center; justify-content: space-between;
  }
  .al-footer-left {
    display: flex; align-items: center; gap: 6px;
  }
  .al-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #44ee88;
    box-shadow: 0 0 6px rgba(68,238,136,0.6);
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .al-status-txt {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; color: rgba(255,255,255,0.2); letter-spacing: 0.8px;
  }
  .al-footer-right {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; color: rgba(153,3,125,0.4); letter-spacing: 0.5px;
  }

  /* Locked overlay */
  .al-locked {
    position: absolute; inset: 0; z-index: 20;
    background: rgba(10,6,10,0.92);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 10px;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .al-locked-icon { font-size: 36px; }
  .al-locked-title {
    font-weight: 700; font-size: 17px; color: #ff6666;
  }
  .al-locked-sub {
    font-size: 12px; color: rgba(255,255,255,0.35);
    text-align: center; line-height: 1.6;
  }
  .al-locked-timer {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; color: #ff9944; letter-spacing: 1px; margin-top: 4px;
  }
`;

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username,  setUsername]  = useState("");
  const [password,  setPassword]  = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [remember,  setRemember]  = useState(false);
  const [error,     setError]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [attempts,  setAttempts]  = useState(0);
  const [locked,    setLocked]    = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  

  const startLockout = () => {
    setLocked(true);
    setLockTimer(LOCKOUT_SECONDS);
    const interval = setInterval(() => {
      setLockTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setLocked(false);
          setAttempts(0);
          setError("");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = async () => {
  if (!username.trim() || !password.trim()) {
    setError("Username and password are required.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const res = await fetch(`${API}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.trim(),
        password
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) startLockout();
      else setError(data.message || "Invalid credentials.");

      setLoading(false);
      return;
    }

    const storage = remember ? localStorage : sessionStorage;

    // 🔐 STORE JWT TOKEN
    storage.setItem("token", data.token);

    // Optional: store admin info
    storage.setItem("admin", JSON.stringify(data.admin));

    navigate("/admin-panel");

  } catch {
    setError("Server unreachable. Try again.");
    setLoading(false);
  }
};

  const handleKey = (e) => {
    if (e.key === "Enter" && !loading && !locked) handleLogin();
  };

  const attemptsLeft = MAX_ATTEMPTS - attempts;

  return (
    <>
      <style>{styles}</style>
      <div className="al-root" onKeyDown={handleKey}>
        <div className="al-bg-glow" />

        <div className="al-card">
          {locked && (
            <div className="al-locked">
              <div className="al-locked-icon">🔐</div>
              <div className="al-locked-title">Account Locked</div>
              <div className="al-locked-sub">
                Too many failed attempts.<br />
                Access temporarily suspended.
              </div>
              <div className="al-locked-timer">⏱ {lockTimer}s remaining</div>
            </div>
          )}

          <div className="al-top-line" />

          {/* Brand */}
          <div className="al-brand">
            <div className="al-icon">🛡️</div>
            <div className="al-brand-text">
              <div className="al-label">Admin Portal</div>
              <div className="al-title">EDU-TECH</div>
            </div>
          </div>

          <div className="al-divider" />

          {/* Error */}
          {error && <div className="al-error">⚠ {error}</div>}

          {/* Attempts warning */}
          {attempts > 0 && !locked && (
            <div className="al-attempts">
              {attempts}/{MAX_ATTEMPTS} failed attempts — {attemptsLeft} remaining before lockout
            </div>
          )}

          {/* Username */}
          <div className="al-field">
            <label className="al-field-label">Username</label>
            <div className="al-input-wrap">
              <input
                className="al-input"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={loading || locked}
                autoComplete="username"
                spellCheck={false}
              />
            </div>
          </div>

          {/* Password */}
          <div className="al-field">
            <label className="al-field-label">Password</label>
            <div className="al-input-wrap">
              <input
                className="al-input with-eye"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading || locked}
                autoComplete="current-password"
              />
              <button className="al-eye" onClick={() => setShowPass(!showPass)} type="button" tabIndex={-1}>
                {showPass ? "🔒︎" : "👁"}
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="al-remember">
            <input
              type="checkbox"
              id="al-rem"
              className="al-checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              disabled={loading || locked}
            />
            <label htmlFor="al-rem" className="al-remember-label">Keep me signed in</label>
          </div>

          {/* Button */}
          <button
            className="al-btn"
            onClick={handleLogin}
            disabled={loading || locked}
            type="button"
          >
            {loading ? "Authenticating..." : locked ? `Locked (${lockTimer}s)` : "Sign In →"}
          </button>

          {/* Footer */}
          <div className="al-footer">
            <div className="al-footer-left">
              <div className="al-dot" />
              <span className="al-status-txt">SYSTEM ONLINE</span>
            </div>
            <div className="al-footer-right">🔒 256-BIT SSL</div>
          </div>
        </div>
      </div>
    </>
  );
}