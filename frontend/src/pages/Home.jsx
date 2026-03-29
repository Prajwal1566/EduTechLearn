import React, { useEffect, useState } from "react";
import logo from "../asset/logow.png";
import CourseCard from "../components/CourseCard";
import { Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .hm-root {
    min-height: 100vh;
    background: #1f001d;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }
  .hm-root.light { background: #f5f0f5; }

  /* Orbs */
  .orb {
    position: fixed; border-radius: 50%;
    filter: blur(90px); pointer-events: none; z-index: 0;
    animation: floatOrb 10s ease-in-out infinite;
  }
  .orb-1 { width:420px; height:420px; background:radial-gradient(circle,#9900ff22,transparent); top:-80px; left:-80px; }
  .orb-2 { width:360px; height:360px; background:radial-gradient(circle,#ff00aa18,transparent); bottom:-60px; right:-60px; animation-delay:-4s; }
  .light .orb-1 { background:radial-gradient(circle,#cc05a010,transparent); }
  .light .orb-2 { background:radial-gradient(circle,#99037d0a,transparent); }
  @keyframes floatOrb {
    0%,100% { transform:translate(0,0) scale(1); }
    50% { transform:translate(20px,-30px) scale(1.05); }
  }

  /* ── NAVBAR ── */
  .hm-navbar {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 62px;
    background: rgba(31,0,29,0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .light .hm-navbar { background:rgba(245,240,245,0.92); border-bottom-color:rgba(76,0,62,0.1); }

  .hm-brand {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; flex-shrink: 0;
  }
  .hm-brand-logo {
    width:36px; height:36px; border-radius:10px;
    overflow:hidden; background:linear-gradient(135deg,#99037d,#4C003E); flex-shrink:0;
  }
  .hm-brand-logo img { width:100%; height:100%; object-fit:cover; }
  .hm-brand-name { font-family:'Syne',sans-serif; font-weight:800; font-size:17px; color:#fff; letter-spacing:-.3px; }
  .light .hm-brand-name { color:#2d002a; }
  .hm-brand-sub { font-size:10px; color:rgba(255,255,255,.38); letter-spacing:.5px; }
  .light .hm-brand-sub { color:rgba(76,0,62,.42); }

  /* Right side — links + actions */
  .hm-nav-right {
    display: flex; align-items: center; gap: 6px;
    margin-left: auto;
  }
  .hm-nav-links {
    display: flex; align-items: center; gap: 2px;
    margin-right: 8px;
  }
  .hm-nav-links a {
    padding: 7px 13px; border-radius: 8px;
    font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,.5); text-decoration: none;
    transition: all .2s; white-space: nowrap;
  }
  .hm-nav-links a:hover, .hm-nav-links a.active { color:#fff; background:rgba(255,255,255,.08); }
  .light .hm-nav-links a { color:rgba(76,0,62,.58); }
  .light .hm-nav-links a:hover, .light .hm-nav-links a.active { color:#4C003E; background:rgba(76,0,62,.08); }

  .logout-btn {
    display:flex; align-items:center; gap:6px;
    padding:8px 16px; border-radius:9px;
    border:1px solid rgba(255,100,100,.22);
    background:rgba(255,60,60,.07);
    color:rgba(255,120,120,.8);
    font-size:13px; font-weight:500; cursor:pointer;
    transition:all .2s; white-space:nowrap;
  }
  .logout-btn:hover { background:rgba(255,60,60,.14); border-color:rgba(255,100,100,.38); color:#ff8888; }
  .light .logout-btn { border-color:rgba(200,0,0,.13); background:rgba(200,0,0,.04); color:rgba(170,0,0,.65); }

  /* Hamburger */
  .hamburger {
    display: none;
    flex-direction: column; justify-content: center; align-items: center; gap: 5px;
    width: 36px; height: 36px; border-radius: 9px;
    border: 1px solid rgba(255,255,255,.1);
    background: rgba(255,255,255,.05);
    cursor: pointer; padding: 0; transition: all .2s;
  }
  .hamburger:hover { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); }
  .light .hamburger { border-color:rgba(76,0,62,.13); background:rgba(76,0,62,.05); }
  .hamburger span { display:block; width:18px; height:2px; background:rgba(255,255,255,.7); border-radius:99px; transition:all .3s ease; }
  .light .hamburger span { background:#4C003E; }
  .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
  .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

  /* Mobile drawer */
  .mobile-menu {
    display: none; position: fixed;
    top: 62px; left:0; right:0; z-index:199;
    background: rgba(18,0,16,0.97);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(255,255,255,.07);
    padding: 14px 18px 18px;
    flex-direction: column; gap: 4px;
    animation: slideDown .22s ease;
  }
  .light .mobile-menu { background:rgba(245,240,245,0.98); border-bottom-color:rgba(76,0,62,.1); }
  @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
  .mobile-menu.open { display:flex; }
  .mobile-menu a {
    padding:11px 14px; border-radius:10px;
    font-size:14px; font-weight:500;
    color:rgba(255,255,255,.62); text-decoration:none;
    transition:all .2s; border:1px solid transparent;
  }
  .mobile-menu a:hover, .mobile-menu a.active { color:#fff; background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.08); }
  .light .mobile-menu a { color:rgba(76,0,62,.62); }
  .light .mobile-menu a:hover, .light .mobile-menu a.active { color:#4C003E; background:rgba(76,0,62,.08); border-color:rgba(76,0,62,.1); }
  .mobile-divider { height:1px; background:rgba(255,255,255,.07); margin:8px 0; }
  .light .mobile-divider { background:rgba(76,0,62,.08); }
  .mobile-actions { display:flex; gap:8px; margin-top:4px; }
  .mobile-actions button { flex:1; justify-content:center; }

  /* ── HERO ── */
  .hm-hero {
    position: relative; z-index: 1;
    background: linear-gradient(135deg,#2a001f 0%,#4C003E 55%,#320026 100%);
    padding: 56px 32px 110px;
    overflow: hidden; text-align: center;
  }
  .hm-hero::before {
    content:''; position:absolute; inset:0;
    background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px; opacity:.03; pointer-events:none;
  }
  /* Decorative circles inside hero */
  .hm-hero::after {
    content:''; position:absolute;
    width:500px; height:500px; border-radius:50%;
    background:radial-gradient(circle,rgba(200,0,150,.1),transparent);
    top:-120px; right:-100px; filter:blur(60px); pointer-events:none;
  }
  .hm-hero-glow {
    position:absolute; width:400px; height:400px; border-radius:50%;
    background:radial-gradient(circle,rgba(120,0,200,.12),transparent);
    bottom:-120px; left:-60px; filter:blur(80px); pointer-events:none; z-index:0;
  }

  .hm-hero-inner { position:relative; z-index:1; max-width:680px; margin:0 auto; }

  .hm-hero-greeting {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px; border-radius: 99px;
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.14);
    font-size: 13px; color: rgba(255,255,255,.7);
    margin-bottom: 18px; font-weight: 500;
    animation: fadeUp .5s ease both;
  }

  .hm-hero-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: clamp(28px,5vw,48px);
    color: #fff; line-height: 1.15;
    margin-bottom: 12px;
    animation: fadeUp .55s .08s ease both;
  }
  .hm-hero-title span {
    background: linear-gradient(90deg,#ff66cc,#cc05a0,#ff44bb);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hm-hero-sub {
    font-size: 15px; color: rgba(255,255,255,.5);
    margin-bottom: 32px; line-height: 1.6;
    animation: fadeUp .6s .14s ease both;
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* Search */
  .hm-search-wrap {
    position: relative; max-width: 480px;
    margin: 0 auto 24px;
    animation: fadeUp .65s .2s ease both;
  }
  .hm-search-icon {
    position:absolute; left:16px; top:50%; transform:translateY(-50%);
    font-size:16px; pointer-events:none; color:rgba(255,255,255,.3);
  }
  .hm-search {
    width:100%; padding:14px 16px 14px 46px;
    background:rgba(255,255,255,.09);
    border:1px solid rgba(255,255,255,.14);
    border-radius:14px; color:#fff;
    font-family:'DM Sans',sans-serif; font-size:14px;
    outline:none; transition:all .3s ease;
    backdrop-filter:blur(12px);
  }
  .hm-search::placeholder { color:rgba(255,255,255,.28); }
  .hm-search:focus {
    background:rgba(255,255,255,.13);
    border-color:rgba(153,3,125,.6);
    box-shadow:0 0 0 3px rgba(153,3,125,.18);
  }

  /* Category pills */
  .hm-cats {
    display:flex; gap:8px; justify-content:center; flex-wrap:wrap;
    animation: fadeUp .7s .25s ease both;
  }
  .hm-cat {
    padding:7px 18px; border-radius:99px;
    font-size:13px; font-weight:600; cursor:pointer;
    border:1px solid rgba(255,255,255,.13);
    background:rgba(255,255,255,.06);
    color:rgba(255,255,255,.55);
    transition:all .22s ease;
  }
  .hm-cat:hover { background:rgba(255,255,255,.12); color:#fff; }
  .hm-cat.active {
    background:linear-gradient(135deg,#99037d,#4C003E);
    border-color:transparent; color:#fff;
    box-shadow:0 4px 16px rgba(153,3,125,.4);
  }

  /* ── STATS BAND ── */
  .hm-stats-band {
    position:relative; z-index:2;
    max-width:860px; margin:-52px auto 0; padding:0 20px;
  }
  .hm-stats-card {
    border-radius:18px;
    background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.1);
    backdrop-filter:blur(24px);
    display:grid; grid-template-columns:repeat(4,1fr);
    overflow:hidden;
    box-shadow:0 20px 56px rgba(0,0,0,.38);
  }
  .light .hm-stats-card { background:#fff; border-color:rgba(76,0,62,.1); box-shadow:0 8px 32px rgba(76,0,62,.08); }
  .hm-stat {
    padding:18px 12px; text-align:center;
    border-right:1px solid rgba(255,255,255,.07);
    transition:background .2s;
  }
  .hm-stat:last-child { border-right:none; }
  .hm-stat:hover { background:rgba(153,3,125,.07); }
  .light .hm-stat { border-right-color:rgba(76,0,62,.07); }
  .hm-stat-icon { font-size:18px; margin-bottom:4px; }
  .hm-stat-num { font-family:'Syne',sans-serif; font-weight:800; font-size:22px; color:#fff; line-height:1; }
  .light .hm-stat-num { color:#2d002a; }
  .hm-stat-label { font-size:10px; color:rgba(255,255,255,.38); margin-top:3px; letter-spacing:.4px; text-transform:uppercase; }
  .light .hm-stat-label { color:rgba(76,0,62,.48); }

  /* ── CONTENT ── */
  .hm-content {
    position:relative; z-index:1;
    max-width:1000px; margin:0 auto;
    padding:40px 20px 60px;
  }

  .hm-section { margin-bottom:44px; }

  .hm-section-header {
    display:flex; align-items:center; justify-content:space-between;
    margin-bottom:20px;
  }
  .hm-section-title {
    font-family:'Syne',sans-serif; font-weight:700; font-size:18px;
    color:#fff; display:flex; align-items:center; gap:8px;
  }
  .light .hm-section-title { color:#1a001a; }
  .hm-section-count {
    font-size:12px; font-weight:500;
    color:rgba(255,255,255,.3); margin-left:4px;
  }
  .light .hm-section-count { color:rgba(76,0,62,.4); }
  .hm-see-all {
    font-size:12px; font-weight:600; color:#cc05a0;
    text-decoration:none; padding:5px 12px; border-radius:8px;
    transition:all .2s; border:1px solid transparent;
  }
  .hm-see-all:hover { background:rgba(153,3,125,.1); border-color:rgba(153,3,125,.2); }

  /* Course grid */
.hm-course-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
    gap:3.4rem;
    align-items: start;
  }

  .hm-course-grid > * {
    min-width: 0;
    width: 100%;
  }

  /* ── FOOTER ── */
  .hm-footer {
    position:relative; z-index:1;
    background:rgba(0,0,0,.28);
    border-top:1px solid rgba(255,255,255,.06);
    padding:44px 32px 24px;
  }
  .light .hm-footer { background:rgba(76,0,62,.04); border-top-color:rgba(76,0,62,.1); }
  .hm-footer-grid {
    max-width:960px; margin:0 auto;
    display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
    gap:28px; margin-bottom:28px;
  }
  .hm-footer-col h3 { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; margin-bottom:8px; }
  .hm-footer-col h4 { font-family:'Syne',sans-serif; font-weight:600; font-size:13px; color:rgba(255,255,255,.55); margin-bottom:8px; }
  .light .hm-footer-col h3 { color:#1a001a; }
  .light .hm-footer-col h4 { color:rgba(76,0,62,.58); }
  .hm-footer-col p, .hm-footer-col a { font-size:12px; color:rgba(255,255,255,.32); text-decoration:none; display:block; margin-bottom:5px; transition:color .2s; }
  .hm-footer-col a:hover { color:rgba(255,255,255,.7); }
  .light .hm-footer-col p, .light .hm-footer-col a { color:rgba(76,0,62,.42); }
  .light .hm-footer-col a:hover { color:#4C003E; }
  .hm-footer-bottom {
    max-width:960px; margin:0 auto;
    padding-top:20px; border-top:1px solid rgba(255,255,255,.06);
    font-size:12px; color:rgba(255,255,255,.22); text-align:center;
  }
  .light .hm-footer-bottom { border-top-color:rgba(76,0,62,.08); color:rgba(76,0,62,.35); }

  /* Empty section */
  .hm-empty {
    text-align:center; padding:32px 20px;
    border-radius:16px; border:1px dashed rgba(255,255,255,.08);
    background:rgba(255,255,255,.02);
  }
  .light .hm-empty { background:rgba(76,0,62,.02); border-color:rgba(76,0,62,.1); }
  .hm-empty-icon { font-size:32px; margin-bottom:8px; }
  .hm-empty-text { font-size:13px; color:rgba(255,255,255,.3); }
  .light .hm-empty-text { color:rgba(76,0,62,.42); }

  /* Responsive */
  @media(max-width:768px){
    .hm-navbar { padding:0 16px; }
    .hm-nav-links { display:none; }
    .logout-btn { display:none; }
    .hamburger { display:flex; }
    .hm-hero { padding:44px 16px 100px; }
    .hm-stats-band { padding:0 16px; }
    .hm-stats-card { grid-template-columns:repeat(2,1fr); }
    .hm-stat:nth-child(2) { border-right:none; }
    .hm-stat:nth-child(3) { border-right:1px solid rgba(255,255,255,.07); border-top:1px solid rgba(255,255,255,.07); }
    .hm-stat:nth-child(4) { border-top:1px solid rgba(255,255,255,.07); border-right:none; }
    .light .hm-stat:nth-child(3), .light .hm-stat:nth-child(4) { border-color:rgba(76,0,62,.07); }
    .hm-content { padding:32px 16px 48px; }
    .hm-footer { padding:28px 16px 20px; }
  }
  @media(min-width:769px){
    .hamburger { display:none !important; }
    .mobile-menu { display:none !important; }
  }
`;

const BASE_URL = "http://127.0.0.1:5000";

export default function Home({ onAddWishlist }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/api/courses`)
      .then(res => res.json())
      .then(data => setCourses(data));

    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) setUserName(user.name);
  }, []);

  const handleLogout = () => { localStorage.removeItem("user"); navigate("/"); };

  const filtered = courses.filter(c => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const trending = filtered.filter(c => c.category === "Trending");
  const coding   = filtered.filter(c => c.category === "Coding");
  const ai       = filtered.filter(c => c.category === "AI");
  const design   = filtered.filter(c => c.category === "Design");

  const sections = [
    { title: "🔥 Trending", icon: "🔥", category: "Trending", data: trending },
    { title: "💻 Coding",   icon: "💻", category: "Coding",   data: coding   },
    { title: "🤖 AI",       icon: "🤖", category: "AI",       data: ai       },
    { title: "🎨 Design",   icon: "🎨", category: "Design",   data: design   },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="hm-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* ── NAVBAR ── */}
        <nav className="hm-navbar">
          <Link to="/home" className="hm-brand">
            <div className="hm-brand-logo"><img src={logo} alt="EDU-TECH Logo" className="logo-image" /></div>
            <div>
              <div className="hm-brand-name">EDU-TECH</div>
              <div className="hm-brand-sub">E-Learning Platform</div>
            </div>
          </Link>

          <div className="hm-nav-right">
            <div className="hm-nav-links">
              <Link to="/home" className="active">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <span>⏻</span> Logout
            </button>
            <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/home" className="active" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to="/my-courses" onClick={() => setMenuOpen(false)}>📚 My Courses</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>❤️ Wishlist</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>👤 Profile</Link>
          <div className="mobile-divider" />
          <div className="mobile-actions">
            <button className="logout-btn" style={{ flex:1, justifyContent:"center" }} onClick={handleLogout}>⏻ Logout</button>
          </div>
        </div>

        {/* ── HERO ── */}
        <div className="hm-hero">
          <div className="hm-hero-glow" />
          <div className="hm-hero-inner">
            <div className="hm-hero-greeting">
              👋 Welcome back, <strong>{userName}</strong>
            </div>
            <h1 className="hm-hero-title">
              Keep Learning,<br /><span>Keep Growing</span>
            </h1>
            <p className="hm-hero-sub">
              Explore thousands of courses and upgrade your skills today.
            </p>

            <div className="hm-search-wrap">
              <span className="hm-search-icon">🔍</span>
              <input
                className="hm-search"
                placeholder="Search for courses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="hm-cats">
              {["All","Trending","Coding","AI","Design"].map(cat => (
                <button
                  key={cat}
                  className={`hm-cat ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── STATS BAND ── */}
        <div className="hm-stats-band">
          <div className="hm-stats-card">
            <div className="hm-stat">
              <div className="hm-stat-icon">📚</div>
              <div className="hm-stat-num">{courses.length}</div>
              <div className="hm-stat-label">Total Courses</div>
            </div>
            <div className="hm-stat">
              <div className="hm-stat-icon">🔥</div>
              <div className="hm-stat-num">{trending.length}</div>
              <div className="hm-stat-label">Trending Now</div>
            </div>
            <div className="hm-stat">
              <div className="hm-stat-icon">🤖</div>
              <div className="hm-stat-num">{ai.length}</div>
              <div className="hm-stat-label">AI Courses</div>
            </div>
            <div className="hm-stat">
              <div className="hm-stat-icon">🎨</div>
              <div className="hm-stat-num">{design.length}</div>
              <div className="hm-stat-label">Design Courses</div>
            </div>
          </div>
        </div>

        {/* ── COURSE SECTIONS ── */}
        <div className="hm-content">
          {sections.map(({ title, category, data }) => (
              data.length > 0 && (       
                <div className="hm-section" key={category}>
              <div className="hm-section-header">
              <div className="hm-section-title">
              {title}
              <span className="hm-section-count">
              ({data.length})
              </span>
              </div>

          {data.length > 3 && (
            <Link 
              to={`/category/${category}`} 
              className="hm-see-all"
            >
              See all →
            </Link>
          )}
        </div>

        <div className="hm-course-grid">
          {data.slice(0, 3).map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onAddWishlist={onAddWishlist}
            />
          ))}
        </div>
        </div>
          )
          ))}

          {filtered.length === 0 && (
            <div className="hm-empty">
              <div className="hm-empty-icon">🔍</div>
              <div className="hm-empty-text">No courses found for "{search}"</div>
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <footer className="hm-footer">
          <div className="hm-footer-grid">
            <div className="hm-footer-col">
              <h3>EDU-TECH</h3>
              <p>An E-Learning Platform to upgrade your skills.</p>
            </div>
            <div className="hm-footer-col">
              <h4>Quick Links</h4>
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <div className="hm-footer-col">
              <h4>Support</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms &amp; Conditions</Link>
              <Link to="/help">Help Center</Link>
            </div>
            <div className="hm-footer-col">
              <h4>Contact</h4>
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@edutech.com</p>
            </div>
          </div>
          <div className="hm-footer-bottom">© 2026 EDU-TECH. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}