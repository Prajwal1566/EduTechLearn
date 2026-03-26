import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cd-root {
    min-height: 100vh;
    background: #1f001d;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
    position: relative;
    overflow-x: hidden;
  }
  .cd-root.light { background: #f5f0f5; color: #1a001a; }

  /* Orbs */
  .orb {
    position: fixed; border-radius: 50%;
    filter: blur(90px); pointer-events: none; z-index: 0;
    animation: floatOrb 10s ease-in-out infinite;
  }
  .orb-1 { width:420px; height:420px; background:radial-gradient(circle,#9900ff22,transparent); top:-80px; left:-80px; }
  .orb-2 { width:360px; height:360px; background:radial-gradient(circle,#ff00aa18,transparent); bottom:-60px; right:-60px; animation-delay:-4s; }
  .light .orb-1 { background:radial-gradient(circle,#cc05a012,transparent); }
  .light .orb-2 { background:radial-gradient(circle,#99037d0a,transparent); }
  @keyframes floatOrb {
    0%,100% { transform:translate(0,0) scale(1); }
    50% { transform:translate(20px,-30px) scale(1.05); }
  }

  /* ── NAVBAR ── */
  .cd-navbar {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 62px;
    background: rgba(31,0,29,0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .light .cd-navbar { background:rgba(245,240,245,0.92); border-bottom-color:rgba(76,0,62,0.1); }

  .cd-brand {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; flex-shrink: 0;
  }
  .cd-brand-logo {
    width:36px; height:36px; border-radius:10px;
    overflow:hidden; background:linear-gradient(135deg,#99037d,#4C003E); flex-shrink:0;
  }
  .cd-brand-logo img { width:100%; height:100%; object-fit:cover; }
  .cd-brand-name { font-family:'Syne',sans-serif; font-weight:800; font-size:17px; color:#fff; letter-spacing:-.3px; }
  .light .cd-brand-name { color:#2d002a; }
  .cd-brand-sub { font-size:10px; color:rgba(255,255,255,.38); letter-spacing:.5px; }
  .light .cd-brand-sub { color:rgba(76,0,62,.42); }

  .cd-nav-right { display:flex; align-items:center; gap:6px; margin-left:auto; }
  .cd-nav-links { display:flex; align-items:center; gap:2px; margin-right:8px; }
  .cd-nav-links a {
    padding:7px 13px; border-radius:8px; font-size:13px; font-weight:500;
    color:rgba(255,255,255,.5); text-decoration:none; transition:all .2s;
  }
  .cd-nav-links a:hover, .cd-nav-links a.active { color:#fff; background:rgba(255,255,255,.08); }
  .light .cd-nav-links a { color:rgba(76,0,62,.58); }
  .light .cd-nav-links a:hover { color:#4C003E; background:rgba(76,0,62,.08); }

  .icon-btn {
    width:36px; height:36px; border-radius:9px;
    border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05);
    color:rgba(255,255,255,.6); cursor:pointer; font-size:15px;
    display:flex; align-items:center; justify-content:center; transition:all .2s; flex-shrink:0;
  }
  .icon-btn:hover { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); color:#fff; }
  .light .icon-btn { border-color:rgba(76,0,62,.13); background:rgba(76,0,62,.05); color:#4C003E; }

  .logout-btn {
    display:flex; align-items:center; gap:6px; padding:8px 16px; border-radius:9px;
    border:1px solid rgba(255,100,100,.22); background:rgba(255,60,60,.07);
    color:rgba(255,120,120,.8); font-size:13px; font-weight:500; cursor:pointer; transition:all .2s;
  }
  .logout-btn:hover { background:rgba(255,60,60,.14); color:#ff8888; }
  .light .logout-btn { border-color:rgba(200,0,0,.13); background:rgba(200,0,0,.04); color:rgba(170,0,0,.65); }

  /* Hamburger */
  .hamburger {
    display:none; flex-direction:column; justify-content:center; align-items:center; gap:5px;
    width:36px; height:36px; border-radius:9px;
    border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05);
    cursor:pointer; padding:0; transition:all .2s;
  }
  .hamburger:hover { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); }
  .light .hamburger { border-color:rgba(76,0,62,.13); background:rgba(76,0,62,.05); }
  .hamburger span { display:block; width:18px; height:2px; background:rgba(255,255,255,.7); border-radius:99px; transition:all .3s; }
  .light .hamburger span { background:#4C003E; }
  .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity:0; }
  .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

  .mobile-menu {
    display:none; position:fixed; top:62px; left:0; right:0; z-index:199;
    background:rgba(18,0,16,0.97); backdrop-filter:blur(24px);
    border-bottom:1px solid rgba(255,255,255,.07);
    padding:14px 18px 18px; flex-direction:column; gap:4px;
    animation:slideDown .22s ease;
  }
  .light .mobile-menu { background:rgba(245,240,245,0.98); }
  @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
  .mobile-menu.open { display:flex; }
  .mobile-menu a { padding:11px 14px; border-radius:10px; font-size:14px; font-weight:500; color:rgba(255,255,255,.62); text-decoration:none; transition:all .2s; }
  .mobile-menu a:hover { color:#fff; background:rgba(255,255,255,.07); }
  .light .mobile-menu a { color:rgba(76,0,62,.62); }
  .mob-divider { height:1px; background:rgba(255,255,255,.07); margin:8px 0; }
  .light .mob-divider { background:rgba(76,0,62,.08); }
  .mob-actions { display:flex; gap:8px; margin-top:4px; }
  .mob-actions button { flex:1; justify-content:center; }

  /* ── VIDEO HERO ── */
  .cd-video-hero {
    position: relative; z-index: 1;
    background: #0d000c;
    border-bottom: 1px solid rgba(255,255,255,.06);
  }
  .cd-video-wrap {
    max-width: 1000px; margin: 0 auto;
    padding: 28px 20px 0;
  }
  .cd-video-box {
    position: relative; border-radius: 18px 18px 0 0;
    overflow: hidden;
    background: #0d000c;
    aspect-ratio: 16/7;
  }
  .cd-video-box iframe {
    width: 100%; height: 100%;
    border: none; display: block;
  }
  .cd-video-box img {
    width: 100%; height: 100%; object-fit: cover; display: block;
  }
  .cd-video-lock {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,.65), rgba(76,0,62,.4));
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
    backdrop-filter: blur(2px);
  }
  .cd-lock-icon {
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(255,255,255,.1); border: 1.5px solid rgba(255,255,255,.2);
    display: flex; align-items: center; justify-content: center; font-size: 26px;
  }
  .cd-lock-text { font-size: 15px; font-weight: 600; color: rgba(255,255,255,.85); }
  .cd-lock-sub   { font-size: 12px; color: rgba(255,255,255,.4); }

  /* ── MAIN LAYOUT ── */
  .cd-main {
    position: relative; z-index: 1;
    max-width: 1000px; margin: 0 auto;
    padding: 0 20px 60px;
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 28px;
    align-items: start;
  }

  /* ── LEFT COLUMN ── */
  .cd-left { padding-top: 28px; }

  /* Breadcrumb */
  .cd-breadcrumb {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: rgba(255,255,255,.35);
    margin-bottom: 16px;
  }
  .light .cd-breadcrumb { color: rgba(76,0,62,.45); }
  .cd-breadcrumb a { color: rgba(255,255,255,.35); text-decoration: none; transition: color .2s; }
  .cd-breadcrumb a:hover { color: rgba(255,255,255,.7); }
  .light .cd-breadcrumb a { color: rgba(76,0,62,.45); }
  .light .cd-breadcrumb a:hover { color: #4C003E; }

  .cd-title {
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 26px;
    color: #fff; line-height: 1.25; margin-bottom: 14px;
  }
  .light .cd-title { color: #1a001a; }

  /* Meta row */
  .cd-meta {
    display: flex; align-items: center; gap: 14px;
    flex-wrap: wrap; margin-bottom: 20px;
  }
  .cd-meta-item {
    display: flex; align-items: center; gap: 5px;
    font-size: 13px; color: rgba(255,255,255,.5);
  }
  .light .cd-meta-item { color: rgba(76,0,62,.55); }
  .cd-rating { color: #ffcc44; font-weight: 700; }
  .cd-badge {
    padding: 3px 10px; border-radius: 99px;
    background: rgba(255,140,0,.15); border: 1px solid rgba(255,140,0,.3);
    color: #ffaa44; font-size: 11px; font-weight: 700; letter-spacing: .3px;
  }

  /* Progress bar (if purchased) */
  .cd-progress-wrap {
    margin-bottom: 20px;
    padding: 14px 18px;
    border-radius: 14px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
  }
  .light .cd-progress-wrap { background: rgba(76,0,62,.04); border-color: rgba(76,0,62,.1); }
  .cd-progress-top {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 8px; font-size: 12px;
  }
  .cd-progress-label { color: rgba(255,255,255,.5); font-weight: 500; }
  .light .cd-progress-label { color: rgba(76,0,62,.55); }
  .cd-progress-pct { color: #cc05a0; font-weight: 700; }
  .cd-progress-bar { height: 6px; border-radius: 99px; background: rgba(255,255,255,.1); overflow: hidden; }
  .light .cd-progress-bar { background: rgba(76,0,62,.1); }
  .cd-progress-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg,#99037d,#ff66cc); transition: width .8s ease; }

  /* Tabs */
  .cd-tabs {
    display: flex; gap: 0;
    border-bottom: 1px solid rgba(255,255,255,.08);
    margin-bottom: 24px;
  }
  .light .cd-tabs { border-bottom-color: rgba(76,0,62,.1); }
  .cd-tab {
    padding: 10px 18px; font-size: 13px; font-weight: 600;
    color: rgba(255,255,255,.38); cursor: pointer; border: none; background: none;
    border-bottom: 2px solid transparent; margin-bottom: -1px;
    transition: all .2s; font-family: 'DM Sans', sans-serif;
  }
  .cd-tab:hover { color: rgba(255,255,255,.7); }
  .cd-tab.active { color: #fff; border-bottom-color: #cc05a0; }
  .light .cd-tab { color: rgba(76,0,62,.45); }
  .light .cd-tab:hover { color: #4C003E; }
  .light .cd-tab.active { color: #4C003E; border-bottom-color: #99037d; }

  /* Tab content */
  .cd-tab-content { animation: fadeIn .25s ease; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

  .cd-section-title {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px;
    color: #fff; margin-bottom: 12px;
  }
  .light .cd-section-title { color: #1a001a; }

  .cd-description {
    font-size: 14px; color: rgba(255,255,255,.6); line-height: 1.75;
  }
  .light .cd-description { color: rgba(76,0,62,.65); }

  /* Info grid */
  .cd-info-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
    margin-top: 24px;
  }
  .cd-info-item {
    padding: 14px 16px; border-radius: 14px;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.08);
    transition: all .2s;
  }
  .cd-info-item:hover { background: rgba(153,3,125,.07); border-color: rgba(153,3,125,.18); }
  .light .cd-info-item { background: #fff; border-color: rgba(76,0,62,.1); box-shadow: 0 2px 10px rgba(76,0,62,.05); }
  .light .cd-info-item:hover { background: #fdf5fd; border-color: rgba(153,3,125,.15); }
  .cd-info-label { font-size: 11px; color: rgba(255,255,255,.35); letter-spacing: .6px; text-transform: uppercase; margin-bottom: 5px; }
  .light .cd-info-label { color: rgba(76,0,62,.45); }
  .cd-info-val { font-size: 15px; font-weight: 700; color: #fff; }
  .light .cd-info-val { color: #1a001a; }

  /* ── RIGHT COLUMN ── */
  .cd-right { padding-top: 28px; }

  .cd-price-card {
    border-radius: 20px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.1);
    backdrop-filter: blur(24px);
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0,0,0,.35);
    position: sticky; top: 80px;
  }
  .light .cd-price-card { background: #fff; border-color: rgba(76,0,62,.12); box-shadow: 0 8px 32px rgba(76,0,62,.1); }

  .cd-price-thumb {
    width: 100%; height: 160px; object-fit: cover; display: block;
    background: linear-gradient(135deg,#2a001f,#4C003E);
  }

  .cd-price-body { padding: 20px; }

  .cd-price-row {
    display: flex; align-items: baseline; gap: 8px;
    margin-bottom: 16px;
  }
  .cd-price-amount {
    font-family: 'DM Sans', sans-serif;
    font-weight: 700; font-size: 28px; color: #fff;
  }
  .light .cd-price-amount { color: #1a001a; }
  .cd-price-free {
    font-family: 'DM Sans', sans-serif;
    font-weight: 700; font-size: 28px; color: #44ee88;
  }

  /* Voucher input */
  .cd-voucher-wrap { margin-bottom: 16px; }
  .cd-voucher-label {
    font-size: 11px; font-weight: 600; color: rgba(255,255,255,.4);
    letter-spacing: .8px; text-transform: uppercase; margin-bottom: 6px; display: block;
  }
  .light .cd-voucher-label { color: rgba(76,0,62,.5); }
  .cd-voucher-row { display: flex; gap: 8px; }
  .cd-voucher-input {
    flex: 1; padding: 10px 14px;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 10px; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 13px;
    outline: none; transition: all .25s;
  }
  .cd-voucher-input::placeholder { color: rgba(255,255,255,.22); }
  .cd-voucher-input:focus { border-color: rgba(153,3,125,.6); background: rgba(153,3,125,.08); box-shadow: 0 0 0 3px rgba(153,3,125,.12); }
  .light .cd-voucher-input { background: #f8f4f8; border-color: rgba(76,0,62,.15); color: #1a001a; }
  .light .cd-voucher-input::placeholder { color: rgba(76,0,62,.3); }
  .light .cd-voucher-input:focus { background: #fff; border-color: rgba(153,3,125,.4); }
  .cd-voucher-btn {
    padding: 10px 14px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.07);
    color: rgba(255,255,255,.6); font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all .2s; white-space: nowrap;
    font-family: 'DM Sans', sans-serif;
  }
  .cd-voucher-btn:hover { background: rgba(255,255,255,.13); color: #fff; }
  .light .cd-voucher-btn { border-color: rgba(76,0,62,.13); background: rgba(76,0,62,.05); color: rgba(76,0,62,.6); }

  /* CTA buttons */
  .cd-cta-primary {
    width: 100%; padding: 14px;
    background: linear-gradient(135deg, #99037d, #4C003E 60%, #7a0260);
    border: none; border-radius: 12px;
    color: #fff; font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700; letter-spacing: .4px;
    cursor: pointer; position: relative; overflow: hidden;
    transition: all .3s ease;
    box-shadow: 0 8px 24px rgba(153,3,125,.4);
    margin-bottom: 10px;
  }
  .cd-cta-primary::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.15),transparent); opacity:0; transition:opacity .3s; }
  .cd-cta-primary:hover::before { opacity:1; }
  .cd-cta-primary:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(153,3,125,.55); }
  .cd-cta-primary:active { transform:translateY(0); }
  .cd-cta-primary::after { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent); animation:shimmer 3s ease-in-out infinite; }
  @keyframes shimmer { 0%{left:-100%} 50%,100%{left:150%} }

  .cd-cta-secondary {
    width: 100%; padding: 12px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.12);
    border-radius: 12px; color: rgba(255,255,255,.65);
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all .2s; margin-bottom: 10px;
  }
  .cd-cta-secondary:hover { background: rgba(255,255,255,.1); color: #fff; }
  .light .cd-cta-secondary { background: rgba(76,0,62,.05); border-color: rgba(76,0,62,.15); color: rgba(76,0,62,.65); }
  .light .cd-cta-secondary:hover { background: rgba(76,0,62,.1); color: #4C003E; }

  .cd-cta-green {
    width: 100%; padding: 14px;
    background: rgba(68,238,136,.12);
    border: 1px solid rgba(68,238,136,.3);
    border-radius: 12px; color: #44ee88;
    font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; transition: all .2s; margin-bottom: 10px;
  }
  .cd-cta-green:hover { background: rgba(68,238,136,.2); transform: translateY(-1px); }

  /* Includes list */
  .cd-includes {
    border-top: 1px solid rgba(255,255,255,.07);
    padding-top: 16px; margin-top: 6px;
  }
  .light .cd-includes { border-top-color: rgba(76,0,62,.08); }
  .cd-includes-title {
    font-size: 11px; font-weight: 700; color: rgba(255,255,255,.35);
    letter-spacing: .8px; text-transform: uppercase; margin-bottom: 10px;
  }
  .light .cd-includes-title { color: rgba(76,0,62,.45); }
  .cd-include-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: rgba(255,255,255,.5); margin-bottom: 7px;
  }
  .light .cd-include-item { color: rgba(76,0,62,.55); }
  .cd-include-icon { font-size: 13px; flex-shrink: 0; }

  /* ── FOOTER ── */
  .cd-footer {
    position: relative; z-index: 1;
    background: rgba(0,0,0,.28);
    border-top: 1px solid rgba(255,255,255,.06);
    padding: 40px 32px 24px;
  }
  .light .cd-footer { background: rgba(76,0,62,.04); border-top-color: rgba(76,0,62,.1); }
  .cd-footer-grid {
    max-width: 960px; margin: 0 auto 28px;
    display: grid; grid-template-columns: repeat(auto-fit,minmax(160px,1fr)); gap: 28px;
  }
  .cd-footer-col h3 { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; margin-bottom:8px; }
  .cd-footer-col h4 { font-family:'Syne',sans-serif; font-weight:600; font-size:13px; color:rgba(255,255,255,.55); margin-bottom:8px; }
  .light .cd-footer-col h3 { color:#1a001a; }
  .light .cd-footer-col h4 { color:rgba(76,0,62,.58); }
  .cd-footer-col p, .cd-footer-col a { font-size:12px; color:rgba(255,255,255,.32); text-decoration:none; display:block; margin-bottom:5px; transition:color .2s; }
  .cd-footer-col a:hover { color:rgba(255,255,255,.7); }
  .light .cd-footer-col p, .light .cd-footer-col a { color:rgba(76,0,62,.42); }
  .cd-footer-bottom { max-width:960px; margin:0 auto; padding-top:20px; border-top:1px solid rgba(255,255,255,.06); font-size:12px; color:rgba(255,255,255,.22); text-align:center; }
  .light .cd-footer-bottom { border-top-color:rgba(76,0,62,.08); color:rgba(76,0,62,.35); }

  /* Shimmer */
  .shimmer { border-radius:10px; background:linear-gradient(90deg,rgba(255,255,255,.05) 0%,rgba(255,255,255,.1) 50%,rgba(255,255,255,.05) 100%); background-size:200% 100%; animation:shimmerAnim 1.5s infinite; }
  .light .shimmer { background:linear-gradient(90deg,#f0e8f0 0%,#e4d4e4 50%,#f0e8f0 100%); background-size:200% 100%; }
  @keyframes shimmerAnim { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

  /* Responsive */
  @media(max-width:768px){
    .cd-navbar { padding:0 16px; }
    .cd-nav-links,.logout-btn,.icon-btn.theme-icon { display:none; }
    .hamburger { display:flex; }
    .cd-main { grid-template-columns:1fr; }
    .cd-right { padding-top:0; }
    .cd-price-card { position:static; }
    .cd-info-grid { grid-template-columns:1fr 1fr; }
    .cd-footer { padding:28px 16px 20px; }
  }
  @media(min-width:769px){
    .hamburger { display:none !important; }
    .mobile-menu { display:none !important; }
  }
`;

const BASE_URL = "http://127.0.0.1:5000";

export default function CourseDetails() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const user      = JSON.parse(localStorage.getItem("user"));

  const [course,       setCourse]       = useState(null);
  const [isPurchased,  setIsPurchased]  = useState(false);
  const [isCompleted,  setIsCompleted]  = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [activeTab,    setActiveTab]    = useState("overview");
  const [darkMode,     setDarkMode]     = useState(true);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [voucher,      setVoucher]      = useState("");

  const handleLogout = () => { localStorage.removeItem("user"); navigate("/"); };

  // Fetch course details
  useEffect(() => {
    fetch(`${BASE_URL}/api/courses`)
      .then(r => r.json())
      .then(data => {
        const found = data.find(c => String(c.id) === String(id));
        setCourse(found);
      });
  }, [id]);

  // Check purchase
  useEffect(() => {
    if (!user) return;
    fetch(`${BASE_URL}/api/my-courses/${user.id}`)
      .then(r => r.json())
      .then(data => {
        const found = data.find(c => String(c.id) === String(id));
        if (found) { setIsPurchased(true); setProgress(found.progress || 0); setIsCompleted(found.completed === 1); }
        else { setIsPurchased(false); setIsCompleted(false); }
      });
  }, [id]);

  const handleMarkComplete = async () => {
    await fetch(`${BASE_URL}/api/update-progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, course_id: course.id, progress: 100 }),
    });
    window.location.reload();
  };

  if (!course) return (
    <>
      <style>{styles}</style>
      <div className={`cd-root ${darkMode ? "" : "light"}`} style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div className="orb orb-1" /><div className="orb orb-2" />
        <div style={{ textAlign:"center", position:"relative", zIndex:1 }}>
          <div className="shimmer" style={{ width:200, height:24, marginBottom:12, margin:"0 auto 12px" }} />
          <div className="shimmer" style={{ width:140, height:16, margin:"0 auto" }} />
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{styles}</style>
      <div className={`cd-root ${darkMode ? "" : "light"}`}>
        <div className="orb orb-1" /><div className="orb orb-2" />

        {/* ── NAVBAR ── */}
        <nav className="cd-navbar">
          <Link to="/home" className="cd-brand">
            <div className="cd-brand-logo"><img src="/logow.png" alt="logo" /></div>
            <div>
              <div className="cd-brand-name">EDU-TECH</div>
              <div className="cd-brand-sub">E-Learning Platform</div>
            </div>
          </Link>
          <div className="cd-nav-right">
            <div className="cd-nav-links">
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <button className="icon-btn theme-icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button className="logout-btn" onClick={handleLogout}><span>⏻</span> Logout</button>
            <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/home" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to="/my-courses" onClick={() => setMenuOpen(false)}>📚 My Courses</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>❤️ Wishlist</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>👤 Profile</Link>
          <div className="mob-divider" />
          <div className="mob-actions">
            <button className="icon-btn" style={{flex:1,width:"auto",borderRadius:10}} onClick={() => { setDarkMode(!darkMode); setMenuOpen(false); }}>
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button className="logout-btn" onClick={handleLogout}>⏻ Logout</button>
          </div>
        </div>

        {/* ── VIDEO HERO ── */}
        <div className="cd-video-hero">
          <div className="cd-video-wrap">
            <div className="cd-video-box">
              {isPurchased ? (
                <iframe src={course.video} title="Course Video" allowFullScreen />
              ) : (
                <>
                  <img src={course.image} alt="preview" />
                  <div className="cd-video-lock">
                    <div className="cd-lock-icon">🔒</div>
                    <div className="cd-lock-text">Purchase to unlock full video</div>
                    <div className="cd-lock-sub">Preview not available</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="cd-main">

          {/* LEFT */}
          <div className="cd-left">
            {/* Breadcrumb */}
            <div className="cd-breadcrumb">
              <Link to="/home">Home</Link> › <Link to="/home">{course.category || "Courses"}</Link> › <span style={{color:"rgba(255,255,255,.6)"}}>{course.title}</span>
            </div>

            <div className="cd-title">{course.title}</div>

            {/* Meta */}
            <div className="cd-meta">
              <span className="cd-meta-item"><span className="cd-rating">★ {course.rating}</span></span>
              <span className="cd-meta-item">👤 {course.lecturer}</span>
              <span className="cd-meta-item">🌐 {course.language || "English"}</span>
              <span className="cd-meta-item">⏱ {course.duration}h</span>
              {course.badge && <span className="cd-badge">{course.badge}</span>}
            </div>

            {/* Progress if purchased */}
            {isPurchased && (
              <div className="cd-progress-wrap">
                <div className="cd-progress-top">
                  <span className="cd-progress-label">Your Progress</span>
                  <span className="cd-progress-pct">{progress}%</span>
                </div>
                <div className="cd-progress-bar">
                  <div className="cd-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="cd-tabs">
              {["overview","details"].map(t => (
                <button key={t} className={`cd-tab ${activeTab===t?"active":""}`} onClick={() => setActiveTab(t)}>
                  {t === "overview" ? "Overview" : "Course Details"}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {activeTab === "overview" && (
              <div className="cd-tab-content">
                <div className="cd-section-title">About this course</div>
                <div className="cd-description">{course.description}</div>
              </div>
            )}

            {/* Tab: Details */}
            {activeTab === "details" && (
              <div className="cd-tab-content">
                <div className="cd-section-title">Course Info</div>
                <div className="cd-info-grid">
                  <div className="cd-info-item">
                    <div className="cd-info-label">Students</div>
                    <div className="cd-info-val">{course.students || "—"}</div>
                  </div>
                  <div className="cd-info-item">
                    <div className="cd-info-label">Language</div>
                    <div className="cd-info-val">{course.language || "English"}</div>
                  </div>
                  <div className="cd-info-item">
                    <div className="cd-info-label">Last Updated</div>
                    <div className="cd-info-val">{course.last_update || "—"}</div>
                  </div>
                  <div className="cd-info-item">
                    <div className="cd-info-label">Duration</div>
                    <div className="cd-info-val">{course.duration} Hours</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Price card */}
          <div className="cd-right">
            <div className="cd-price-card">
              <img src={course.image} alt={course.title} className="cd-price-thumb"
                onError={e => e.target.style.display="none"} />

              <div className="cd-price-body">
                <div className="cd-price-row">
                  {course.price === 0
                    ? <span className="cd-price-free">Free</span>
                    : <span className="cd-price-amount">₹ {course.price}</span>}
                </div>

                {/* Voucher */}
                {!isPurchased && (
                  <div className="cd-voucher-wrap">
                    <label className="cd-voucher-label">Voucher Code</label>
                    <div className="cd-voucher-row">
                      <input
                        className="cd-voucher-input"
                        placeholder="Enter code"
                        value={voucher}
                        onChange={e => setVoucher(e.target.value)}
                      />
                      <button className="cd-voucher-btn">Apply</button>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                {!isPurchased && (
                  <button className="cd-cta-primary" onClick={() =>
                    navigate("/payment", { state: { price: course.price, courseId: course.id } })
                  }>
                    {course.price === 0 ? "Enroll for Free" : "Checkout →"}
                  </button>
                )}

                {isPurchased && !isCompleted && (
                  <button className="cd-cta-primary" onClick={handleMarkComplete}>
                    ✓ Mark as Complete
                  </button>
                )}

                {isPurchased && isCompleted && (
                  <button className="cd-cta-green" onClick={() =>
                    window.open(`${BASE_URL}/api/certificate/${user.id}/${course.id}`, "_blank")
                  }>
                    ⬇ Download Certificate
                  </button>
                )}

                {isPurchased && (
                  <button 
                    className="cd-cta-secondary" onClick={() => navigate("/my-courses")}>
                    📚 My Courses
                  </button>
                )}

                {/* What's included */}
                <div className="cd-includes">
                  <div className="cd-includes-title">This course includes</div>
                  <div className="cd-include-item"><span className="cd-include-icon">🎬</span> Full video access</div>
                  <div className="cd-include-item"><span className="cd-include-icon">📱</span> Mobile & desktop</div>
                  <div className="cd-include-item"><span className="cd-include-icon">🏆</span> Certificate of completion</div>
                  <div className="cd-include-item"><span className="cd-include-icon">♾️</span> Lifetime access</div>
                </div>
              </div>
            </div>
          </div>

        </div>{/* /cd-main */}

        {/* ── FOOTER ── */}
        <footer className="cd-footer">
          <div className="cd-footer-grid">
            <div className="cd-footer-col">
              <h3>EDU-TECH</h3>
              <p>An E-Learning Platform to upgrade your skills.</p>
            </div>
            <div className="cd-footer-col">
              <h4>Quick Links</h4>
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <div className="cd-footer-col">
              <h4>Support</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/help">Help Center</Link>
            </div>
            <div className="cd-footer-col">
              <h4>Contact</h4>
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@edutech.com</p>
            </div>
          </div>
          <div className="cd-footer-bottom">© 2026 EDU-TECH. All rights reserved.</div>
        </footer>

      </div>
    </>
  );
}