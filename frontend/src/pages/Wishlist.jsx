import React, { useEffect, useState } from "react";
import logo from "../asset/logow.png";
import CourseCard from "../components/CourseCard";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:5000";

export default function Wishlist() {
  const navigate = useNavigate();

  const [courses, setCourses]        = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [menuOpen, setMenuOpen]      = useState(false);
  const [fetchError, setFetchError]  = useState(false);

  useEffect(() => {
    // FIX 1: Check "token" (consistent with ProtectedRoute in App.js)
    // FIX 2: Moved auth check inside useEffect — not at render time
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistIds(saved);

    // FIX 3: Added error handling so a failed fetch doesn't silently freeze navigation
    fetch(`${BASE_URL}/api/courses`)
      .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(data => setCourses(data))
      .catch(err => {
        console.error("Failed to fetch courses:", err);
        setFetchError(true);
      });
  }, [navigate]); // FIX 4: Empty dep array — run once on mount, no infinite re-runs

  // FIX 5: Also clear "token" on logout (was only clearing "user" before)
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const wishlistCourses = courses.filter(c => wishlistIds.includes(c.id));

  return (
    <div className="wl-root">

      {/* ── NAVBAR ── */}
      <nav className="wl-navbar">
        <Link to="/home" className="wl-brand">
          <div className="wl-brand-logo"><img src={logo} alt="EDU-TECH Logo" className="logo-image" /></div>
          <div>
            <div className="wl-brand-name">EDU-TECH</div>
            <div className="wl-brand-sub">E-Learning Platform</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="wl-nav-links">
          <Link to="/home">Home</Link>
          <Link to="/my-courses">My Courses</Link>
          <Link to="/wishlist" className="active">Wishlist</Link>
          <Link to="/profile">My Profile</Link>
        </div>

        {/* Desktop actions */}
        <div className="wl-nav-actions">
          <button className="wl-logout-btn" onClick={handleLogout}>
            <span>⏻</span> Logout
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`wl-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`wl-drawer ${menuOpen ? "open" : ""}`}>
        <Link to="/home"       onClick={() => setMenuOpen(false)}>🏠 Home</Link>
        <Link to="/my-courses" onClick={() => setMenuOpen(false)}>📚 My Courses</Link>
        <Link to="/wishlist" className="active" onClick={() => setMenuOpen(false)}>❤️ Wishlist</Link>
        <Link to="/profile"    onClick={() => setMenuOpen(false)}>👤 My Profile</Link>
        <div className="wl-drawer-divider" />
        <div className="wl-drawer-row">
          <button className="wl-logout-btn" style={{ flex:1, justifyContent:"center" }} onClick={handleLogout}>
            ⏻ Logout
          </button>
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="wl-hero">
        <div className="wl-hero-inner">
          <div className="wl-hero-left">
            <div className="wl-hero-icon">❤️</div>
            <div>
              <h1 className="wl-hero-title">My Wishlist</h1>
              <p className="wl-hero-sub">Courses you've saved — enroll anytime</p>
            </div>
          </div>
          <div className="wl-hero-badge">
            ❤️ {wishlistCourses.length} {wishlistCourses.length === 1 ? "Course" : "Courses"} Saved
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="wl-content">
        <div className="wl-section-header">
          <div className="wl-section-title">
            Saved Courses
            {wishlistCourses.length > 0 && (
              <span className="wl-count-pill">{wishlistCourses.length}</span>
            )}
          </div>
        </div>

        {/* FIX 6: Show error state if fetch failed, otherwise original empty/grid UI */}
        {fetchError ? (
          <div className="wl-empty">
            <div className="wl-empty-icon">⚠️</div>
            <h3 className="wl-empty-title">Could not load courses</h3>
            <p className="wl-empty-text">Please check your connection or try again later.</p>
          </div>
        ) : wishlistCourses.length === 0 ? (
          <div className="wl-empty">
            <div className="wl-empty-icon">💔</div>
            <h3 className="wl-empty-title">Your wishlist is empty</h3>
            <p className="wl-empty-text">Browse courses and tap ❤️ to save ones you love!</p>
            <Link to="/home" className="wl-browse-btn">🔍 Browse Courses</Link>
          </div>
        ) : (
          <div className="wl-grid">
            {wishlistCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer className="wl-footer">
        <div className="wl-footer-grid">
          <div className="wl-footer-col">
            <h3>EDU-TECH</h3>
            <p>An E-Learning Platform to upgrade your skills.</p>
          </div>
          <div className="wl-footer-col">
            <h4>Quick Links</h4>
            <Link to="/home">Home</Link>
            <Link to="/my-courses">My Courses</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/profile">Profile</Link>
          </div>
          <div className="wl-footer-col">
            <h4>Support</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/help">Help Center</Link>
          </div>
          <div className="wl-footer-col">
            <h4>Contact</h4>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@edutech.com</p>
          </div>
        </div>
        <div className="wl-footer-bottom">© 2026 EDU-TECH. All rights reserved.</div>
      </footer>

      {/* ── ALL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .wl-root {
          min-height: 100vh;
          background: #1f001d;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          overflow-x: hidden;
        }

        /* ── NAVBAR ── */
        .wl-navbar {
          position: sticky; top: 0; z-index: 200;
          display: flex; align-items: center; gap: 8px;
          padding: 0 32px; height: 62px;
          background: rgba(31,0,29,0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .wl-brand {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
        }
        .wl-brand-logo {
          width: 34px; height: 34px; border-radius: 9px;
          overflow: hidden; background: linear-gradient(135deg,#99037d,#4C003E);
        }
        .wl-brand-logo img { width: 100%; height: 100%; object-fit: cover; }
        .wl-brand-name {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 17px; color: #fff; letter-spacing: -.3px;
        }
        .wl-brand-sub { font-size: 10px; color: rgba(255,255,255,.38); letter-spacing: .5px; }

        .wl-nav-links {
          display: flex; align-items: center; gap: 2px;
          margin-left: auto;
        }
        .wl-nav-links a {
          padding: 7px 13px; border-radius: 8px;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,.52); text-decoration: none;
          transition: all .2s; white-space: nowrap;
        }
        .wl-nav-links a:hover, .wl-nav-links a.active { color:#fff; background:rgba(255,255,255,.08); }

        .wl-nav-actions { display: flex; align-items: center; gap: 6px; margin-left: 10px; }

        .wl-logout-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 9px;
          border: 1px solid rgba(255,100,100,.25);
          background: rgba(255,60,60,.08);
          color: rgba(255,120,120,.85);
          font-size: 13px; font-weight: 500; cursor: pointer;
          transition: all .2s; white-space: nowrap;
        }
        .wl-logout-btn:hover { background:rgba(255,60,60,.15); border-color:rgba(255,100,100,.4); color:#ff8888; }

        /* Hamburger */
        .wl-hamburger {
          display: none;
          flex-direction: column; justify-content: center; align-items: center; gap: 5px;
          width: 36px; height: 36px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05);
          cursor: pointer; padding: 0; transition: all .2s; flex-shrink: 0;
        }
        .wl-hamburger:hover { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); }
        .wl-hamburger span { display:block; width:18px; height:2px; background:rgba(255,255,255,.7); border-radius:99px; transition:all .3s ease; }
        .wl-hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .wl-hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
        .wl-hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        /* Mobile Drawer */
        .wl-drawer {
          display: none; position: fixed;
          top: 62px; left: 0; right: 0; z-index: 199;
          background: rgba(18,0,16,0.97); backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,255,255,.08);
          padding: 14px 18px 18px; flex-direction: column; gap: 4px;
          animation: wlSlide .22s ease;
        }
        @keyframes wlSlide { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        .wl-drawer.open { display: flex; }
        .wl-drawer a {
          padding: 11px 14px; border-radius: 10px;
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,.65); text-decoration: none;
          transition: all .2s; border: 1px solid transparent;
        }
        .wl-drawer a:hover, .wl-drawer a.active { color:#fff; background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.08); }
        .wl-drawer-divider { height:1px; background:rgba(255,255,255,.07); margin:8px 0; }
        .wl-drawer-row { display:flex; gap:8px; }

        /* ── HERO ── */
        .wl-hero {
          border-bottom: 1px solid rgba(255,255,255,.07);
          padding: 28px 32px 26px;
          background: rgba(255,255,255,.02);
        }

        .wl-hero-inner {
          max-width: 980px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
        }
        .wl-hero-left { display: flex; align-items: center; gap: 14px; }
        .wl-hero-icon {
          width: 50px; height: 50px; border-radius: 14px; flex-shrink: 0;
          background: rgba(153,3,125,.18); border: 1px solid rgba(153,3,125,.3);
          display: flex; align-items: center; justify-content: center; font-size: 22px;
        }
        .wl-hero-title {
          font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px;
          color: #fff; line-height: 1.2; margin-bottom: 3px;
        }
        .wl-hero-sub { font-size: 13px; color: rgba(255,255,255,.42); }
        .wl-hero-badge {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 18px; border-radius: 99px;
          background: rgba(153,3,125,.16); border: 1px solid rgba(153,3,125,.3);
          font-family: 'Syne', sans-serif; font-weight: 700; font-size: 13px;
          color: #e060c8; white-space: nowrap;
        }

        /* ── CONTENT ── */
        .wl-content {
          max-width: 1100px; margin: 0 auto;
          padding: 32px 24px 60px;
        }

        .wl-section-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 22px;
        }
        .wl-section-title {
          font-family: 'Syne', sans-serif; font-weight: 700; font-size: 17px;
          color: #fff; display: flex; align-items: center; gap: 8px;
        }
        .wl-count-pill {
          font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 99px;
          background: rgba(153,3,125,.2); color: #e060c8; border: 1px solid rgba(153,3,125,.28);
        }

        /* Course grid */
        .wl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }

        /* ── EMPTY STATE ── */
        .wl-empty {
          text-align: center; padding: 80px 20px; border-radius: 16px;
          background: rgba(255,255,255,.03); border: 1px dashed rgba(255,255,255,.1);
        }
        .wl-empty-icon { font-size: 52px; margin-bottom: 14px; }
        .wl-empty-title {
          font-family: 'Syne', sans-serif; font-weight: 700; font-size: 19px;
          color: #fff; margin-bottom: 8px;
        }
        .wl-empty-text { font-size: 13px; color: rgba(255,255,255,.35); margin-bottom: 24px; }
        .wl-browse-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 26px; border-radius: 11px;
          background: linear-gradient(90deg,#99037d,#cc05a0);
          color: #fff; text-decoration: none;
          font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px;
          transition: all .2s;
        }
        .wl-browse-btn:hover { opacity:.88; transform:translateY(-2px); box-shadow:0 10px 28px rgba(153,3,125,.4); }

        /* ── FOOTER ── */
        .wl-footer {
          background: rgba(0,0,0,.28);
          border-top: 1px solid rgba(255,255,255,.06);
          padding: 40px 32px 24px;
        }
        .wl-footer-grid {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(auto-fit,minmax(160px,1fr));
          gap: 28px; margin-bottom: 28px;
        }
        .wl-footer-col h3 { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; margin-bottom:8px; }
        .wl-footer-col h4 { font-family:'Syne',sans-serif; font-weight:600; font-size:13px; color:rgba(255,255,255,.55); margin-bottom:8px; }
        .wl-footer-col p, .wl-footer-col a { font-size:12px; color:rgba(255,255,255,.32); text-decoration:none; display:block; margin-bottom:5px; transition:color .2s; }
        .wl-footer-col a:hover { color:rgba(255,255,255,.7); }
        .wl-footer-bottom {
          max-width: 1100px; margin: 0 auto;
          padding-top: 20px; border-top: 1px solid rgba(255,255,255,.06);
          font-size: 12px; color: rgba(255,255,255,.22); text-align: center;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .wl-navbar { padding: 0 16px; }
          .wl-nav-links { display: none; }
          .wl-nav-actions { display: none; }
          .wl-hamburger { margin-left: auto; display: flex; }
          .wl-hero { padding: 20px 16px 18px; }
          .wl-hero-title { font-size: 19px; }
          .wl-hero-badge { font-size: 12px; padding: 6px 13px; }
          .wl-content { padding: 24px 16px 48px; }
          .wl-grid { grid-template-columns: repeat(auto-fill, minmax(160px,1fr)); gap: 14px; }
          .wl-footer { padding: 28px 16px 20px; }
        }
        @media (min-width: 769px) {
          .wl-hamburger { display: none !important; }
          .wl-drawer { display: none !important; }
        }
      `}</style>
    </div>
  );
}