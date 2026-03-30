import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../asset/logow.png";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .signup-root {
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
    width: 420px;
    max-width: 95%;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(32px) saturate(180%);
    -webkit-backdrop-filter: blur(32px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow:
      0 0 0 0.5px rgba(255,255,255,0.08) inset,
      0 40px 80px rgba(0,0,0,0.6),
      0 0 60px rgba(153,3,125,0.15);
    overflow: hidden;
    animation: cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(40px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
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
    padding: 14px 24px 10px;
    text-align: center;
    position: relative;
  }

  .logo-img-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: linear-gradient(135deg, #99037d, #4C003E);
    box-shadow: 0 8px 24px rgba(153,3,125,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset;
    margin-bottom: 6px;
    overflow: hidden;
    animation: logoIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
  }

  .logo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes logoIn {
    from { opacity: 0; transform: scale(0.5) rotate(-10deg); }
    to { opacity: 1; transform: scale(1) rotate(0deg); }
  }

  .brand-name {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.5px;
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
    padding: 14px 24px 18px;
  }

  .form-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 12px;
    animation: slideIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-16px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .error-box {
    background: rgba(255, 60, 60, 0.1);
    border: 1px solid rgba(255, 60, 60, 0.3);
    color: #ffb3b3;
    font-size: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    margin-bottom: 10px;
    animation: shake 0.4s ease;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  .field {
    margin-bottom: 8px;
    animation: slideIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.65);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .input-wrap { position: relative; }

  .field-input {
    width: 100%;
    padding: 9px 14px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 12px;
    color: #ffffff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  }

  .field-input::placeholder { color: rgba(255,255,255,0.28); }

  .field-input:focus {
    background: rgba(153,3,125,0.1);
    border-color: rgba(153,3,125,0.7);
    box-shadow:
      0 0 0 3px rgba(153,3,125,0.2),
      0 0 20px rgba(153,3,125,0.1);
    transform: translateY(-1px);
  }

  .field-input.input-error {
    border-color: rgba(255, 80, 80, 0.6);
    background: rgba(255,60,60,0.06);
  }

  .field-input.input-success {
    border-color: rgba(80, 220, 140, 0.6);
    background: rgba(80,220,140,0.04);
  }

  .field-input:disabled { opacity: 0.4; cursor: not-allowed; }
  .field-input.has-btn { padding-right: 46px; }

  .eye-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: rgba(255,255,255,0.35);
    transition: color 0.2s;
    padding: 4px;
    line-height: 1;
  }
  .eye-btn:hover { color: rgba(204,5,160,0.9); }

  /* Password strength */
  .strength-bar-wrap {
    margin-top: 8px;
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .strength-seg {
    flex: 1;
    height: 4px;
    border-radius: 99px;
    background: rgba(255,255,255,0.1);
    transition: background 0.3s ease;
  }

  .strength-seg.active-weak   { background: #ff4d4d; }
  .strength-seg.active-fair   { background: #ffaa00; }
  .strength-seg.active-good   { background: #44ccff; }
  .strength-seg.active-strong { background: #44ee88; }

  .strength-label {
    font-size: 11px;
    font-weight: 600;
    margin-top: 4px;
    letter-spacing: 0.5px;
  }
  .label-weak   { color: #ff6b6b; }
  .label-fair   { color: #ffcc44; }
  .label-good   { color: #44ccff; }
  .label-strong { color: #44ee88; }

  /* Privacy checkbox */
  .privacy-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
    margin-top: 4px;
    cursor: pointer;
  }

  .privacy-check {
    display: none;
  }

  .custom-check {
    width: 18px;
    height: 18px;
    min-width: 18px;
    border-radius: 5px;
    border: 1.5px solid rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1px;
    transition: all 0.2s;
    cursor: pointer;
  }

  .custom-check.checked {
    background: linear-gradient(135deg, #99037d, #cc05a0);
    border-color: #cc05a0;
    box-shadow: 0 0 10px rgba(153,3,125,0.4);
  }

  .custom-check svg {
    display: none;
  }
  .custom-check.checked svg {
    display: block;
  }

  .privacy-text {
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    line-height: 1.5;
  }

  .privacy-text a {
    color: #e060c8;
    font-weight: 600;
    text-decoration: none;
  }
  .privacy-text a:hover { color: #ff88e0; }

  /* Submit */
  .submit-btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #99037d, #4C003E 60%, #7a0260);
    border: none;
    border-radius: 12px;
    color: #ffffff;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    box-shadow: 0 8px 24px rgba(153,3,125,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
  }

  .submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .submit-btn:hover::before { opacity: 1; }
  .submit-btn:hover:not(:disabled) {
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

  /* Footer */
  .card-footer {
    text-align: center;
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .login-link {
    color: #cc05a0;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
  }
  .login-link:hover { color: #ff66e0; }

  @keyframes blink { 0%,80%,100% { opacity: 0; } 40% { opacity: 1; } }
  .dot { display: inline-block; animation: blink 1.2s ease-in-out infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
`;

function getStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "weak" };
  if (score === 2) return { score: 2, label: "Fair", color: "fair" };
  if (score === 3) return { score: 3, label: "Good", color: "good" };
  return { score: 4, label: "Strong", color: "strong" };
}

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const strength = getStrength(password);
  const confirmMatch = confirmPassword.length > 0 && password === confirmPassword;
  const confirmMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!privacyAccepted) {
      setError("Please accept the privacy policy to continue");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }
      setError("");
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="signup-root">
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

          {/* Body */}
          <div className="card-body">
            <div className="form-title">Create Account</div>

            {error && <div className="error-box">⚠️ {error}</div>}

            {/* Full Name */}
            <div className="field">
              <label className="field-label">Full Name</label>
              <div className="input-wrap">
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="field-input"
                />
              </div>
            </div>

            {/* Email */}
            <div className="field">
              <label className="field-label">Email Address</label>
              <div className="input-wrap">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="field-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="field">
              <label className="field-label">Password</label>
              <div className="input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="field-input has-btn"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="eye-btn"
                >
                  {showPassword ? "🔒︎" : "👁"}
                </button>
              </div>

              {/* Strength indicator */}
              {password.length > 0 && (
                <>
                  <div className="strength-bar-wrap">
                    {[1, 2, 3, 4].map((seg) => (
                      <div
                        key={seg}
                        className={`strength-seg ${
                          strength.score >= seg ? `active-${strength.color}` : ""
                        }`}
                      />
                    ))}
                  </div>
                  <div className={`strength-label label-${strength.color}`}>
                    {strength.label} password
                  </div>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="field">
              <label className="field-label">Confirm Password</label>
              <div className="input-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className={`field-input has-btn ${
                    confirmMatch ? "input-success" : confirmMismatch ? "input-error" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  disabled={loading}
                  className="eye-btn"
                >
                  {showConfirm ? "🔒︎" : "👁"}
                </button>
              </div>
              {confirmMismatch && (
                <div style={{ fontSize: "11px", color: "#ff7a7a", marginTop: "4px" }}>
                  Passwords do not match
                </div>
              )}
              {confirmMatch && (
                <div style={{ fontSize: "11px", color: "#44ee88", marginTop: "4px" }}>
                  ✓ Passwords match
                </div>
              )}
            </div>

            {/* Privacy Policy */}
            <label className="privacy-row" onClick={() => setPrivacyAccepted(!privacyAccepted)}>
              <div className={`custom-check ${privacyAccepted ? "checked" : ""}`}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="privacy-text">
                I accept the{" "}
                <Link to="/terms" onClick={(e) => e.stopPropagation()}>Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" onClick={(e) => e.stopPropagation()}>Privacy Policy</Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              className="submit-btn"
            >
              {loading ? (
                <>Creating account<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></>
              ) : "Create Account"}
            </button>

            {/* Footer */}
            <div className="card-footer">
              Already have an account?{" "}
              <Link to="/login" className="login-link">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}