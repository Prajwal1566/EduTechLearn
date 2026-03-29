import React from "react";
import logo from "../asset/logow.png";
import { Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pp-root {
    min-height: 100vh;
    background: #1f001d;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
    position: relative;
    overflow-x: hidden;
  }

  .pp-orb {
    position: fixed; border-radius: 50%;
    filter: blur(90px); pointer-events: none; z-index: 0;
    animation: floatOrb 10s ease-in-out infinite;
  }
  .pp-orb-1 { width:420px; height:420px; background:radial-gradient(circle,#9900ff22,transparent); top:-80px; left:-80px; }
  .pp-orb-2 { width:360px; height:360px; background:radial-gradient(circle,#ff00aa18,transparent); bottom:-60px; right:-60px; animation-delay:-4s; }
  @keyframes floatOrb {
    0%,100% { transform:translate(0,0) scale(1); }
    50% { transform:translate(20px,-30px) scale(1.05); }
  }

  /* ── NAVBAR ── */
  .pp-navbar {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 62px;
    background: rgba(31,0,29,0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .pp-brand {
    display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0;
  }
  .pp-brand-logo {
    width:36px; height:36px; border-radius:10px;
    overflow:hidden; background:linear-gradient(135deg,#99037d,#4C003E);
  }
  .pp-brand-logo img { width:100%; height:100%; object-fit:cover; }
  .pp-brand-name { font-family:'Syne',sans-serif; font-weight:800; font-size:17px; color:#fff; letter-spacing:-.3px; }
  .pp-brand-sub { font-size:10px; color:rgba(255,255,255,.38); letter-spacing:.5px; }

  .pp-back {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 13px; font-weight: 600; color: rgba(255,255,255,.5);
    cursor: pointer; border: none; background: none; padding: 0;
    transition: color .2s; font-family: 'DM Sans', sans-serif;
  }
  .pp-back:hover { color: #fff; }
  .pp-back-arrow {
    width: 30px; height: 30px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.05);
    display: flex; align-items: center; justify-content: center; font-size: 13px; transition: all .2s;
  }
  .pp-back:hover .pp-back-arrow { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); color:#fff; }

  /* ── HERO ── */
  .pp-hero {
    position: relative; z-index: 1;
    background: linear-gradient(135deg,#2a001f 0%,#4C003E 55%,#320026 100%);
    padding: 48px 32px 56px; text-align: center; overflow: hidden;
  }
  .pp-hero::before {
    content:''; position:absolute; inset:0;
    background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px; opacity:.03; pointer-events:none;
  }
  .pp-hero-inner { position:relative; z-index:1; max-width:580px; margin:0 auto; }
  .pp-hero-icon {
    width:68px; height:68px; border-radius:18px; margin:0 auto 18px;
    background:rgba(153,3,125,.2); border:1px solid rgba(153,3,125,.35);
    display:flex; align-items:center; justify-content:center; font-size:30px;
    box-shadow:0 0 30px rgba(153,3,125,.28);
    animation: iconPop .5s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes iconPop { from{transform:scale(0) rotate(-10deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
  .pp-hero-title {
    font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(24px,4vw,36px);
    color:#fff; margin-bottom:8px; animation:fadeUp .5s .1s ease both;
  }
  .pp-last-updated {
    font-size:12px; color:rgba(255,255,255,.35); letter-spacing:.5px;
    animation:fadeUp .5s .18s ease both;
  }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  /* ── MAIN ── */
  .pp-main {
    position: relative; z-index: 1;
    max-width: 760px; margin: 0 auto;
    padding: 44px 20px 72px;
  }

  /* TOC */
  .pp-toc {
    border-radius: 16px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    padding: 20px 22px;
    margin-bottom: 32px;
  }
  .pp-toc-title {
    font-family:'Syne',sans-serif; font-weight:700; font-size:13px;
    color:rgba(255,255,255,.5); letter-spacing:.8px; text-transform:uppercase;
    margin-bottom:12px; display:flex; align-items:center; gap:8px;
  }
  .pp-toc-title::after { content:''; flex:1; height:1px; background:rgba(255,255,255,.07); }
  .pp-toc-list { display:flex; flex-direction:column; gap:6px; }
  .pp-toc-link {
    display:flex; align-items:center; gap:10px;
    font-size:13px; color:rgba(255,255,255,.45); text-decoration:none;
    padding:5px 8px; border-radius:8px; transition:all .2s;
  }
  .pp-toc-link:hover { color:#fff; background:rgba(255,255,255,.06); }
  .pp-toc-num {
    width:22px; height:22px; border-radius:6px; flex-shrink:0;
    background:rgba(153,3,125,.15); border:1px solid rgba(153,3,125,.25);
    display:flex; align-items:center; justify-content:center;
    font-size:10px; font-weight:700; color:#cc05a0;
  }

  /* Sections */
  .pp-section {
    margin-bottom: 16px;
    border-radius: 16px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
    padding: 22px 24px;
    transition: border-color .2s, background .2s;
    scroll-margin-top: 80px;
  }
  .pp-section:hover { border-color:rgba(153,3,125,.2); background:rgba(153,3,125,.03); }

  .pp-section-header {
    display:flex; align-items:center; gap:12px; margin-bottom:12px;
  }
  .pp-section-num {
    width:32px; height:32px; border-radius:9px; flex-shrink:0;
    background:rgba(153,3,125,.15); border:1px solid rgba(153,3,125,.25);
    display:flex; align-items:center; justify-content:center;
    font-family:'Syne',sans-serif; font-size:12px; font-weight:800; color:#cc05a0;
  }
  .pp-section h2 {
    font-family:'Syne',sans-serif; font-weight:700; font-size:16px; color:#fff;
  }
  .pp-section p {
    font-size:14px; color:rgba(255,255,255,.55); line-height:1.75;
    padding-left:44px;
  }

  /* Contact box */
  .pp-contact {
    border-radius: 16px;
    background: rgba(153,3,125,.08);
    border: 1px solid rgba(153,3,125,.25);
    padding: 22px 24px;
    display: flex; align-items: flex-start; gap: 14px;
    margin-bottom: 28px;
  }
  .pp-contact-icon { font-size:22px; flex-shrink:0; margin-top:2px; }
  .pp-contact-text { font-size:13px; color:rgba(255,255,255,.6); line-height:1.7; }
  .pp-contact-text strong { color:#ff88dd; }

  /* Back to top */
  .pp-top-btn {
    display:flex; align-items:center; justify-content:center; gap:8px;
    width:100%; padding:13px;
    background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
    border-radius:13px; color:rgba(255,255,255,.5);
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600;
    cursor:pointer; transition:all .2s;
  }
  .pp-top-btn:hover { background:rgba(255,255,255,.1); color:#fff; }

  /* ── FOOTER ── */
  .pp-footer {
    position:relative; z-index:1;
    background:rgba(0,0,0,.28);
    border-top:1px solid rgba(255,255,255,.06);
    padding:40px 32px 24px;
  }
  .pp-footer-grid {
    max-width:960px; margin:0 auto 28px;
    display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:28px;
  }
  .pp-footer-col h3 { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; margin-bottom:8px; }
  .pp-footer-col h4 { font-family:'Syne',sans-serif; font-weight:600; font-size:13px; color:rgba(255,255,255,.55); margin-bottom:8px; }
  .pp-footer-col p, .pp-footer-col a { font-size:12px; color:rgba(255,255,255,.32); text-decoration:none; display:block; margin-bottom:5px; transition:color .2s; }
  .pp-footer-col a:hover { color:rgba(255,255,255,.7); }
  .pp-footer-bottom { max-width:960px; margin:0 auto; padding-top:20px; border-top:1px solid rgba(255,255,255,.06); font-size:12px; color:rgba(255,255,255,.22); text-align:center; }

  @media(max-width:640px){
    .pp-navbar { padding:0 16px; }
    .pp-hero { padding:36px 16px 44px; }
    .pp-main { padding:32px 16px 56px; }
    .pp-footer { padding:28px 16px 20px; }
    .pp-section p { padding-left:0; }
  }
`;

const SECTIONS = [
  { num:"1", title:"Information We Collect",   body:"We collect personal information such as your name, email address, payment details, and learning activity when you register or use EDU-TECH services." },
  { num:"2", title:"How We Use Your Information", body:"Your information is used to provide course access, improve platform performance, process payments, and offer customer support." },
  { num:"3", title:"Data Security",            body:"We implement industry-standard security measures to protect your personal data from unauthorized access or misuse." },
  { num:"4", title:"Cookies",                  body:"EDU-TECH uses cookies to enhance user experience, analyze traffic, and personalize content." },
  { num:"5", title:"Third-Party Services",     body:"We may use trusted third-party services for payment processing and analytics. These providers follow strict privacy standards." },
  { num:"6", title:"User Rights",              body:"You have the right to access, update, or delete your personal information by contacting our support team." },
  { num:"7", title:"Policy Updates",           body:"We may update this Privacy Policy from time to time. Continued use of EDU-TECH indicates acceptance of these changes." },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <>
      <style>{styles}</style>
      <div className="pp-root">
        <div className="pp-orb pp-orb-1" />
        <div className="pp-orb pp-orb-2" />

        {/* ── NAVBAR ── */}
        <nav className="pp-navbar">
          <Link to="/home" className="pp-brand">
            <div className="pp-brand-logo"><img src={logo} alt="EDU-TECH Logo" className="logo-image" /></div>
            <div>
              <div className="pp-brand-name">EDU-TECH</div>
              <div className="pp-brand-sub">E-Learning Platform</div>
            </div>
          </Link>
          <button className="pp-back" onClick={() => navigate(-1)}>
            <span className="pp-back-arrow">←</span>
            Back
          </button>
        </nav>

        {/* ── HERO ── */}
        <div className="pp-hero">
          <div className="pp-hero-inner">
            <div className="pp-hero-icon">🔒</div>
            <h1 className="pp-hero-title">Privacy Policy</h1>
            <p className="pp-last-updated">Last Updated: February 2026</p>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="pp-main">

          {/* Table of Contents */}
          <div className="pp-toc">
            <div className="pp-toc-title">Table of Contents</div>
            <div className="pp-toc-list">
              {SECTIONS.map(s => (
                <a key={s.num} href={`#pp-${s.num}`} className="pp-toc-link">
                  <span className="pp-toc-num">{s.num}</span>
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          {SECTIONS.map(s => (
            <div key={s.num} id={`pp-${s.num}`} className="pp-section">
              <div className="pp-section-header">
                <div className="pp-section-num">{s.num}</div>
                <h2>{s.title}</h2>
              </div>
              <p>{s.body}</p>
            </div>
          ))}

          {/* Contact box */}
          <div className="pp-contact">
            <span className="pp-contact-icon">✉️</span>
            <p className="pp-contact-text">
              If you have any questions about this Privacy Policy, contact us at <strong>support@edutech.com</strong>
            </p>
          </div>

          {/* Back to top */}
          <button className="pp-top-btn" onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}>
            ↑ Back to Top
          </button>

        </div>

        {/* ── FOOTER ── */}
        <footer className="pp-footer">
          <div className="pp-footer-grid">
            <div className="pp-footer-col">
              <h3>EDU-TECH</h3>
              <p>An E-Learning Platform to upgrade your skills.</p>
            </div>
            <div className="pp-footer-col">
              <h4>Quick Links</h4>
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <div className="pp-footer-col">
              <h4>Support</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/help">Help Center</Link>
            </div>
            <div className="pp-footer-col">
              <h4>Contact</h4>
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@edutech.com</p>
            </div>
          </div>
          <div className="pp-footer-bottom">© 2026 EDU-TECH. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}