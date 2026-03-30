import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../asset/logow.png";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .login-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1f001d;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
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

  .card-header {
    padding: 20px 28px 14px;
    text-align: center;
    position: relative;
  }

  .logo-img-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border-radius: 18px;
    background: linear-gradient(135deg, #99037d, #4C003E);
    box-shadow: 0 8px 24px rgba(153,3,125,0.5), 0 0 0 1px rgba(255,255,255,0.1) inset;
    margin-bottom: 10px;
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
    font-size: 22px;
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

  .card-body {
    padding: 18px 28px 24px;
  }

  .form-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
    margin-bottom: 16px;
    animation: slideIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-16px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .error-box {
    background: rgba(255, 60, 60, 0.1);
    border: 1px solid rgba(255, 60, 60, 0.3);
    color: #ff9a9a;
    font-size: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    margin-bottom: 14px;
    backdrop-filter: blur(8px);
    animation: shake 0.4s ease;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  .field {
    margin-bottom: 12px;
    animation: slideIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }
  .field:nth-child(2) { animation-delay: 0.35s; }
  .field:nth-child(3) { animation-delay: 0.45s; }

  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .input-wrap { position: relative; }

  .field-input {
    width: 100%;
    padding: 11px 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    backdrop-filter: blur(8px);
  }

  .field-input::placeholder { color: rgba(255,255,255,0.2); }

  .field-input:focus {
    background: rgba(153,3,125,0.08);
    border-color: rgba(153,3,125,0.7);
    box-shadow:
      0 0 0 3px rgba(153,3,125,0.2),
      0 0 30px rgba(153,3,125,0.15),
      0 0 0 0.5px rgba(255,255,255,0.05) inset;
    transform: translateY(-1px);
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
    color: rgba(255,255,255,0.3);
    transition: color 0.2s;
    padding: 4px;
    line-height: 1;
  }
  .eye-btn:hover { color: rgba(153,3,125,0.9); }

  .forgot-row {
    text-align: right;
    margin-bottom: 16px;
    margin-top: -4px;
  }
  .forgot-link {
    font-size: 12px;
    color: hsla(312, 76%, 87%, 0.66);
    text-decoration: none;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: color 0.2s;
  }
  .forgot-link:hover { color: #ff00cc; text-shadow: 0 0 12px rgba(255,0,204,0.5); }

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
    animation: slideIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.55s both;
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
  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(153,3,125,0.55), 0 0 0 1px rgba(255,255,255,0.15) inset;
  }
  .submit-btn:active { transform: translateY(0); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

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

  .card-footer {
    text-align: center;
    font-size: 13px;
    color: rgba(255,255,255,0.3);
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,0.06);
    animation: slideIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.6s both;
  }
  .signup-link {
    color: hsla(312, 76%, 87%, 0.66);
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
  }
  .signup-link:hover { color: #ff00cc; text-shadow: 0 0 12px rgba(255,0,204,0.4); }

  @keyframes blink { 0%,80%,100% { opacity: 0; } 40% { opacity: 1; } }
  .dot { display: inline-block; animation: blink 1.2s ease-in-out infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
`;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || password === "") {
      setError("Please enter email and password");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }
      setError("");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token); // 🔐 STORE JWT TOKEN
      navigate("/Home");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
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
          <div className="card-body" onSubmit={handleLogin}>
            <div className="form-title">Welcome back</div>

            {error && (
              <div className="error-box">⚠️ {error}</div>
            )}

            {/* Email */}
            <div className="field">
              <label className="field-label">Email Address</label>
              <div className="input-wrap">
                <input
                  type="email"
                  name="username"
                  autoComplete="username"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="field-input"
                  required
                />
              </div>
            </div>

            <input
              type="text"
              name="username"
              autoComplete="username"
              style={{ display: "none" }}
            />

            {/* Password */}
            <div className="field">
              <label className="field-label">Password</label>
              <div className="input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="field-input has-btn"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                  className="eye-btn"
                >
                  {showPassword ? "🔒︎" : "👁"}
                </button>
              </div>
            </div>

            {/* Forgot */}
            <div className="forgot-row">
              <Link to="/forgot" className="forgot-link">Forgot password?</Link>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="submit-btn"
            >
              {loading ? (
                <>Logging in<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></>
              ) : "Login"}
            </button>

            {/* Footer */}
            <div className="card-footer">
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}