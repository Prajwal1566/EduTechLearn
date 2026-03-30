import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../asset/logow.png";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .fp-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1f001d;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    padding: 20px 0;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    animation: floatOrb 8s ease-in-out infinite;
    pointer-events: none;
  }
  .orb-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #9900ff55, #4C003E33);
    top: -100px; left: -100px;
    animation-delay: 0s;
  }
  .orb-2 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #ff00aa44, #99037d22);
    bottom: -80px; right: -80px;
    animation-delay: -3s;
  }
  .orb-3 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, #6600cc33, transparent);
    top: 50%; left: 60%;
    animation-delay: -5s;
  }

  @keyframes floatOrb {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -40px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
  }

  .noise {
    position: absolute;
    inset: 0;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 200px;
    pointer-events: none;
  }

  .card {
    position: relative;
    z-index: 10;
    width: 400px;
    max-width: 95%;
    border-radius: 24px;
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(32px) saturate(180%);
    -webkit-backdrop-filter: blur(32px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow:
      0 0 0 0.5px rgba(255,255,255,0.08) inset,
      0 40px 80px rgba(0,0,0,0.6),
      0 0 60px rgba(153,3,125,0.15);
    overflow: hidden;
    animation: cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(40px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(153,3,125,0.6), rgba(76,0,62,0.2), rgba(255,0,170,0.3));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  /* Header */
  .card-header {
    padding: 20px 28px 14px;
    text-align: center;
  }

  .logo-img-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px; height: 56px;
    border-radius: 14px;
    background: linear-gradient(135deg, #99037d, #4C003E);
    box-shadow: 0 8px 24px rgba(153,3,125,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset;
    margin-bottom: 8px;
    overflow: hidden;
    animation: logoIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
  }
  .logo-img { width: 100%; height: 100%; object-fit: cover; }

  @keyframes logoIn {
    from { opacity: 0; transform: scale(0.5) rotate(-10deg); }
    to   { opacity: 1; transform: scale(1) rotate(0deg); }
  }

  .brand-name {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 20px;
    color: #fff;
    text-shadow: 0 0 30px rgba(153,3,125,0.6);
  }

  .brand-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.45);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 3px;
    font-weight: 300;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    margin: 0 28px;
  }

  /* Body */
  .card-body {
    padding: 18px 28px 24px;
  }

  /* Step indicator */
  .step-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin-bottom: 20px;
  }

  .step-dot {
    width: 28px; height: 28px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    border: 2px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.04);
    transition: all 0.4s ease;
    position: relative;
    z-index: 1;
  }

  .step-dot.active {
    border-color: #99037d;
    color: #fff;
    background: linear-gradient(135deg, #99037d, #4C003E);
    box-shadow: 0 0 14px rgba(153,3,125,0.5);
  }

  .step-dot.done {
    border-color: #44ee88;
    color: #44ee88;
    background: rgba(68,238,136,0.1);
  }

  .step-line {
    width: 36px;
    height: 2px;
    background: rgba(255,255,255,0.1);
    transition: background 0.4s ease;
  }
  .step-line.done { background: linear-gradient(90deg, #99037d, #44ee88); }

  .form-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 17px;
    color: #fff;
    margin-bottom: 6px;
  }

  .form-subtitle {
    font-size: 12px;
    color: rgba(255,255,255,0.45);
    margin-bottom: 16px;
    line-height: 1.5;
  }

  .error-box {
    background: rgba(255,60,60,0.1);
    border: 1px solid rgba(255,60,60,0.3);
    color: #ffb3b3;
    font-size: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    margin-bottom: 12px;
    animation: shake 0.4s ease;
  }

  .success-box {
    background: rgba(68,238,136,0.08);
    border: 1px solid rgba(68,238,136,0.3);
    color: #88ffbb;
    font-size: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    margin-bottom: 12px;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  .field { margin-bottom: 12px; }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.6);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .input-wrap { position: relative; }

  .field-input {
    width: 100%;
    padding: 10px 14px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .field-input::placeholder { color: rgba(255,255,255,0.25); }
  .field-input:focus {
    background: rgba(153,3,125,0.1);
    border-color: rgba(153,3,125,0.7);
    box-shadow: 0 0 0 3px rgba(153,3,125,0.2);
    transform: translateY(-1px);
  }
  .field-input.has-btn { padding-right: 46px; }

  .eye-btn {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    cursor: pointer;
    font-size: 15px;
    color: rgba(255,255,255,0.35);
    transition: color 0.2s;
    padding: 4px; line-height: 1;
  }
  .eye-btn:hover { color: rgba(204,5,160,0.9); }

  /* OTP boxes */
  .otp-wrap {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-bottom: 16px;
  }
  .otp-box {
    width: 44px; height: 48px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.07);
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    text-align: center;
    outline: none;
    transition: all 0.2s;
  }
  .otp-box:focus {
    border-color: rgba(153,3,125,0.8);
    background: rgba(153,3,125,0.1);
    box-shadow: 0 0 0 3px rgba(153,3,125,0.2);
  }

  /* Submit btn */
  .submit-btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #99037d, #4C003E 60%, #7a0260);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    box-shadow: 0 8px 24px rgba(153,3,125,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
    margin-top: 4px;
  }
  .submit-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .submit-btn:hover::before { opacity: 1; }
  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(153,3,125,0.55);
  }
  .submit-btn:active { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
  .submit-btn::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    animation: shimmer 3s ease-in-out infinite;
  }
  @keyframes shimmer {
    0% { left: -100%; }
    50%, 100% { left: 150%; }
  }

  /* Success screen */
  .success-screen {
    text-align: center;
    padding: 10px 0;
  }
  .success-icon {
    font-size: 52px;
    margin-bottom: 12px;
    animation: popIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes popIn {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }
  .success-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    margin-bottom: 6px;
  }
  .success-desc {
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 20px;
    line-height: 1.5;
  }

  /* Footer */
  .card-footer {
    text-align: center;
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .back-link {
    color: #cc05a0;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;
  }
  .back-link:hover { color: #ff66e0; }

  @keyframes blink { 0%,80%,100% { opacity: 0; } 40% { opacity: 1; } }
  .dot { display: inline-block; animation: blink 1.2s ease-in-out infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
`;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleOtpKey = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  };

  const otpString = otp.join("");

  const sendOtp = async () => {
    setError(""); setSuccess("");
    if (!email) { setError("Please enter your email"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) { setSuccess("OTP sent to your email"); setStep(2); }
      else setError(data.error || "Failed to send OTP");
    } catch { setError("Server error. Please try again."); }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setError(""); setSuccess("");
    if (otpString.length < 6) { setError("Please enter the 6-digit OTP"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpString }),
      });
      const data = await res.json();
      if (res.ok) { setSuccess("OTP verified!"); setStep(3); }
      else setError(data.error || "Invalid OTP");
    } catch { setError("Server error. Please try again."); }
    setLoading(false);
  };

  const resetPassword = async () => {
    setError(""); setSuccess("");
    if (!password || !confirmPassword) { setError("Please fill all fields"); return; }
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) { setStep(4); }
      else setError(data.error || "Failed to reset password");
    } catch { setError("Server error. Please try again."); }
    setLoading(false);
  };

  const stepTitles = ["Enter Email", "Verify OTP", "New Password"];
  const stepSubs = [
    "We'll send a one-time password to your email.",
    "Enter the 6-digit code sent to your email.",
    "Choose a new secure password.",
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="fp-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="noise" />

        <div className="card">
          {/* Header */}
          <div className="card-header">
            <div className="logo-img-wrap">
              <img src={logo} alt="EduTech Logo" className="logo-img" />
            </div>
            <div className="brand-name">EDU-TECH</div>
            <div className="brand-sub">E-Learning Platform</div>
          </div>

          <div className="divider" />

          <div className="card-body">

            {step < 4 && (
              <>
                {/* Step indicator */}
                <div className="step-indicator">
                  {[1, 2, 3].map((s, i) => (
                    <>
                      <div key={s} className={`step-dot ${step === s ? "active" : step > s ? "done" : ""}`}>
                        {step > s ? "✓" : s}
                      </div>
                      {i < 2 && <div className={`step-line ${step > s ? "done" : ""}`} />}
                    </>
                  ))}
                </div>

                <div className="form-title">{stepTitles[step - 1]}</div>
                <div className="form-subtitle">{stepSubs[step - 1]}</div>
              </>
            )}

            {error && <div className="error-box">⚠️ {error}</div>}
            {success && <div className="success-box">✓ {success}</div>}

            {/* STEP 1: Email */}
            {step === 1 && (
              <>
                <div className="field">
                  <label className="field-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="field-input"
                  />
                </div>
                <button onClick={sendOtp} disabled={loading} className="submit-btn">
                  {loading ? <>Sending<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></> : "Send OTP"}
                </button>
              </>
            )}

            {/* STEP 2: OTP */}
            {step === 2 && (
              <>
                <div className="otp-wrap">
                  {otp.map((val, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      onKeyDown={(e) => handleOtpKey(e, idx)}
                      disabled={loading}
                      className="otp-box"
                    />
                  ))}
                </div>
                <button onClick={verifyOtp} disabled={loading} className="submit-btn">
                  {loading ? <>Verifying<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></> : "Verify OTP"}
                </button>
              </>
            )}

            {/* STEP 3: New Password */}
            {step === 3 && (
              <>
                <div className="field">
                  <label className="field-label">New Password</label>
                  <div className="input-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="field-input has-btn"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="eye-btn">
                      {showPassword ? "🔒︎" : "👁"}
                    </button>
                  </div>
                </div>
                <div className="field">
                  <label className="field-label">Confirm Password</label>
                  <div className="input-wrap">
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                      className="field-input has-btn"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="eye-btn">
                      {showConfirm ? "🔒︎" : "👁"}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && password !== confirmPassword && (
                    <div style={{ fontSize: "11px", color: "#ff7a7a", marginTop: "4px" }}>Passwords do not match</div>
                  )}
                  {confirmPassword.length > 0 && password === confirmPassword && (
                    <div style={{ fontSize: "11px", color: "#44ee88", marginTop: "4px" }}>✓ Passwords match</div>
                  )}
                </div>
                <button onClick={resetPassword} disabled={loading} className="submit-btn">
                  {loading ? <>Resetting<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></> : "Reset Password"}
                </button>
              </>
            )}

            {/* STEP 4: Success */}
            {step === 4 && (
              <div className="success-screen">
                <div className="success-icon">✔️</div>
                <div className="success-title">Password Changed!</div>
                <div className="success-desc">Your password has been reset successfully. You can now login with your new password.</div>
                <button onClick={() => navigate("/")} className="submit-btn">
                  Go to Login
                </button>
              </div>
            )}

            {step < 4 && (
              <div className="card-footer">
                <Link to="/" className="back-link">← Back to Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}