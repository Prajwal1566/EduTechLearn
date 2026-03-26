import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:5000";

export default function MyCourses() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const [courses, setCourses]   = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!userId) { navigate("/login"); return; }
    fetch(`${BASE_URL}/api/my-courses/${userId}`)
      .then(res => res.json())
      .then(data => { setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [userId, navigate]);

  const handleLogout = () => { localStorage.removeItem("user"); navigate("/"); };

  const inProgress = courses.filter(c => c.completed === 0);
  const completed  = courses.filter(c => c.completed === 1);

  return (
    <div className={`mc-root ${darkMode ? "" : "light"}`}>

      {/* ── NAVBAR ── */}
      <nav className="mc-navbar">
        <Link to="/home" className="mc-brand">
          <div className="mc-brand-logo"><img src="/logow.png" alt="logo" /></div>
          <div>
            <div className="mc-brand-name">EDU-TECH</div>
            <div className="mc-brand-sub">E-Learning Platform</div>
          </div>
        </Link>

        <div className="mc-nav-links">
          <Link to="/home">Home</Link>
          <Link to="/my-courses" className="active">My Courses</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/profile">My Profile</Link>
        </div>

        <div className="mc-nav-actions">
          <button className="mc-icon-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button className="mc-logout-btn" onClick={handleLogout}>
            <span>⏻</span> Logout
          </button>
        </div>

        <button
          className={`mc-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mc-drawer ${menuOpen ? "open" : ""}`}>
        <Link to="/home"         onClick={() => setMenuOpen(false)}>🏠 Home</Link>
        <Link to="/my-courses" className="active" onClick={() => setMenuOpen(false)}>📚 My Courses</Link>
        <Link to="/wishlist"     onClick={() => setMenuOpen(false)}>❤️ Wishlist</Link>
        <Link to="/profile"      onClick={() => setMenuOpen(false)}>👤 My Profile</Link>
        <div className="mc-drawer-divider" />
        <div className="mc-drawer-row">
          <button className="mc-icon-btn" style={{ flex:1, width:"auto", borderRadius:10 }}
            onClick={() => { setDarkMode(!darkMode); setMenuOpen(false); }}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button className="mc-logout-btn" style={{ flex:1, justifyContent:"center" }} onClick={handleLogout}>
            ⏻ Logout
          </button>
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="mc-hero">
        <div className="mc-hero-inner">
          <div className="mc-hero-left">
            <div className="mc-hero-icon">📚</div>
            <div>
              <h1 className="mc-hero-title">My Courses</h1>
              <p className="mc-hero-sub">Track your learning journey</p>
            </div>
          </div>
          {/* Stats pills */}
          <div className="mc-hero-stats">
            <div className="mc-stat-pill">
              <span className="mc-stat-num">{courses.length}</span>
              <span className="mc-stat-label">Enrolled</span>
            </div>
            <div className="mc-stat-pill">
              <span className="mc-stat-num">{inProgress.length}</span>
              <span className="mc-stat-label">In Progress</span>
            </div>
            <div className="mc-stat-pill completed-pill">
              <span className="mc-stat-num">{completed.length}</span>
              <span className="mc-stat-label">Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="mc-content">

        {loading ? (
          <div className="mc-grid">
            {[1,2,3,4].map(i => (
              <div key={i} className="mc-shimmer-wrap">
                <div className="mc-shimmer mc-sh-img" />
                <div style={{ padding:"12px 14px" }}>
                  <div className="mc-shimmer mc-sh-line" />
                  <div className="mc-shimmer mc-sh-short" />
                  <div className="mc-shimmer mc-sh-bar" />
                  <div className="mc-shimmer mc-sh-btn" />
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="mc-empty">
            <div className="mc-empty-icon">🎒</div>
            <h3 className="mc-empty-title">No courses yet</h3>
            <p className="mc-empty-text">You haven't enrolled in any courses yet.</p>
            <Link to="/home" className="mc-browse-btn">🔍 Browse Courses</Link>
          </div>
        ) : (
          <>
            {/* ── IN PROGRESS ── */}
            {inProgress.length > 0 && (
              <div className="mc-section">
                <div className="mc-section-title">
                  ⚡ In Progress
                  <span className="mc-count-pill">{inProgress.length}</span>
                </div>
                <div className="mc-grid">
                  {inProgress.map(course => (
                    <div key={course.id} className="mc-card-wrap">
                      {/* CourseCard — untouched */}
                      <CourseCard course={course} />

                      {/* Progress bar */}
                      <div className="mc-progress-section">
                        <div className="mc-progress-header">
                          <span className="mc-progress-label">Progress</span>
                          <span className="mc-progress-pct">{course.progress || 0}%</span>
                        </div>
                        <div className="mc-progress-track">
                          <div
                            className="mc-progress-fill"
                            style={{ width: `${course.progress || 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Continue button */}
                      <button
                        className="mc-continue-btn"
                        onClick={() => navigate(`/course/${course.id}`)}
                      >
                        ▶ Continue Learning
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── COMPLETED ── */}
            {completed.length > 0 && (
              <div className="mc-section">
                <div className="mc-section-title">
                  🏆 Completed
                  <span className="mc-count-pill">{completed.length}</span>
                </div>
                <div className="mc-grid">
                  {completed.map(course => (
                    <div key={course.id} className="mc-card-wrap">
                      {/* CourseCard — untouched */}
                      <CourseCard course={course} />

                      {/* Completed badge */}
                      <div className="mc-completed-badge">✓ Completed</div>

                      {/* Download Certificate */}
                      <button
                        className="mc-cert-btn"
                        onClick={() => window.open(`${BASE_URL}/api/certificate/${user.id}/${course.id}`)}
                      >
                        ⬇ Download Certificate
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="mc-footer">
        <div className="mc-footer-grid">
          <div className="mc-footer-col">
            <h3>EDU-TECH</h3>
            <p>An E-Learning Platform to upgrade your skills.</p>
          </div>
          <div className="mc-footer-col">
            <h4>Quick Links</h4>
            <Link to="/home">Home</Link>
            <Link to="/my-courses">My Courses</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/profile">Profile</Link>
          </div>
          <div className="mc-footer-col">
            <h4>Support</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/help">Help Center</Link>
          </div>
          <div className="mc-footer-col">
            <h4>Contact</h4>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@edutech.com</p>
          </div>
        </div>
        <div className="mc-footer-bottom">© 2026 EDU-TECH. All rights reserved.</div>
      </footer>

      {/* ── ALL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .mc-root {
          min-height: 100vh;
          background: #1f001d;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          overflow-x: hidden;
        }
        .mc-root.light { background: #f5f0f5; color: #1a001a; }

        /* ── NAVBAR ── */
        .mc-navbar {
          position: sticky; top: 0; z-index: 200;
          display: flex; align-items: center; gap: 8px;
          justify-content: space-between;
          padding: 0 32px; height: 62px;
          background: rgba(31,0,29,0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .light .mc-navbar { background:rgba(245,240,245,0.93); border-bottom-color:rgba(76,0,62,0.1); }

        .mc-brand { display:flex; align-items:center; gap:10px; text-decoration:none; flex-shrink:0; }
        .mc-brand-logo { width:34px; height:34px; border-radius:9px; overflow:hidden; background:linear-gradient(135deg,#99037d,#4C003E); }
        .mc-brand-logo img { width:100%; height:100%; object-fit:cover; }
        .mc-brand-name { font-family:'Syne',sans-serif; font-weight:800; font-size:17px; color:#fff; letter-spacing:-.3px; }
        .light .mc-brand-name { color:#2d002a; }
        .mc-brand-sub { font-size:10px; color:rgba(255,255,255,.38); letter-spacing:.5px; }
        .light .mc-brand-sub { color:rgba(76,0,62,.42); }

        .mc-nav-links { display:flex; align-items:center; gap:2px; margin-left:auto; }
        .mc-nav-links a {
          padding:7px 13px; border-radius:8px; font-size:13px; font-weight:500;
          color:rgba(255,255,255,.52); text-decoration:none; transition:all .2s; white-space:nowrap;
        }
        .mc-nav-links a:hover, .mc-nav-links a.active { color:#fff; background:rgba(255,255,255,.08); }
        .light .mc-nav-links a { color:rgba(76,0,62,.58); }
        .light .mc-nav-links a:hover, .light .mc-nav-links a.active { color:#4C003E; background:rgba(76,0,62,.08); }

        .mc-nav-actions { display:flex; align-items:center; gap:6px; margin-left:10px; }

        .mc-icon-btn {
          width:36px; height:36px; border-radius:9px;
          border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05);
          color:rgba(255,255,255,.6); cursor:pointer; font-size:15px;
          display:flex; align-items:center; justify-content:center; transition:all .2s;
        }
        .mc-icon-btn:hover { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); color:#fff; }
        .light .mc-icon-btn { border-color:rgba(76,0,62,.13); background:rgba(76,0,62,.05); color:#4C003E; }

        .mc-logout-btn {
          display:flex; align-items:center; gap:6px; padding:8px 16px; border-radius:9px;
          border:1px solid rgba(255,100,100,.25); background:rgba(255,60,60,.08);
          color:rgba(255,120,120,.85); font-size:13px; font-weight:500; cursor:pointer;
          transition:all .2s; white-space:nowrap;
        }
        .mc-logout-btn:hover { background:rgba(255,60,60,.15); border-color:rgba(255,100,100,.4); color:#ff8888; }
        .light .mc-logout-btn { border-color:rgba(200,0,0,.15); background:rgba(200,0,0,.04); color:rgba(180,0,0,.7); }

        /* Hamburger */
        .mc-hamburger {
          display:none; flex-direction:column; justify-content:center; align-items:center; gap:5px;
          width:36px; height:36px; border-radius:9px;
          border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05);
          cursor:pointer; padding:0; transition:all .2s; flex-shrink:0;
        }
        .mc-hamburger:hover { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); }
        .light .mc-hamburger { border-color:rgba(76,0,62,.13); background:rgba(76,0,62,.05); }
        .mc-hamburger span { display:block; width:18px; height:2px; background:rgba(255,255,255,.7); border-radius:99px; transition:all .3s ease; }
        .light .mc-hamburger span { background:#4C003E; }
        .mc-hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .mc-hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
        .mc-hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        /* Mobile Drawer */
        .mc-drawer {
          display:none; position:fixed; top:62px; left:0; right:0; z-index:199;
          background:rgba(18,0,16,0.97); backdrop-filter:blur(24px);
          border-bottom:1px solid rgba(255,255,255,.08);
          padding:14px 18px 18px; flex-direction:column; gap:4px;
          animation:mcSlide .22s ease;
        }
        .light .mc-drawer { background:rgba(245,240,245,0.98); border-bottom-color:rgba(76,0,62,.1); }
        @keyframes mcSlide { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        .mc-drawer.open { display:flex; }
        .mc-drawer a {
          padding:11px 14px; border-radius:10px; font-size:14px; font-weight:500;
          color:rgba(255,255,255,.65); text-decoration:none; transition:all .2s; border:1px solid transparent;
        }
        .mc-drawer a:hover, .mc-drawer a.active { color:#fff; background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.08); }
        .light .mc-drawer a { color:rgba(76,0,62,.65); }
        .light .mc-drawer a:hover, .light .mc-drawer a.active { color:#4C003E; background:rgba(76,0,62,.08); border-color:rgba(76,0,62,.1); }
        .mc-drawer-divider { height:1px; background:rgba(255,255,255,.07); margin:8px 0; }
        .light .mc-drawer-divider { background:rgba(76,0,62,.08); }
        .mc-drawer-row { display:flex; gap:8px; }

        /* ── HERO ── */
        .mc-hero {
          border-bottom:1px solid rgba(255,255,255,.07);
          padding:28px 32px 26px;
          background:rgba(255,255,255,.02);
        }
        .light .mc-hero { border-bottom-color:rgba(76,0,62,.08); background:rgba(76,0,62,.02); }

        .mc-hero-inner {
          max-width:1100px; margin:0 auto;
          display:flex; align-items:center; justify-content:space-between;
          gap:16px; flex-wrap:wrap;
        }
        .mc-hero-left { display:flex; align-items:center; gap:14px; }
        .mc-hero-icon {
          width:50px; height:50px; border-radius:14px; flex-shrink:0;
          background:rgba(153,3,125,.18); border:1px solid rgba(153,3,125,.3);
          display:flex; align-items:center; justify-content:center; font-size:22px;
        }
        .mc-hero-title { font-family:'Syne',sans-serif; font-weight:800; font-size:22px; color:#fff; margin-bottom:3px; }
        .light .mc-hero-title { color:#1a001a; }
        .mc-hero-sub { font-size:13px; color:rgba(255,255,255,.42); }
        .light .mc-hero-sub { color:rgba(76,0,62,.5); }

        /* Stat pills */
        .mc-hero-stats { display:flex; gap:10px; flex-wrap:wrap; }
        .mc-stat-pill {
          display:flex; flex-direction:column; align-items:center;
          padding:10px 20px; border-radius:12px;
          background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
          min-width:80px;
        }
        .light .mc-stat-pill { background:#fff; border-color:rgba(76,0,62,.1); box-shadow:0 2px 8px rgba(76,0,62,.07); }
        .mc-stat-pill.completed-pill { background:rgba(68,238,136,.07); border-color:rgba(68,238,136,.2); }
        .light .mc-stat-pill.completed-pill { background:rgba(68,238,136,.05); border-color:rgba(68,238,136,.18); }
        .mc-stat-num { font-family:'Syne',sans-serif; font-weight:800; font-size:22px; color:#fff; line-height:1; }
        .light .mc-stat-num { color:#1a001a; }
        .mc-stat-pill.completed-pill .mc-stat-num { color:#44ee88; }
        .mc-stat-label { font-size:10px; color:rgba(255,255,255,.4); margin-top:3px; text-transform:uppercase; letter-spacing:.4px; }
        .light .mc-stat-label { color:rgba(76,0,62,.5); }

        /* ── CONTENT ── */
        .mc-content { max-width:1100px; margin:0 auto; padding:32px 24px 60px; }

        /* Section title */
        .mc-section { margin-bottom:44px; }
        .mc-section-title {
          font-family:'Syne',sans-serif; font-weight:700; font-size:17px;
          color:#fff; display:flex; align-items:center; gap:8px; margin-bottom:20px;
        }
        .light .mc-section-title { color:#1a001a; }
        .mc-count-pill {
          font-size:11px; font-weight:600; padding:3px 9px; border-radius:99px;
          background:rgba(153,3,125,.2); color:#e060c8; border:1px solid rgba(153,3,125,.28);
        }
        .light .mc-count-pill { background:rgba(153,3,125,.09); color:#99037d; }

        /* Course grid */
        .mc-grid {
          display:grid;
          grid-template-columns:repeat(auto-fill, minmax(240px,1fr));
          gap:20px;
        }

        /* Card wrapper — sits BELOW CourseCard, no touching card itself */
        .mc-card-wrap {
          display:flex; flex-direction:column; gap:0;
        }

        /* Progress bar */
        .mc-progress-section {
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.08);
          border-top:none;
          padding:10px 14px 8px;
        }
        .light .mc-progress-section { background:#fff; border-color:rgba(76,0,62,.1); }
        .mc-progress-header {
          display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;
        }
        .mc-progress-label { font-size:11px; color:rgba(255,255,255,.4); }
        .light .mc-progress-label { color:rgba(76,0,62,.5); }
        .mc-progress-pct { font-size:11px; font-weight:700; color:#e060c8; }
        .light .mc-progress-pct { color:#99037d; }
        .mc-progress-track {
          height:5px; border-radius:99px; background:rgba(255,255,255,.1); overflow:hidden;
        }
        .light .mc-progress-track { background:rgba(76,0,62,.1); }
        .mc-progress-fill {
          height:100%; border-radius:99px;
          background:linear-gradient(90deg,#99037d,#cc05a0);
          transition:width .6s ease;
        }

        /* Continue button */
        .mc-continue-btn {
          width:100%; padding:10px 0; border-radius:0 0 14px 14px;
          background:linear-gradient(90deg,#4a0033,#99037d);
          border:none; color:#fff;
          font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600;
          cursor:pointer; transition:all .2s;
          display:flex; align-items:center; justify-content:center; gap:6px;
        }
        .mc-continue-btn:hover { opacity:.88; box-shadow:0 4px 16px rgba(153,3,125,.4); }

        /* Completed badge */
        .mc-completed-badge {
          padding:8px 14px;
          background:rgba(68,238,136,.08); border:1px solid rgba(68,238,136,.2); border-top:none;
          font-size:12px; font-weight:600; color:#44ee88;
          display:flex; align-items:center; gap:6px;
        }
        .light .mc-completed-badge { background:rgba(68,238,136,.05); }

        /* Certificate button */
        .mc-cert-btn {
          width:100%; padding:10px 0; border-radius:0 0 14px 14px;
          background:linear-gradient(90deg,#1a7a3c,#22aa55);
          border:none; color:#fff;
          font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600;
          cursor:pointer; transition:all .2s;
          display:flex; align-items:center; justify-content:center; gap:6px;
        }
        .mc-cert-btn:hover { opacity:.88; box-shadow:0 4px 16px rgba(34,170,85,.4); }

        /* ── SHIMMER LOADING ── */
        .mc-shimmer-wrap { border-radius:14px; overflow:hidden; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.07); }
        .light .mc-shimmer-wrap { background:#fff; border-color:rgba(76,0,62,.08); }
        .mc-shimmer {
          background:linear-gradient(90deg,rgba(255,255,255,.05) 0%,rgba(255,255,255,.12) 50%,rgba(255,255,255,.05) 100%);
          background-size:200% 100%; animation:mcShim 1.5s infinite;
        }
        .light .mc-shimmer { background:linear-gradient(90deg,#f0e8f0 0%,#e4d4e4 50%,#f0e8f0 100%); background-size:200% 100%; }
        @keyframes mcShim { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .mc-sh-img   { height:150px; }
        .mc-sh-line  { height:13px; border-radius:6px; margin-bottom:8px; }
        .mc-sh-short { height:10px; width:55%; border-radius:6px; margin-bottom:10px; }
        .mc-sh-bar   { height:5px; border-radius:99px; margin-bottom:10px; }
        .mc-sh-btn   { height:36px; border-radius:8px; }

        /* ── EMPTY STATE ── */
        .mc-empty {
          text-align:center; padding:80px 20px; border-radius:16px;
          background:rgba(255,255,255,.03); border:1px dashed rgba(255,255,255,.1);
        }
        .light .mc-empty { background:rgba(76,0,62,.02); border-color:rgba(76,0,62,.1); }
        .mc-empty-icon { font-size:52px; margin-bottom:14px; }
        .mc-empty-title { font-family:'Syne',sans-serif; font-weight:700; font-size:19px; color:#fff; margin-bottom:8px; }
        .light .mc-empty-title { color:#1a001a; }
        .mc-empty-text { font-size:13px; color:rgba(255,255,255,.35); margin-bottom:24px; }
        .light .mc-empty-text { color:rgba(76,0,62,.45); }
        .mc-browse-btn {
          display:inline-flex; align-items:center; gap:8px;
          padding:12px 26px; border-radius:11px;
          background:linear-gradient(90deg,#99037d,#cc05a0);
          color:#fff; text-decoration:none;
          font-family:'Syne',sans-serif; font-weight:700; font-size:14px; transition:all .2s;
        }
        .mc-browse-btn:hover { opacity:.88; transform:translateY(-2px); box-shadow:0 10px 28px rgba(153,3,125,.4); }

        /* ── FOOTER ── */
        .mc-footer { background:rgba(0,0,0,.28); border-top:1px solid rgba(255,255,255,.06); padding:40px 32px 24px; }
        .light .mc-footer { background:rgba(76,0,62,.04); border-top-color:rgba(76,0,62,.1); }
        .mc-footer-grid {
          max-width:1100px; margin:0 auto;
          display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
          gap:28px; margin-bottom:28px;
        }
        .mc-footer-col h3 { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; margin-bottom:8px; }
        .mc-footer-col h4 { font-family:'Syne',sans-serif; font-weight:600; font-size:13px; color:rgba(255,255,255,.55); margin-bottom:8px; }
        .light .mc-footer-col h3 { color:#1a001a; }
        .light .mc-footer-col h4 { color:rgba(76,0,62,.58); }
        .mc-footer-col p, .mc-footer-col a { font-size:12px; color:rgba(255,255,255,.32); text-decoration:none; display:block; margin-bottom:5px; transition:color .2s; }
        .mc-footer-col a:hover { color:rgba(255,255,255,.7); }
        .light .mc-footer-col p, .light .mc-footer-col a { color:rgba(76,0,62,.42); }
        .light .mc-footer-col a:hover { color:#4C003E; }
        .mc-footer-bottom { max-width:1100px; margin:0 auto; padding-top:20px; border-top:1px solid rgba(255,255,255,.06); font-size:12px; color:rgba(255,255,255,.22); text-align:center; }
        .light .mc-footer-bottom { border-top-color:rgba(76,0,62,.08); color:rgba(76,0,62,.35); }

        /* ── RESPONSIVE ── */
        @media (max-width:768px) {
          .mc-navbar { padding:0 16px; }
          .mc-nav-links { display:none; }
          .mc-nav-actions { display:none; }
          .mc-hamburger { display:flex; }
          .mc-hero { padding:20px 16px 18px; }
          .mc-hero-title { font-size:19px; }
          .mc-content { padding:24px 16px 48px; }
          .mc-grid { grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:14px; }
          .mc-footer { padding:28px 16px 20px; }
          .mc-hero-stats { gap:8px; }
          .mc-stat-pill { padding:8px 14px; min-width:70px; }
        }
        @media (min-width:769px) {
          .mc-hamburger { display:none !important; }
          .mc-drawer   { display:none !important; }
        }
      `}</style>
    </div>
  );
}