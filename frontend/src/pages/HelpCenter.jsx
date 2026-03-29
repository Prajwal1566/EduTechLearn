import React, { useState } from "react";
import logo from "../asset/logow.png";
import { Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .hc-root {
    min-height: 100vh;
    background: #1f001d;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
    position: relative;
    overflow-x: hidden;
  }

  /* Orbs */
  .hc-orb {
    position: fixed; border-radius: 50%;
    filter: blur(90px); pointer-events: none; z-index: 0;
    animation: floatOrb 10s ease-in-out infinite;
  }
  .hc-orb-1 { width:420px; height:420px; background:radial-gradient(circle,#9900ff22,transparent); top:-80px; left:-80px; }
  .hc-orb-2 { width:360px; height:360px; background:radial-gradient(circle,#ff00aa18,transparent); bottom:-60px; right:-60px; animation-delay:-4s; }
  @keyframes floatOrb {
    0%,100% { transform:translate(0,0) scale(1); }
    50% { transform:translate(20px,-30px) scale(1.05); }
  }

  /* ── NAVBAR ── */
  .hc-navbar {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 62px;
    background: rgba(31,0,29,0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .hc-brand {
    display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0;
  }
  .hc-brand-logo {
    width:36px; height:36px; border-radius:10px;
    overflow:hidden; background:linear-gradient(135deg,#99037d,#4C003E);
  }
  .hc-brand-logo img { width:100%; height:100%; object-fit:cover; }
  .hc-brand-name { font-family:'Syne',sans-serif; font-weight:800; font-size:17px; color:#fff; letter-spacing:-.3px; }
  .hc-brand-sub { font-size:10px; color:rgba(255,255,255,.38); letter-spacing:.5px; }

  .hc-back {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 13px; font-weight: 600; color: rgba(255,255,255,.5);
    cursor: pointer; border: none; background: none; padding: 0;
    transition: color .2s; font-family: 'DM Sans', sans-serif; text-decoration: none;
  }
  .hc-back:hover { color: #fff; }
  .hc-back-arrow {
    width: 30px; height: 30px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.05);
    display: flex; align-items: center; justify-content: center; font-size: 13px; transition: all .2s;
  }
  .hc-back:hover .hc-back-arrow { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); color:#fff; }

  /* ── HERO ── */
  .hc-hero {
    position: relative; z-index: 1;
    background: linear-gradient(135deg,#2a001f 0%,#4C003E 55%,#320026 100%);
    padding: 52px 32px 110px;
    text-align: center; overflow: hidden;
  }
  .hc-hero::before {
    content:''; position:absolute; inset:0;
    background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px; opacity:.03; pointer-events:none;
  }
  .hc-hero-inner { position:relative; z-index:1; max-width:600px; margin:0 auto; }
  .hc-hero-icon {
    width: 72px; height: 72px; border-radius: 20px; margin: 0 auto 20px;
    background: rgba(153,3,125,.2); border: 1px solid rgba(153,3,125,.35);
    display: flex; align-items: center; justify-content: center; font-size: 32px;
    box-shadow: 0 0 32px rgba(153,3,125,.3);
    animation: iconPop .6s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes iconPop { from{transform:scale(0) rotate(-15deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
  .hc-hero-title {
    font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(26px,5vw,40px);
    color:#fff; margin-bottom:10px; animation:fadeUp .5s .1s ease both;
  }
  .hc-hero-sub {
    font-size:15px; color:rgba(255,255,255,.5); line-height:1.6;
    animation:fadeUp .5s .18s ease both;
  }
  @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

  /* ── CONTACT STRIP (overlaps hero) ── */
  .hc-contact-strip {
    position: relative; z-index: 2;
    max-width: 860px; margin: -48px auto 0; padding: 0 20px;
  }
  .hc-contact-card {
    border-radius: 18px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.1);
    backdrop-filter: blur(24px);
    display: grid; grid-template-columns: repeat(3,1fr);
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0,0,0,.35);
  }
  .hc-contact-item {
    padding: 22px 16px; text-align: center;
    border-right: 1px solid rgba(255,255,255,.07);
    transition: background .2s; cursor: default;
  }
  .hc-contact-item:last-child { border-right: none; }
  .hc-contact-item:hover { background: rgba(153,3,125,.08); }
  .hc-contact-icon { font-size: 22px; margin-bottom: 8px; }
  .hc-contact-label { font-size:11px; color:rgba(255,255,255,.38); letter-spacing:.5px; text-transform:uppercase; margin-bottom:4px; }
  .hc-contact-val { font-size:13px; font-weight:600; color:#fff; }

  /* ── MAIN CONTENT ── */
  .hc-content {
    position: relative; z-index: 1;
    max-width: 960px; margin: 0 auto;
    padding: 48px 20px 72px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 28px;
  }

  /* ── FORM CARD ── */
  .hc-form-card {
    border-radius: 20px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.09);
    backdrop-filter: blur(20px);
    padding: 28px;
    box-shadow: 0 12px 40px rgba(0,0,0,.3);
  }
  .hc-card-title {
    font-family:'Syne',sans-serif; font-weight:700; font-size:18px; color:#fff;
    margin-bottom:6px; display:flex; align-items:center; gap:8px;
  }
  .hc-card-sub { font-size:13px; color:rgba(255,255,255,.38); margin-bottom:22px; }

  .hc-field { margin-bottom: 14px; }
  .hc-field-label {
    display:block; margin-bottom:6px;
    font-size:11px; font-weight:600; color:rgba(255,255,255,.45);
    letter-spacing:.8px; text-transform:uppercase;
  }
  .hc-input, .hc-select, .hc-textarea {
    width: 100%; padding: 11px 14px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 11px; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    outline: none; transition: all .25s ease;
  }
  .hc-input::placeholder, .hc-textarea::placeholder { color:rgba(255,255,255,.2); }
  .hc-input:focus, .hc-select:focus, .hc-textarea:focus {
    border-color: rgba(153,3,125,.65);
    background: rgba(153,3,125,.08);
    box-shadow: 0 0 0 3px rgba(153,3,125,.15);
  }
  .hc-select { cursor:pointer; appearance:none; }
  .hc-select option { background:#2a001f; color:#fff; }
  .hc-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }

  /* Success message */
  .hc-success {
    padding: 12px 14px; border-radius: 11px;
    background: rgba(68,238,136,.08); border: 1px solid rgba(68,238,136,.25);
    color: #44ee88; font-size: 13px; font-weight: 600;
    display: flex; align-items: center; gap: 8px; margin-bottom: 14px;
    animation: fadeUp .3s ease both;
  }

  .hc-submit {
    width: 100%; padding: 13px;
    background: linear-gradient(135deg,#99037d,#4C003E 60%,#7a0260);
    border: none; border-radius: 12px; color: #fff;
    font-family:'Syne',sans-serif; font-size:15px; font-weight:700; letter-spacing:.4px;
    cursor: pointer; position: relative; overflow: hidden;
    transition: all .3s ease;
    box-shadow: 0 8px 24px rgba(153,3,125,.4);
    margin-top: 4px;
  }
  .hc-submit::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.15),transparent); opacity:0; transition:opacity .3s; }
  .hc-submit:hover::before { opacity:1; }
  .hc-submit:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(153,3,125,.55); }
  .hc-submit:active { transform:translateY(0); }
  .hc-submit::after { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent); animation:shimmer 3s ease-in-out infinite; }
  @keyframes shimmer { 0%{left:-100%} 50%,100%{left:150%} }

  /* ── FAQ CARD ── */
  .hc-faq-card {
    border-radius: 20px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.09);
    backdrop-filter: blur(20px);
    padding: 28px;
    box-shadow: 0 12px 40px rgba(0,0,0,.3);
    display: flex; flex-direction: column; gap: 10px;
    align-self: start;
  }

  .hc-faq-item {
    border-radius: 13px;
    border: 1px solid rgba(255,255,255,.07);
    background: rgba(255,255,255,.03);
    overflow: hidden;
    transition: border-color .2s;
    cursor: pointer;
  }
  .hc-faq-item.open { border-color: rgba(153,3,125,.3); background: rgba(153,3,125,.05); }
  .hc-faq-item:hover { border-color: rgba(255,255,255,.13); }
  .hc-faq-item.open:hover { border-color: rgba(153,3,125,.4); }

  .hc-faq-q {
    padding: 14px 16px;
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    font-size: 14px; font-weight: 600; color: #fff;
    user-select: none;
  }
  .hc-faq-chevron {
    font-size: 11px; color: rgba(255,255,255,.35);
    transition: transform .3s ease; flex-shrink: 0;
  }
  .hc-faq-item.open .hc-faq-chevron { transform: rotate(180deg); color: #cc05a0; }

  .hc-faq-a {
    max-height: 0; overflow: hidden;
    transition: max-height .3s cubic-bezier(0.4,0,0.2,1), opacity .25s ease;
    opacity: 0;
  }
  .hc-faq-item.open .hc-faq-a { max-height: 120px; opacity: 1; }
  .hc-faq-a-inner {
    padding: 0 16px 14px;
    font-size: 13px; color: rgba(255,255,255,.5); line-height: 1.6;
    border-top: 1px solid rgba(255,255,255,.06);
    padding-top: 10px;
  }

  /* ── FOOTER ── */
  .hc-footer {
    position: relative; z-index: 1;
    background: rgba(0,0,0,.28);
    border-top: 1px solid rgba(255,255,255,.06);
    padding: 40px 32px 24px;
  }
  .hc-footer-grid {
    max-width: 960px; margin: 0 auto 28px;
    display: grid; grid-template-columns: repeat(auto-fit,minmax(160px,1fr)); gap: 28px;
  }
  .hc-footer-col h3 { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; margin-bottom:8px; }
  .hc-footer-col h4 { font-family:'Syne',sans-serif; font-weight:600; font-size:13px; color:rgba(255,255,255,.55); margin-bottom:8px; }
  .hc-footer-col p, .hc-footer-col a { font-size:12px; color:rgba(255,255,255,.32); text-decoration:none; display:block; margin-bottom:5px; transition:color .2s; }
  .hc-footer-col a:hover { color:rgba(255,255,255,.7); }
  .hc-footer-bottom { max-width:960px; margin:0 auto; padding-top:20px; border-top:1px solid rgba(255,255,255,.06); font-size:12px; color:rgba(255,255,255,.22); text-align:center; }

  /* Responsive */
  @media(max-width:768px){
    .hc-navbar { padding:0 16px; }
    .hc-hero { padding:40px 16px 100px; }
    .hc-contact-strip { padding:0 16px; }
    .hc-contact-card { grid-template-columns:1fr; }
    .hc-contact-item { border-right:none; border-bottom:1px solid rgba(255,255,255,.07); }
    .hc-contact-item:last-child { border-bottom:none; }
    .hc-content { grid-template-columns:1fr; padding:32px 16px 56px; }
    .hc-footer { padding:28px 16px 20px; }
  }
`;

const FAQS = [
  { q: "How do I reset my password?",      a: "Click on \"Forgot Password\" on the login page and follow the instructions sent to your email." },
  { q: "How do I access purchased courses?", a: "Go to Dashboard → My Courses after logging in. All your enrolled courses will appear there." },
  { q: "Can I get a refund?",              a: "Refunds are available within 7 days of purchase. Contact support@edutech.com to raise a request." },
  { q: "Why can't I watch a course video?", a: "Ensure you've purchased the course. If the issue persists, try clearing browser cache or contact support." },
  { q: "How do I download my certificate?", a: "After completing a course (100% progress), go to My Courses and click \"Download Certificate\"." },
];

export default function HelpCenter() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email:"", subject:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ email:"", subject:"", message:"" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="hc-root">
        <div className="hc-orb hc-orb-1" />
        <div className="hc-orb hc-orb-2" />

        {/* ── NAVBAR ── */}
        <nav className="hc-navbar">
          <Link to="/home" className="hc-brand">
            <div className="hc-brand-logo"><img src={logo} alt="EDU-TECH Logo" className="logo-image" /></div>
            <div>
              <div className="hc-brand-name">EDU-TECH</div>
              <div className="hc-brand-sub">E-Learning Platform</div>
            </div>
          </Link>
          <button className="hc-back" onClick={() => navigate(-1)}>
            <span className="hc-back-arrow">←</span>
            Back
          </button>
        </nav>

        {/* ── HERO ── */}
        <div className="hc-hero">
          <div className="hc-hero-inner">
            <div className="hc-hero-icon">🎯</div>
            <h1 className="hc-hero-title">Help Center</h1>
            <p className="hc-hero-sub">We're here to support your learning journey.<br />Find answers or reach out to our team.</p>
          </div>
        </div>

        {/* ── CONTACT STRIP ── */}
        <div className="hc-contact-strip">
          <div className="hc-contact-card">
            <div className="hc-contact-item">
              <div className="hc-contact-icon">✉️</div>
              <div className="hc-contact-label">Email Support</div>
              <div className="hc-contact-val">support@edutech.com</div>
            </div>
            <div className="hc-contact-item">
              <div className="hc-contact-icon">💬</div>
              <div className="hc-contact-label">Live Chat</div>
              <div className="hc-contact-val">Available 9AM – 6PM</div>
            </div>
            <div className="hc-contact-item">
              <div className="hc-contact-icon">📞</div>
              <div className="hc-contact-label">Phone</div>
              <div className="hc-contact-val">+91 98765 43210</div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="hc-content">

          {/* FORM */}
          <div className="hc-form-card">
            <div className="hc-card-title">📩 Submit a Request</div>
            <div className="hc-card-sub">Fill out the form and we'll get back to you within 24 hours.</div>

            {submitted && (
              <div className="hc-success">✓ Your request has been submitted! We'll respond shortly.</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="hc-field">
                <label className="hc-field-label">Email Address</label>
                <input className="hc-input" type="email" name="email" placeholder="you@example.com"
                  value={form.email} onChange={handleChange} required />
              </div>
              <div className="hc-field">
                <label className="hc-field-label">Issue Type</label>
                <select className="hc-select" name="subject" value={form.subject} onChange={handleChange} required>
                  <option value="">Select Issue</option>
                  <option value="login">Login Problem</option>
                  <option value="payment">Payment Issue</option>
                  <option value="course">Course Access</option>
                  <option value="technical">Technical Error</option>
                </select>
              </div>
              <div className="hc-field">
                <label className="hc-field-label">Message</label>
                <textarea className="hc-textarea" name="message" placeholder="Describe your issue in detail..."
                  value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="hc-submit">Send Request →</button>
            </form>
          </div>

          {/* FAQ */}
          <div className="hc-faq-card">
            <div className="hc-card-title">❓ Frequently Asked Questions</div>
            <div className="hc-card-sub" style={{marginBottom:8}}>Click a question to expand the answer.</div>

            {FAQS.map((faq, i) => (
              <div key={i} className={`hc-faq-item ${openFaq === i ? "open" : ""}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="hc-faq-q">
                  {faq.q}
                  <span className="hc-faq-chevron">▼</span>
                </div>
                <div className="hc-faq-a">
                  <div className="hc-faq-a-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── FOOTER ── */}
        <footer className="hc-footer">
          <div className="hc-footer-grid">
            <div className="hc-footer-col">
              <h3>EDU-TECH</h3>
              <p>An E-Learning Platform to upgrade your skills.</p>
            </div>
            <div className="hc-footer-col">
              <h4>Quick Links</h4>
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <div className="hc-footer-col">
              <h4>Support</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/help">Help Center</Link>
            </div>
            <div className="hc-footer-col">
              <h4>Contact</h4>
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@edutech.com</p>
            </div>
          </div>
          <div className="hc-footer-bottom">© 2026 EDU-TECH. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}