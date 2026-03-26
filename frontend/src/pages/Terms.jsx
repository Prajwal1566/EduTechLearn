import React from "react";
import { Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .tc-root {
    min-height: 100vh;
    background: #1f001d;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
    position: relative;
    overflow-x: hidden;
  }

  .tc-orb {
    position: fixed; border-radius: 50%;
    filter: blur(90px); pointer-events: none; z-index: 0;
    animation: floatOrb 10s ease-in-out infinite;
  }
  .tc-orb-1 { width:420px; height:420px; background:radial-gradient(circle,#9900ff22,transparent); top:-80px; left:-80px; }
  .tc-orb-2 { width:360px; height:360px; background:radial-gradient(circle,#ff00aa18,transparent); bottom:-60px; right:-60px; animation-delay:-4s; }
  @keyframes floatOrb {
    0%,100% { transform:translate(0,0) scale(1); }
    50% { transform:translate(20px,-30px) scale(1.05); }
  }

  /* ── NAVBAR ── */
  .tc-navbar {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 62px;
    background: rgba(31,0,29,0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .tc-brand {
    display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0;
  }
  .tc-brand-logo {
    width:36px; height:36px; border-radius:10px;
    overflow:hidden; background:linear-gradient(135deg,#99037d,#4C003E);
  }
  .tc-brand-logo img { width:100%; height:100%; object-fit:cover; }
  .tc-brand-name { font-family:'Syne',sans-serif; font-weight:800; font-size:17px; color:#fff; letter-spacing:-.3px; }
  .tc-brand-sub { font-size:10px; color:rgba(255,255,255,.38); letter-spacing:.5px; }

  .tc-back {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 13px; font-weight: 600; color: rgba(255,255,255,.5);
    cursor: pointer; border: none; background: none; padding: 0;
    transition: color .2s; font-family: 'DM Sans', sans-serif;
  }
  .tc-back:hover { color: #fff; }
  .tc-back-arrow {
    width: 30px; height: 30px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.05);
    display: flex; align-items: center; justify-content: center; font-size: 13px; transition: all .2s;
  }
  .tc-back:hover .tc-back-arrow { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); color:#fff; }

  /* ── HERO ── */
  .tc-hero {
    position: relative; z-index: 1;
    background: linear-gradient(135deg,#2a001f 0%,#4C003E 55%,#320026 100%);
    padding: 48px 32px 56px; text-align: center; overflow: hidden;
  }
  .tc-hero::before {
    content:''; position:absolute; inset:0;
    background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px; opacity:.03; pointer-events:none;
  }
  .tc-hero-inner { position:relative; z-index:1; max-width:580px; margin:0 auto; }
  .tc-hero-icon {
    width:68px; height:68px; border-radius:18px; margin:0 auto 18px;
    background:rgba(153,3,125,.2); border:1px solid rgba(153,3,125,.35);
    display:flex; align-items:center; justify-content:center; font-size:30px;
    box-shadow:0 0 30px rgba(153,3,125,.28);
    animation: iconPop .5s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes iconPop { from{transform:scale(0) rotate(-10deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
  .tc-hero-title {
    font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(24px,4vw,36px);
    color:#fff; margin-bottom:8px; animation:fadeUp .5s .1s ease both;
  }
  .tc-last-updated {
    font-size:12px; color:rgba(255,255,255,.35); letter-spacing:.5px;
    animation:fadeUp .5s .18s ease both;
  }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  /* ── MAIN ── */
  .tc-main {
    position: relative; z-index: 1;
    max-width: 760px; margin: 0 auto;
    padding: 44px 20px 72px;
  }

  /* TOC */
  .tc-toc {
    border-radius: 16px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    padding: 20px 22px;
    margin-bottom: 32px;
  }
  .tc-toc-title {
    font-family:'Syne',sans-serif; font-weight:700; font-size:13px;
    color:rgba(255,255,255,.5); letter-spacing:.8px; text-transform:uppercase;
    margin-bottom:12px; display:flex; align-items:center; gap:8px;
  }
  .tc-toc-title::after { content:''; flex:1; height:1px; background:rgba(255,255,255,.07); }
  .tc-toc-list { display:flex; flex-direction:column; gap:6px; }
  .tc-toc-link {
    display:flex; align-items:center; gap:10px;
    font-size:13px; color:rgba(255,255,255,.45); text-decoration:none;
    padding:5px 8px; border-radius:8px; transition:all .2s;
  }
  .tc-toc-link:hover { color:#fff; background:rgba(255,255,255,.06); }
  .tc-toc-num {
    width:22px; height:22px; border-radius:6px; flex-shrink:0;
    background:rgba(153,3,125,.15); border:1px solid rgba(153,3,125,.25);
    display:flex; align-items:center; justify-content:center;
    font-size:10px; font-weight:700; color:#cc05a0;
  }

  /* Sections */
  .tc-section {
    margin-bottom: 28px;
    border-radius: 16px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
    padding: 22px 24px;
    transition: border-color .2s, background .2s;
    scroll-margin-top: 80px;
  }
  .tc-section:hover { border-color:rgba(153,3,125,.2); background:rgba(153,3,125,.03); }

  .tc-section-header {
    display:flex; align-items:center; gap:12px; margin-bottom:12px;
  }
  .tc-section-num {
    width:32px; height:32px; border-radius:9px; flex-shrink:0;
    background:rgba(153,3,125,.15); border:1px solid rgba(153,3,125,.25);
    display:flex; align-items:center; justify-content:center;
    font-family:'Syne',sans-serif; font-size:12px; font-weight:800; color:#cc05a0;
  }
  .tc-section h2 {
    font-family:'Syne',sans-serif; font-weight:700; font-size:16px; color:#fff;
  }
  .tc-section p {
    font-size:14px; color:rgba(255,255,255,.55); line-height:1.75;
    padding-left:44px;
  }

  /* Agree box */
  .tc-agree {
    border-radius: 16px;
    background: rgba(153,3,125,.08);
    border: 1px solid rgba(153,3,125,.25);
    padding: 22px 24px;
    display: flex; align-items: flex-start; gap: 14px;
    margin-bottom: 28px;
  }
  .tc-agree-icon { font-size:22px; flex-shrink:0; margin-top:2px; }
  .tc-agree-text { font-size:13px; color:rgba(255,255,255,.6); line-height:1.7; }
  .tc-agree-text strong { color:#fff; }

  /* Back to top */
  .tc-top-btn {
    display:flex; align-items:center; justify-content:center; gap:8px;
    width:100%; padding:13px;
    background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
    border-radius:13px; color:rgba(255,255,255,.5);
    font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600;
    cursor:pointer; transition:all .2s;
  }
  .tc-top-btn:hover { background:rgba(255,255,255,.1); color:#fff; }

  /* ── FOOTER ── */
  .tc-footer {
    position:relative; z-index:1;
    background:rgba(0,0,0,.28);
    border-top:1px solid rgba(255,255,255,.06);
    padding:40px 32px 24px;
  }
  .tc-footer-grid {
    max-width:960px; margin:0 auto 28px;
    display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:28px;
  }
  .tc-footer-col h3 { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; margin-bottom:8px; }
  .tc-footer-col h4 { font-family:'Syne',sans-serif; font-weight:600; font-size:13px; color:rgba(255,255,255,.55); margin-bottom:8px; }
  .tc-footer-col p, .tc-footer-col a { font-size:12px; color:rgba(255,255,255,.32); text-decoration:none; display:block; margin-bottom:5px; transition:color .2s; }
  .tc-footer-col a:hover { color:rgba(255,255,255,.7); }
  .tc-footer-bottom { max-width:960px; margin:0 auto; padding-top:20px; border-top:1px solid rgba(255,255,255,.06); font-size:12px; color:rgba(255,255,255,.22); text-align:center; }

  @media(max-width:640px){
    .tc-navbar { padding:0 16px; }
    .tc-hero { padding:36px 16px 44px; }
    .tc-main { padding:32px 16px 56px; }
    .tc-footer { padding:28px 16px 20px; }
    .tc-section p { padding-left:0; }
  }
`;

const SECTIONS = [
  { num:"1", title:"Introduction",          body:'Welcome to EDU-TECH. By accessing and using our platform, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our services.' },
  { num:"2", title:"User Accounts",         body:'Users must provide accurate information during registration. You are responsible for maintaining the confidentiality of your login credentials.' },
  { num:"3", title:"Course Access",         body:'Purchased courses are accessible only to the registered user. Sharing login details or course content is strictly prohibited.' },
  { num:"4", title:"Payments & Refunds",    body:'All payments are processed securely. Refunds are available within 7 days of purchase, subject to review.' },
  { num:"5", title:"Intellectual Property", body:'All content, including videos, materials, and designs, belongs to EDU-TECH. Unauthorized copying or redistribution is not allowed.' },
  { num:"6", title:"Limitation of Liability", body:'EDU-TECH is not responsible for any technical issues, interruptions, or loss of data while using the platform.' },
  { num:"7", title:"Changes to Terms",      body:'We reserve the right to update these Terms at any time. Continued use of the platform means you accept the changes.' },
];

export default function Terms() {
  const navigate = useNavigate();

  return (
    <>
      <style>{styles}</style>
      <div className="tc-root">
        <div className="tc-orb tc-orb-1" />
        <div className="tc-orb tc-orb-2" />


        {/* ── NAVBAR ── */}
        <nav className="tc-navbar">
          <Link to="/home" className="tc-brand">
            <div className="tc-brand-logo"><img src="/logow.png" alt="logo" /></div>
            <div>
              <div className="tc-brand-name">EDU-TECH</div>
              <div className="tc-brand-sub">E-Learning Platform</div>
            </div>
          </Link>
          <button className="tc-back" onClick={() => navigate(-1)}>
            <span className="tc-back-arrow">←</span>
            Back
          </button>
        </nav>

        {/* ── HERO ── */}
        <div className="tc-hero">
          <div className="tc-hero-inner">
            <div className="tc-hero-icon">📋</div>
            <h1 className="tc-hero-title">Terms & Conditions</h1>
            <p className="tc-last-updated">Last Updated: February 2026</p>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="tc-main">

          {/* Table of Contents */}
          <div className="tc-toc">
            <div className="tc-toc-title">Table of Contents</div>
            <div className="tc-toc-list">
              {SECTIONS.map(s => (
                <a key={s.num} href={`#tc-${s.num}`} className="tc-toc-link">
                  <span className="tc-toc-num">{s.num}</span>
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          {SECTIONS.map(s => (
            <div key={s.num} id={`tc-${s.num}`} className="tc-section">
              <div className="tc-section-header">
                <div className="tc-section-num">{s.num}</div>
                <h2>{s.title}</h2>
              </div>
              <p>{s.body}</p>
            </div>
          ))}

          {/* Agree box */}
          <div className="tc-agree">
            <span className="tc-agree-icon">✅</span>
            <p className="tc-agree-text">
              By using <strong>EDU-TECH</strong>, you acknowledge that you have read and agree to these Terms & Conditions.
            </p>
          </div>

          {/* Back to top */}
          <button className="tc-top-btn" onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}>
            ↑ Back to Top
          </button>

        </div>

        {/* ── FOOTER ── */}
        <footer className="tc-footer">
          <div className="tc-footer-grid">
            <div className="tc-footer-col">
              <h3>EDU-TECH</h3>
              <p>An E-Learning Platform to upgrade your skills.</p>
            </div>
            <div className="tc-footer-col">
              <h4>Quick Links</h4>
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <div className="tc-footer-col">
              <h4>Support</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/help">Help Center</Link>
            </div>
            <div className="tc-footer-col">
              <h4>Contact</h4>
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@edutech.com</p>
            </div>
          </div>
          <div className="tc-footer-bottom">© 2026 EDU-TECH. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}