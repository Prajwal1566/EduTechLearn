import React, { useEffect, useState } from "react";
import logo from "../asset/logow.png";
import { useParams, useNavigate, Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cat-root {
    min-height: 100vh;
    background: #1f001d;
    font-family: 'DM Sans', sans-serif;
    color: #fff;
    position: relative;
    overflow-x: hidden;
  }

  .cat-orb {
    position: fixed; border-radius: 50%;
    filter: blur(90px); pointer-events: none; z-index: 0;
    animation: floatOrb 10s ease-in-out infinite;
  }
  .cat-orb-1 { width:420px; height:420px; background:radial-gradient(circle,#9900ff22,transparent); top:-80px; left:-80px; }
  .cat-orb-2 { width:360px; height:360px; background:radial-gradient(circle,#ff00aa18,transparent); bottom:-60px; right:-60px; animation-delay:-4s; }
  @keyframes floatOrb {
    0%,100% { transform:translate(0,0) scale(1); }
    50% { transform:translate(20px,-30px) scale(1.05); }
  }

  /* ── NAVBAR ── */
  .cat-navbar {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 62px;
    background: rgba(31,0,29,0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .cat-brand {
    display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0;
  }
  .cat-brand-logo {
    width:36px; height:36px; border-radius:10px;
    overflow:hidden; background:linear-gradient(135deg,#99037d,#4C003E);
  }
  .cat-brand-logo img { width:100%; height:100%; object-fit:cover; }
  .cat-brand-name { font-family:'Syne',sans-serif; font-weight:800; font-size:17px; color:#fff; letter-spacing:-.3px; }
  .cat-brand-sub { font-size:10px; color:rgba(255,255,255,.38); letter-spacing:.5px; }

  .cat-nav-right { display:flex; align-items:center; gap:6px; margin-left:auto; }
  .cat-nav-links { display:flex; align-items:center; gap:2px; margin-right:8px; }
  .cat-nav-links a {
    padding:7px 13px; border-radius:8px; font-size:13px; font-weight:500;
    color:rgba(255,255,255,.5); text-decoration:none; transition:all .2s;
  }
  .cat-nav-links a:hover { color:#fff; background:rgba(255,255,255,.08); }

  .cat-icon-btn {
    width:36px; height:36px; border-radius:9px;
    border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05);
    color:rgba(255,255,255,.6); cursor:pointer; font-size:15px;
    display:flex; align-items:center; justify-content:center; transition:all .2s;
  }
  .cat-icon-btn:hover { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); color:#fff; }

  .cat-logout {
    display:flex; align-items:center; gap:6px; padding:8px 16px; border-radius:9px;
    border:1px solid rgba(255,100,100,.22); background:rgba(255,60,60,.07);
    color:rgba(255,120,120,.8); font-size:13px; font-weight:500; cursor:pointer; transition:all .2s;
  }
  .cat-logout:hover { background:rgba(255,60,60,.14); color:#ff8888; }

  /* Hamburger */
  .cat-hamburger {
    display:none; flex-direction:column; justify-content:center; align-items:center; gap:5px;
    width:36px; height:36px; border-radius:9px;
    border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05);
    cursor:pointer; padding:0; transition:all .2s;
  }
  .cat-hamburger:hover { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); }
  .cat-hamburger span { display:block; width:18px; height:2px; background:rgba(255,255,255,.7); border-radius:99px; transition:all .3s; }
  .cat-hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
  .cat-hamburger.open span:nth-child(2) { opacity:0; }
  .cat-hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

  .cat-drawer {
    display:none; position:fixed; top:62px; left:0; right:0; z-index:199;
    background:rgba(18,0,16,0.97); backdrop-filter:blur(24px);
    border-bottom:1px solid rgba(255,255,255,.07);
    padding:14px 18px 18px; flex-direction:column; gap:4px;
    animation:slideDown .22s ease;
  }
  @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
  .cat-drawer.open { display:flex; }
  .cat-drawer a { padding:11px 14px; border-radius:10px; font-size:14px; font-weight:500; color:rgba(255,255,255,.62); text-decoration:none; transition:all .2s; }
  .cat-drawer a:hover { color:#fff; background:rgba(255,255,255,.07); }
  .cat-drawer-divider { height:1px; background:rgba(255,255,255,.07); margin:8px 0; }
  .cat-drawer-actions { display:flex; gap:8px; margin-top:4px; }
  .cat-drawer-actions button { flex:1; justify-content:center; }

  /* ── HERO ── */
  .cat-hero {
    position: relative; z-index: 1;
    background: linear-gradient(135deg,#2a001f 0%,#4C003E 55%,#320026 100%);
    padding: 44px 32px 100px; text-align: center; overflow: hidden;
  }
  .cat-hero::before {
    content:''; position:absolute; inset:0;
    background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:200px; opacity:.03; pointer-events:none;
  }
  .cat-hero-inner { position:relative; z-index:1; max-width:600px; margin:0 auto; }

  /* Breadcrumb */
  .cat-breadcrumb {
    display:inline-flex; align-items:center; gap:6px;
    font-size:12px; color:rgba(255,255,255,.35); margin-bottom:16px;
  }
  .cat-breadcrumb a { color:rgba(255,255,255,.35); text-decoration:none; transition:color .2s; }
  .cat-breadcrumb a:hover { color:rgba(255,255,255,.7); }

  .cat-hero-icon {
    width:72px; height:72px; border-radius:20px; margin:0 auto 16px;
    background:rgba(153,3,125,.2); border:1px solid rgba(153,3,125,.35);
    display:flex; align-items:center; justify-content:center; font-size:32px;
    box-shadow:0 0 32px rgba(153,3,125,.3);
    animation:iconPop .5s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes iconPop { from{transform:scale(0) rotate(-10deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }

  .cat-hero-title {
    font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(26px,5vw,40px);
    color:#fff; margin-bottom:8px; animation:fadeUp .5s .1s ease both;
  }
  .cat-hero-title span {
    background:linear-gradient(90deg,#ff66cc,#cc05a0);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .cat-hero-sub {
    font-size:14px; color:rgba(255,255,255,.45); animation:fadeUp .5s .18s ease both;
  }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  /* ── STATS STRIP ── */
  .cat-stats-strip {
    position:relative; z-index:2;
    max-width:700px; margin:-44px auto 0; padding:0 20px;
  }
  .cat-stats-card {
    border-radius:16px;
    background:rgba(255,255,255,.06);
    border:1px solid rgba(255,255,255,.1);
    backdrop-filter:blur(24px);
    display:grid; grid-template-columns:repeat(3,1fr);
    overflow:hidden;
    box-shadow:0 16px 48px rgba(0,0,0,.35);
  }
  .cat-stat {
    padding:16px 12px; text-align:center;
    border-right:1px solid rgba(255,255,255,.07); transition:background .2s;
  }
  .cat-stat:last-child { border-right:none; }
  .cat-stat:hover { background:rgba(153,3,125,.07); }
  .cat-stat-icon { font-size:16px; margin-bottom:4px; }
  .cat-stat-num { font-family:'Syne',sans-serif; font-weight:800; font-size:20px; color:#fff; line-height:1; }
  .cat-stat-label { font-size:10px; color:rgba(255,255,255,.35); margin-top:3px; letter-spacing:.4px; text-transform:uppercase; }

  /* ── CONTENT ── */
  .cat-content {
    position:relative; z-index:1;
    max-width:1000px; margin:0 auto;
    padding:40px 20px 64px;
  }

  .cat-section-header {
    display:flex; align-items:center; justify-content:space-between;
    margin-bottom:24px;
  }
  .cat-section-title {
    font-family:'Syne',sans-serif; font-weight:700; font-size:18px; color:#fff;
    display:flex; align-items:center; gap:8px;
  }
  .cat-count-pill {
    font-size:11px; font-weight:600; padding:3px 9px; border-radius:99px;
    background:rgba(153,3,125,.2); color:#e060c8; border:1px solid rgba(153,3,125,.28);
  }

  /* Sort/filter bar */
  .cat-filter-bar {
    display:flex; align-items:center; gap:10px; flex-wrap:wrap;
    margin-bottom:24px;
  }
  .cat-filter-label { font-size:12px; color:rgba(255,255,255,.35); }
  .cat-filter-btn {
    padding:6px 14px; border-radius:99px; font-size:12px; font-weight:600;
    border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05);
    color:rgba(255,255,255,.5); cursor:pointer; transition:all .2s;
    font-family:'DM Sans',sans-serif;
  }
  .cat-filter-btn:hover { background:rgba(255,255,255,.1); color:#fff; }
  .cat-filter-btn.active {
    background:linear-gradient(135deg,#99037d,#4C003E);
    border-color:transparent; color:#fff;
    box-shadow:0 3px 12px rgba(153,3,125,.35);
  }

  /* Course grid */
  .cat-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
    gap:20px;
    align-items:start;
  }
  .cat-grid > * { min-width:0; width:100%; }

  /* Empty */
  .cat-empty {
    text-align:center; padding:72px 20px;
    border-radius:16px; border:1px dashed rgba(255,255,255,.08);
    background:rgba(255,255,255,.02);
  }
  .cat-empty-icon { font-size:48px; margin-bottom:14px; }
  .cat-empty-title { font-family:'Syne',sans-serif; font-weight:700; font-size:18px; color:#fff; margin-bottom:8px; }
  .cat-empty-text { font-size:13px; color:rgba(255,255,255,.35); margin-bottom:22px; }
  .cat-browse-btn {
    display:inline-flex; align-items:center; gap:8px;
    padding:11px 24px; border-radius:11px;
    background:linear-gradient(90deg,#99037d,#cc05a0);
    color:#fff; text-decoration:none;
    font-family:'Syne',sans-serif; font-weight:700; font-size:14px;
    transition:all .2s;
  }
  .cat-browse-btn:hover { opacity:.88; transform:translateY(-2px); box-shadow:0 10px 28px rgba(153,3,125,.4); }

  /* ── FOOTER ── */
  .cat-footer {
    position:relative; z-index:1;
    background:rgba(0,0,0,.28);
    border-top:1px solid rgba(255,255,255,.06);
    padding:40px 32px 24px;
  }
  .cat-footer-grid {
    max-width:960px; margin:0 auto 28px;
    display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:28px;
  }
  .cat-footer-col h3 { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; margin-bottom:8px; }
  .cat-footer-col h4 { font-family:'Syne',sans-serif; font-weight:600; font-size:13px; color:rgba(255,255,255,.55); margin-bottom:8px; }
  .cat-footer-col p, .cat-footer-col a { font-size:12px; color:rgba(255,255,255,.32); text-decoration:none; display:block; margin-bottom:5px; transition:color .2s; }
  .cat-footer-col a:hover { color:rgba(255,255,255,.7); }
  .cat-footer-bottom { max-width:960px; margin:0 auto; padding-top:20px; border-top:1px solid rgba(255,255,255,.06); font-size:12px; color:rgba(255,255,255,.22); text-align:center; }

  @media(max-width:768px){
    .cat-navbar { padding:0 16px; }
    .cat-nav-links,.cat-logout,.cat-icon-btn { display:none; }
    .cat-drawer .cat-logout { display:flex !important; }
    .cat-drawer .cat-icon-btn { display:flex !important; }
    .cat-hamburger { display:flex; }
    .cat-hero { padding:36px 16px 88px; }
    .cat-stats-strip { padding:0 16px; }
    .cat-content { padding:32px 16px 48px; }
    .cat-footer { padding:28px 16px 20px; }
  }
  @media(min-width:769px){
    .cat-hamburger { display:none !important; }
    .cat-drawer { display:none !important; }
  }
`;

const CATEGORY_META = {
  Trending: { icon:"🔥", color:"#ff6644" },
  Coding:   { icon:"💻", color:"#44aaff" },
  AI:       { icon:"🤖", color:"#aa44ff" },
  Design:   { icon:"🎨", color:"#ff44aa" },
};

const SORT_OPTIONS = ["Default", "Price: Low to High", "Price: High to Low", "Top Rated"];



export default function CategoryPage() {
  const { category } = useParams();
  const navigate     = useNavigate();

  const [courses,   setCourses]   = useState([]);
  const [sort,      setSort]      = useState("Default");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [darkMode,  setDarkMode]  = useState(() => localStorage.getItem("theme") !== "light");

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => { if (menuOpen) setMenuOpen(false); };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const handleLogout = () => { localStorage.removeItem("user"); navigate("/"); };

  useEffect(() => {
    fetch(`${API}/api/courses`)
      .then(r => r.json())
      .then(data => setCourses(data));
  }, []);

  const filtered = courses.filter(c => c.category === category);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Price: Low to High")  return a.price - b.price;
    if (sort === "Price: High to Low")  return b.price - a.price;
    if (sort === "Top Rated")           return b.rating - a.rating;
    return 0;
  });

  const toggleTheme = () => {
  const next = !darkMode;
  setDarkMode(next);
  localStorage.setItem("theme", next ? "dark" : "light");
};

  const avgRating = filtered.length
    ? (filtered.reduce((s, c) => s + parseFloat(c.rating || 0), 0) / filtered.length).toFixed(1)
    : "—";

  const meta = CATEGORY_META[category] || { icon:"📚", color:"#cc05a0" };

  return (
    <>
      <style>{styles}</style>
      <div className="cat-root">
        <div className="cat-orb cat-orb-1" />
        <div className="cat-orb cat-orb-2" />

        {/* ── NAVBAR ── */}
        <nav className="cat-navbar">
          <Link to="/home" className="cat-brand">
            <div className="cat-brand-logo"><img src={logo} alt="EDU-TECH Logo" className="logo-image" /></div>
            <div>
              <div className="cat-brand-name">EDU-TECH</div>
              <div className="cat-brand-sub">E-Learning Platform</div>
            </div>
          </Link>
          <div className="cat-nav-right">
            <div className="cat-nav-links">
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <button className="cat-icon-btn" onClick={toggleTheme}>
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button className="cat-logout" onClick={handleLogout}><span>⏻</span> Logout</button>
            <button className={`cat-hamburger ${menuOpen ? "open" : ""}`} onClick={() => { toggleTheme(); setMenuOpen(false); }}>
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div className={`cat-drawer ${menuOpen ? "open" : ""}`}>
          <Link to="/home" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to="/my-courses" onClick={() => setMenuOpen(false)}>📚 My Courses</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>❤️ Wishlist</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>👤 Profile</Link>
          <div className="cat-drawer-divider" />
          <div className="cat-drawer-actions">
            <button className="cat-icon-btn" style={{flex:1,width:"auto",borderRadius:10}} onClick={() => { setDarkMode(!darkMode); setMenuOpen(false); }}>
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button className="cat-logout" onClick={handleLogout}>⏻ Logout</button>
          </div>
        </div>

        {/* ── HERO ── */}
        <div className="cat-hero">
          <div className="cat-hero-inner">
            <div className="cat-breadcrumb">
              <Link to="/home">Home</Link> › <span style={{color:"rgba(255,255,255,.6)"}}>Courses</span> › <span style={{color:"rgba(255,255,255,.6)"}}>{category}</span>
            </div>
            <div className="cat-hero-icon">{meta.icon}</div>
            <h1 className="cat-hero-title"><span>{category}</span> Courses</h1>
            <p className="cat-hero-sub">{filtered.length} course{filtered.length !== 1 ? "s" : ""} available in this category</p>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="cat-stats-strip">
          <div className="cat-stats-card">
            <div className="cat-stat">
              <div className="cat-stat-icon">📚</div>
              <div className="cat-stat-num">{filtered.length}</div>
              <div className="cat-stat-label">Courses</div>
            </div>
            <div className="cat-stat">
              <div className="cat-stat-icon">⭐</div>
              <div className="cat-stat-num">{avgRating}</div>
              <div className="cat-stat-label">Avg Rating</div>
            </div>
            <div className="cat-stat">
              <div className="cat-stat-icon">🎓</div>
              <div className="cat-stat-num">{filtered.reduce((s,c) => s + parseInt(c.students || 0), 0).toLocaleString()}</div>
              <div className="cat-stat-label">Students</div>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="cat-content">
          <div className="cat-section-header">
            <div className="cat-section-title">
              {meta.icon} All {category} Courses
              <span className="cat-count-pill">{filtered.length}</span>
            </div>
          </div>

          {/* Sort bar */}
          {filtered.length > 0 && (
            <div className="cat-filter-bar">
              <span className="cat-filter-label">Sort by:</span>
              {SORT_OPTIONS.map(opt => (
                <button key={opt} className={`cat-filter-btn ${sort === opt ? "active" : ""}`}
                  onClick={() => setSort(opt)}>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Grid or empty */}
          {sorted.length === 0 ? (
            <div className="cat-empty">
              <div className="cat-empty-icon">{meta.icon}</div>
              <div className="cat-empty-title">No {category} courses yet</div>
              <div className="cat-empty-text">Check back soon or explore other categories.</div>
              <Link to="/home" className="cat-browse-btn">← Browse All Courses</Link>
            </div>
          ) : (
            <div className="cat-grid">
              {sorted.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <footer className="cat-footer">
          <div className="cat-footer-grid">
            <div className="cat-footer-col">
              <h3>EDU-TECH</h3>
              <p>An E-Learning Platform to upgrade your skills.</p>
            </div>
            <div className="cat-footer-col">
              <h4>Quick Links</h4>
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <div className="cat-footer-col">
              <h4>Support</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/help">Help Center</Link>
            </div>
            <div className="cat-footer-col">
              <h4>Contact</h4>
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@edutech.com</p>
            </div>
          </div>
          <div className="cat-footer-bottom">© 2026 EDU-TECH. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}