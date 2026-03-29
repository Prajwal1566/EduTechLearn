import React, { useState } from "react";
import logo from "../asset/logow.png";
import { Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ct-root {
    min-height: 100vh;
    background: #1f001d;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
    position: relative;
    overflow-x: hidden;
  }

  .ct-orb {
    position: fixed; border-radius: 50%;
    filter: blur(90px); pointer-events: none; z-index: 0;
    animation: floatOrb 10s ease-in-out infinite;
  }
  .ct-orb-1 { width:420px; height:420px; background:radial-gradient(circle,#9900ff22,transparent); top:-80px; left:-80px; }
  .ct-orb-2 { width:360px; height:360px; background:radial-gradient(circle,#ff00aa18,transparent); bottom:-60px; right:-60px; animation-delay:-4s; }
  @keyframes floatOrb {
    0%,100% { transform:translate(0,0) scale(1); }
    50% { transform:translate(20px,-30px) scale(1.05); }
  }

  /* ── NAVBAR ── */
  .ct-navbar {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 62px;
    background: rgba(31,0,29,0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .ct-brand {
    display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0;
  }
  .ct-brand-logo {
    width:36px; height:36px; border-radius:10px;
    overflow:hidden; background:linear-gradient(135deg,#99037d,#4C003E);
  }
  .ct-brand-logo img { width:100%; height:100%; object-fit:cover; }
  .ct-brand-name { font-family:'Syne',sans-serif; font-weight:800; font-size:17px; color:#fff; letter-spacing:-.3px; }
  .ct-brand-sub { font-size:10px; color:rgba(255,255,255,.38); letter-spacing:.5px; }

  .ct-nav-right { display:flex; align-items:center; gap:6px; margin-left:auto; }
  .ct-nav-links { display:flex; align-items:center; gap:2px; margin-right:8px; }
  .ct-nav-links a {
    padding:7px 13px; border-radius:8px; font-size:13px; font-weight:500;
    color:rgba(255,255,255,.5); text-decoration:none; transition:all .2s;
  }
  .ct-nav-links a:hover { color:#fff; background:rgba(255,255,255,.08); }

  .ct-back {
    display:inline-flex; align-items:center; gap:7px;
    font-size:13px; font-weight:600; color:rgba(255,255,255,.5);
    cursor:pointer; border:none; background:none; padding:0;
    transition:color .2s; font-family:'DM Sans',sans-serif;
  }
  .ct-back:hover { color:#fff; }
  .ct-back-arrow {
    width:30px; height:30px; border-radius:8px;
    border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.05);
    display:flex; align-items:center; justify-content:center; font-size:13px; transition:all .2s;
  }
  .ct-back:hover .ct-back-arrow { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); color:#fff; }

  /* ── HERO ── */
  .ct-hero {
    position: relative; z-index: 1;
    background: linear-gradient(135deg,#2a001f 0%,#4C003E 55%,#320026 100%);
    padding: 52px 32px 110px; text-align: center; overflow: hidden;
  }
  .ct-hero::before {
    content:''; position:absolute; inset:0;
    background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px; opacity:.03; pointer-events:none;
  }
  .ct-hero-inner { position:relative; z-index:1; max-width:580px; margin:0 auto; }
  .ct-hero-icon {
    width:72px; height:72px; border-radius:20px; margin:0 auto 18px;
    background:rgba(153,3,125,.2); border:1px solid rgba(153,3,125,.35);
    display:flex; align-items:center; justify-content:center; font-size:32px;
    box-shadow:0 0 32px rgba(153,3,125,.28);
    animation: iconPop .5s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes iconPop { from{transform:scale(0) rotate(-10deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
  .ct-hero-title {
    font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(26px,4vw,38px);
    color:#fff; margin-bottom:10px; animation:fadeUp .5s .1s ease both;
  }
  .ct-hero-sub {
    font-size:15px; color:rgba(255,255,255,.45); line-height:1.6;
    animation:fadeUp .5s .18s ease both;
  }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  /* ── CONTACT CARDS STRIP ── */
  .ct-cards-strip {
    position: relative; z-index: 2;
    max-width: 860px; margin: -48px auto 0; padding: 0 20px;
  }
  .ct-cards-row {
    display: grid; grid-template-columns: repeat(3,1fr);
    border-radius: 18px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.1);
    backdrop-filter: blur(24px);
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0,0,0,.35);
  }
  .ct-info-card {
    padding: 24px 18px; text-align: center;
    border-right: 1px solid rgba(255,255,255,.07);
    transition: background .2s;
  }
  .ct-info-card:last-child { border-right: none; }
  .ct-info-card:hover { background: rgba(153,3,125,.08); }
  .ct-info-icon {
    width:44px; height:44px; border-radius:12px; margin:0 auto 12px;
    background:rgba(153,3,125,.15); border:1px solid rgba(153,3,125,.25);
    display:flex; align-items:center; justify-content:center; font-size:20px;
  }
  .ct-info-label { font-size:11px; color:rgba(255,255,255,.38); letter-spacing:.5px; text-transform:uppercase; margin-bottom:5px; }
  .ct-info-val { font-size:13px; font-weight:600; color:#fff; line-height:1.5; }

  /* ── MAIN CONTENT ── */
  .ct-content {
    position: relative; z-index: 1;
    max-width: 960px; margin: 0 auto;
    padding: 48px 20px 72px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 28px;
    align-items: start;
  }

  /* ── FORM CARD ── */
  .ct-form-card {
    border-radius: 20px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.09);
    backdrop-filter: blur(20px);
    padding: 28px;
    box-shadow: 0 12px 40px rgba(0,0,0,.3);
  }
  .ct-card-title {
    font-family:'Syne',sans-serif; font-weight:700; font-size:18px; color:#fff;
    margin-bottom:5px; display:flex; align-items:center; gap:8px;
  }
  .ct-card-sub { font-size:13px; color:rgba(255,255,255,.38); margin-bottom:22px; }

  .ct-field { margin-bottom: 14px; }
  .ct-field-label {
    display:block; margin-bottom:6px;
    font-size:11px; font-weight:600; color:rgba(255,255,255,.45);
    letter-spacing:.8px; text-transform:uppercase;
  }
  .ct-input, .ct-select, .ct-textarea {
    width:100%; padding:11px 14px;
    background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
    border-radius:11px; color:#fff;
    font-family:'DM Sans',sans-serif; font-size:14px;
    outline:none; transition:all .25s ease;
  }
  .ct-input::placeholder, .ct-textarea::placeholder { color:rgba(255,255,255,.2); }
  .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
    border-color:rgba(153,3,125,.65);
    background:rgba(153,3,125,.08);
    box-shadow:0 0 0 3px rgba(153,3,125,.15);
  }
  .ct-select { cursor:pointer; appearance:none; }
  .ct-select option { background:#2a001f; color:#fff; }
  .ct-textarea { resize:vertical; min-height:120px; line-height:1.6; }
  .ct-field-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

  .ct-success {
    padding:12px 14px; border-radius:11px;
    background:rgba(68,238,136,.08); border:1px solid rgba(68,238,136,.25);
    color:#44ee88; font-size:13px; font-weight:600;
    display:flex; align-items:center; gap:8px; margin-bottom:14px;
    animation:fadeUp .3s ease both;
  }

  .ct-submit {
    width:100%; padding:13px;
    background:linear-gradient(135deg,#99037d,#4C003E 60%,#7a0260);
    border:none; border-radius:12px; color:#fff;
    font-family:'Syne',sans-serif; font-size:15px; font-weight:700; letter-spacing:.4px;
    cursor:pointer; position:relative; overflow:hidden;
    transition:all .3s ease; box-shadow:0 8px 24px rgba(153,3,125,.4);
    margin-top:4px;
  }
  .ct-submit::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.15),transparent); opacity:0; transition:opacity .3s; }
  .ct-submit:hover::before { opacity:1; }
  .ct-submit:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(153,3,125,.55); }
  .ct-submit:active { transform:translateY(0); }
  .ct-submit::after { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent); animation:shimmer 3s ease-in-out infinite; }
  @keyframes shimmer { 0%{left:-100%} 50%,100%{left:150%} }

  /* ── RIGHT COLUMN ── */
  .ct-right { display:flex; flex-direction:column; gap:16px; }

  .ct-detail-card {
    border-radius:16px;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);
    padding:20px 22px;
    transition:all .2s;
  }
  .ct-detail-card:hover { border-color:rgba(153,3,125,.2); background:rgba(153,3,125,.04); }

  .ct-detail-header {
    display:flex; align-items:center; gap:12px; margin-bottom:10px;
  }
  .ct-detail-icon {
    width:40px; height:40px; border-radius:11px; flex-shrink:0;
    background:rgba(153,3,125,.15); border:1px solid rgba(153,3,125,.25);
    display:flex; align-items:center; justify-content:center; font-size:18px;
  }
  .ct-detail-title { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; }
  .ct-detail-body { font-size:13px; color:rgba(255,255,255,.45); line-height:1.6; padding-left:52px; }

  /* Social row */
  .ct-social-card {
    border-radius:16px;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);
    padding:20px 22px;
  }
  .ct-social-title {
    font-family:'Syne',sans-serif; font-weight:700; font-size:14px; color:rgba(255,255,255,.5);
    letter-spacing:.6px; text-transform:uppercase; margin-bottom:14px;
    display:flex; align-items:center; gap:8px;
  }
  .ct-social-title::after { content:''; flex:1; height:1px; background:rgba(255,255,255,.07); }
  .ct-socials { display:flex; gap:10px; }
  .ct-social-btn {
    flex:1; padding:10px 8px; border-radius:10px; text-align:center;
    background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.09);
    font-size:20px; cursor:pointer; transition:all .2s; text-decoration:none;
    display:flex; flex-direction:column; align-items:center; gap:4px;
  }
  .ct-social-btn span { font-size:10px; color:rgba(255,255,255,.35); font-weight:600; letter-spacing:.4px; }
  .ct-social-btn:hover { background:rgba(153,3,125,.12); border-color:rgba(153,3,125,.28); transform:translateY(-2px); }

  /* Map stub */
  .ct-map-stub {
    border-radius:16px; overflow:hidden;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);
    height:130px;
    display:flex; align-items:center; justify-content:center;
    flex-direction:column; gap:8px;
    color:rgba(255,255,255,.3); font-size:13px;
  }
  .ct-map-stub-icon { font-size:28px; }

  /* ── FOOTER ── */
  .ct-footer {
    position:relative; z-index:1;
    background:rgba(0,0,0,.28);
    border-top:1px solid rgba(255,255,255,.06);
    padding:40px 32px 24px;
  }
  .ct-footer-grid {
    max-width:960px; margin:0 auto 28px;
    display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:28px;
  }
  .ct-footer-col h3 { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; margin-bottom:8px; }
  .ct-footer-col h4 { font-family:'Syne',sans-serif; font-weight:600; font-size:13px; color:rgba(255,255,255,.55); margin-bottom:8px; }
  .ct-footer-col p, .ct-footer-col a { font-size:12px; color:rgba(255,255,255,.32); text-decoration:none; display:block; margin-bottom:5px; transition:color .2s; }
  .ct-footer-col a:hover { color:rgba(255,255,255,.7); }
  .ct-footer-bottom { max-width:960px; margin:0 auto; padding-top:20px; border-top:1px solid rgba(255,255,255,.06); font-size:12px; color:rgba(255,255,255,.22); text-align:center; }

  @media(max-width:768px){
    .ct-navbar { padding:0 16px; }
    .ct-nav-links { display:none; }
    .ct-hero { padding:40px 16px 100px; }
    .ct-cards-strip { padding:0 16px; }
    .ct-cards-row { grid-template-columns:1fr; }
    .ct-info-card { border-right:none; border-bottom:1px solid rgba(255,255,255,.07); }
    .ct-info-card:last-child { border-bottom:none; }
    .ct-content { grid-template-columns:1fr; padding:32px 16px 56px; }
    .ct-field-row { grid-template-columns:1fr; }
    .ct-footer { padding:28px 16px 20px; }
  }
`;

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm]         = useState({ name:"", email:"", subject:"", message:"" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name:"", email:"", subject:"", message:"" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ct-root">
        <div className="ct-orb ct-orb-1" />
        <div className="ct-orb ct-orb-2" />

        {/* ── NAVBAR ── */}
        <nav className="ct-navbar">
          <Link to="/home" className="ct-brand">
            <div className="ct-brand-logo"><img src={logo} alt="EDU-TECH Logo" className="logo-image" /></div>
            <div>
              <div className="ct-brand-name">EDU-TECH</div>
              <div className="ct-brand-sub">E-Learning Platform</div>
            </div>
          </Link>
          <div className="ct-nav-right">
            <div className="ct-nav-links">
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <button className="ct-back" onClick={() => navigate(-1)}>
              <span className="ct-back-arrow">←</span>
              Back
            </button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div className="ct-hero">
          <div className="ct-hero-inner">
            <div className="ct-hero-icon">📬</div>
            <h1 className="ct-hero-title">Get in Touch</h1>
            <p className="ct-hero-sub">Have a question or need help? We'd love to hear from you.<br />Our team will respond within 24 hours.</p>
          </div>
        </div>

        {/* ── CONTACT CARDS ── */}
        <div className="ct-cards-strip">
          <div className="ct-cards-row">
            <div className="ct-info-card">
              <div className="ct-info-icon">✉️</div>
              <div className="ct-info-label">Email Us</div>
              <div className="ct-info-val">support@edutech.com</div>
            </div>
            <div className="ct-info-card">
              <div className="ct-info-icon">📞</div>
              <div className="ct-info-label">Call Us</div>
              <div className="ct-info-val">+91 98765 43210</div>
            </div>
            <div className="ct-info-card">
              <div className="ct-info-icon">🕐</div>
              <div className="ct-info-label">Working Hours</div>
              <div className="ct-info-val">Mon–Sat, 9AM–6PM</div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="ct-content">

          {/* LEFT — Form */}
          <div className="ct-form-card">
            <div className="ct-card-title">💬 Send a Message</div>
            <div className="ct-card-sub">Fill the form and we'll get back to you shortly.</div>

            {submitted && (
              <div className="ct-success">✓ Message sent! We'll respond within 24 hours.</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="ct-field-row">
                <div className="ct-field">
                  <label className="ct-field-label">Full Name</label>
                  <input className="ct-input" name="name" placeholder="Your name"
                    value={form.name} onChange={handleChange} required />
                </div>
                <div className="ct-field">
                  <label className="ct-field-label">Email</label>
                  <input className="ct-input" type="email" name="email" placeholder="you@example.com"
                    value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="ct-field">
                <label className="ct-field-label">Subject</label>
                <select className="ct-select" name="subject" value={form.subject} onChange={handleChange} required>
                  <option value="">Select a topic</option>
                  <option value="general">General Enquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="payment">Payment Issue</option>
                  <option value="course">Course Question</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              <div className="ct-field">
                <label className="ct-field-label">Message</label>
                <textarea className="ct-textarea" name="message" placeholder="Write your message here..."
                  value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="ct-submit">Send Message →</button>
            </form>
          </div>

          {/* RIGHT — Details */}
          <div className="ct-right">

            <div className="ct-detail-card">
              <div className="ct-detail-header">
                <div className="ct-detail-icon">🏢</div>
                <div className="ct-detail-title">Our Office</div>
              </div>
              <div className="ct-detail-body">EDU-TECH Pvt. Ltd.<br />123 Learning Street, Tech Park<br />Bengaluru, Karnataka 560001</div>
            </div>

            <div className="ct-detail-card">
              <div className="ct-detail-header">
                <div className="ct-detail-icon">⚡</div>
                <div className="ct-detail-title">Quick Response</div>
              </div>
              <div className="ct-detail-body">For urgent issues, reach us directly at <strong style={{color:"#ff88dd"}}>support@edutech.com</strong> or call during working hours for immediate assistance.</div>
            </div>

            <div className="ct-map-stub">
              <div className="ct-map-stub-icon">📍</div>
              <span>Bengaluru, Karnataka, India</span>
            </div>

            <div className="ct-social-card">
              <div className="ct-social-title">Follow Us</div>
              <div className="ct-socials">
                <a href="/twitter" className="ct-social-btn">🐦<span>Twitter</span></a>
                <a href="/liked" className="ct-social-btn">💼<span>LinkedIn</span></a>
                <a href="/isa" className="ct-social-btn">📸<span>Instagram</span></a>
                <a href="/you" className="ct-social-btn">▶️<span>YouTube</span></a>
              </div>
            </div>

          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="ct-footer">
          <div className="ct-footer-grid">
            <div className="ct-footer-col">
              <h3>EDU-TECH</h3>
              <p>An E-Learning Platform to upgrade your skills.</p>
            </div>
            <div className="ct-footer-col">
              <h4>Quick Links</h4>
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <div className="ct-footer-col">
              <h4>Support</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/help">Help Center</Link>
            </div>
            <div className="ct-footer-col">
              <h4>Contact</h4>
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@edutech.com</p>
            </div>
          </div>
          <div className="ct-footer-bottom">© 2026 EDU-TECH. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}