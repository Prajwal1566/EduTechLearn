import React, { useEffect, useState } from "react";
import logo from "../asset/logow.png";
import { Link, useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pr-root {
    min-height: 100vh;
    background: #1f001d;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
    animation: floatOrb 10s ease-in-out infinite;
  }
  .orb-1 {
    width: 420px; height: 420px;
    background: radial-gradient(circle, #9900ff2a, transparent);
    top: -80px; left: -80px;
  }
  .orb-2 {
    width: 360px; height: 360px;
    background: radial-gradient(circle, #ff00aa1a, transparent);
    bottom: -60px; right: -60px;
    animation-delay: -4s;
  }
  @keyframes floatOrb {
    0%,100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(20px,-30px) scale(1.05); }
  }

  /* ── NAVBAR ── */
  .pr-navbar {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px;
    height: 60px;
    background: rgba(31,0,29,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .pr-nav-brand {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; flex-shrink: 0;
  }
  .pr-nav-logo {
    width: 34px; height: 34px;
    border-radius: 9px;
    overflow: hidden;
    background: linear-gradient(135deg,#99037d,#4C003E);
    flex-shrink: 0;
  }
  .pr-nav-logo img { width:100%; height:100%; object-fit:cover; }
  .pr-nav-brand-text { font-family:'Syne',sans-serif; font-weight:800; font-size:17px; color:#fff; letter-spacing:-.3px; }
  .pr-nav-brand-sub { font-size:10px; color:rgba(255,255,255,.4); letter-spacing:.5px; }

  /* Nav links — pushed to RIGHT side */
  .pr-nav-right {
    display: flex; align-items: center; gap: 6px;
    margin-left: auto;
  }

  .pr-nav-links {
    display: flex; align-items: center; gap: 2px;
    margin-right: 8px;
  }
  .pr-nav-links a {
    padding: 7px 13px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,.55);
    text-decoration: none;
    transition: all .2s;
    white-space: nowrap;
  }
  .pr-nav-links a:hover, .pr-nav-links a.active { color:#fff; background:rgba(255,255,255,.08); }

  .logout-btn {
    display:flex; align-items:center; gap:6px;
    padding:8px 16px;
    border-radius:9px;
    border:1px solid rgba(255,100,100,.25);
    background:rgba(255,60,60,.08);
    color:rgba(255,120,120,.85);
    font-size:13px; font-weight:500; cursor:pointer;
    transition:all .2s; white-space: nowrap;
  }
  .logout-btn:hover { background:rgba(255,60,60,.15); border-color:rgba(255,100,100,.4); color:#ff8888; }

  /* Hamburger */
  .hamburger {
    display: none;
    flex-direction: column; justify-content: center; align-items: center;
    gap: 5px;
    width: 36px; height: 36px;
    border-radius: 9px;
    border: 1px solid rgba(255,255,255,.1);
    background: rgba(255,255,255,.05);
    cursor: pointer; padding: 0;
    transition: all .2s;
  }
  .hamburger:hover { background: rgba(153,3,125,.2); border-color: rgba(153,3,125,.4); }
  .hamburger span {
    display: block; width: 18px; height: 2px;
    background: rgba(255,255,255,.7);
    border-radius: 99px;
    transition: all .3s ease;
  }
  .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Mobile drawer */
  .mobile-menu {
    display: none;
    position: fixed;
    top: 60px; left: 0; right: 0;
    z-index: 199;
    background: rgba(20,0,18,0.97);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(255,255,255,.08);
    padding: 16px 20px 20px;
    flex-direction: column;
    gap: 4px;
    animation: slideDown .25s ease;
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .mobile-menu.open { display: flex; }

  .mobile-menu a {
    padding: 11px 14px;
    border-radius: 10px;
    font-size: 14px; font-weight: 500;
    color: rgba(255,255,255,.65);
    text-decoration: none;
    transition: all .2s;
    border: 1px solid transparent;
  }
  .mobile-menu a:hover, .mobile-menu a.active {
    color: #fff;
    background: rgba(255,255,255,.07);
    border-color: rgba(255,255,255,.08);
  }

  .mobile-menu-divider {
    height: 1px;
    background: rgba(255,255,255,.07);
    margin: 8px 0;
  }

  .mobile-actions {
    display: flex; gap: 8px; margin-top: 4px;
  }
  .mobile-actions button { flex: 1; }

  /* ── HERO BANNER ── */
  .pr-hero {
    position: relative; z-index: 1;
    background: linear-gradient(135deg, #2a001f 0%, #4C003E 50%, #330028 100%);
    padding: 40px 32px 88px;
    overflow: hidden;
  }
  .pr-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 200px; opacity: .03;
  }
  .pr-hero::after {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,0,170,.12), transparent);
    top: -60px; right: -40px;
    filter: blur(60px);
    pointer-events: none;
  }

  .pr-hero-inner {
    position: relative; z-index: 1;
    max-width: 900px; margin: 0 auto;
    display: flex; align-items: center; gap: 28px;
    flex-wrap: wrap;
  }

  .pr-avatar-wrap { position: relative; flex-shrink: 0; }
  .pr-avatar {
    width: 100px; height: 100px;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,.3);
    box-shadow: 0 0 0 6px rgba(153,3,125,.2), 0 12px 32px rgba(0,0,0,.4);
    object-fit: cover;
    background: linear-gradient(135deg,#99037d,#4C003E);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne',sans-serif; font-weight: 700; font-size: 34px;
    color: rgba(255,255,255,.8); overflow: hidden;
  }
  .pr-avatar img { width:100%; height:100%; object-fit:cover; }
  .pr-avatar-online {
    position: absolute; bottom: 4px; right: 4px;
    width: 20px; height: 20px; border-radius: 50%;
    background: #44ee88; border: 2px solid #2a001f;
    display: flex; align-items: center; justify-content: center;
    font-size: 9px;
  }

  .pr-hero-info { flex: 1; min-width: 200px; }
  .pr-hero-name { font-family:'Syne',sans-serif; font-weight:800; font-size:26px; color:#fff; margin-bottom:4px; }
  .pr-hero-email { font-size:13px; color:rgba(255,255,255,.5); margin-bottom:10px; }
  .pr-hero-bio { font-size:13px; color:rgba(255,255,255,.65); line-height:1.6; max-width:480px; margin-bottom:14px; }
  .pr-hero-tags { display:flex; gap:8px; flex-wrap:wrap; }
  .pr-tag {
    padding:4px 10px; border-radius:99px;
    font-size:11px; font-weight:600; letter-spacing:.3px;
    border:1px solid rgba(255,255,255,.15);
    color:rgba(255,255,255,.6);
    background:rgba(255,255,255,.06);
  }
  .pr-tag.pink { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.35); color:#e060c8; }

  .edit-btn {
    flex-shrink: 0;
    display: flex; align-items: center; gap: 7px;
    padding: 10px 20px; border-radius: 11px;
    background: rgba(255,255,255,.1);
    border: 1px solid rgba(255,255,255,.18);
    color: #fff; font-family:'DM Sans',sans-serif;
    font-size: 13px; font-weight: 600; cursor: pointer;
    transition: all .2s;
    backdrop-filter: blur(8px);
    align-self: flex-start;
    margin-top: 6px;
  }
  .edit-btn:hover { background:rgba(255,255,255,.18); transform:translateY(-1px); }

  /* ── STATS STRIP ── */
  .pr-stats-strip {
    position: relative; z-index: 2;
    max-width: 900px; margin: -44px auto 0;
    padding: 0 20px;
  }
  .pr-stats-card {
    border-radius: 18px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.1);
    backdrop-filter: blur(24px);
    display: grid; grid-template-columns: repeat(3,1fr);
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0,0,0,.35);
  }
  .pr-stat-item {
    padding: 20px 16px; text-align: center;
    border-right: 1px solid rgba(255,255,255,.07);
    transition: background .2s;
  }
  .pr-stat-item:last-child { border-right: none; }
  .pr-stat-item:hover { background: rgba(153,3,125,.08); }
  .pr-stat-num { font-family:'Syne',sans-serif; font-weight:800; font-size:28px; color:#fff; line-height:1; }
  .pr-stat-label { font-size:11px; color:rgba(255,255,255,.4); margin-top:5px; letter-spacing:.4px; text-transform:uppercase; }
  .pr-stat-icon { font-size:20px; margin-bottom:6px; }

  /* ── MAIN CONTENT ── */
  .pr-content {
    position: relative; z-index: 1;
    max-width: 900px; margin: 0 auto;
    padding: 36px 20px 60px;
  }

  .pr-section-title {
    font-family:'Syne',sans-serif; font-weight:700; font-size:17px;
    color:#fff; margin-bottom:16px;
    display:flex; align-items:center; gap:8px;
  }

  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
    gap: 16px; margin-bottom: 36px;
  }
  .course-card {
    border-radius: 14px; overflow: hidden;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.08);
    cursor: pointer; transition: all .25s ease; position: relative;
  }
  .course-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(0,0,0,.4),0 0 0 1px rgba(153,3,125,.2); }
  .course-thumb { width:100%; height:130px; object-fit:cover; display:block; background:linear-gradient(135deg,#2a001f,#4C003E); }
  .course-info { padding:12px 14px 14px; }
  .course-title { font-weight:600; font-size:13px; color:#fff; line-height:1.4; margin-bottom:4px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
  .course-lecturer { font-size:11px; color:rgba(255,255,255,.4); margin-bottom:8px; }
  .progress-bar-wrap { height:4px; border-radius:99px; background:rgba(255,255,255,.1); overflow:hidden; }
  .progress-bar-fill { height:100%; border-radius:99px; background:linear-gradient(90deg,#99037d,#cc05a0); transition:width .6s ease; }
  .progress-label { font-size:10px; color:rgba(255,255,255,.35); margin-top:4px; text-align:right; }

  .empty-state {
    text-align:center; padding:36px 20px;
    border-radius:16px;
    background:rgba(255,255,255,.03);
    border:1px dashed rgba(255,255,255,.1);
    margin-bottom:32px;
  }
  .empty-icon { font-size:36px; margin-bottom:10px; }
  .empty-text { font-size:13px; color:rgba(255,255,255,.35); }

  .cert-list { display:flex; flex-direction:column; gap:10px; margin-bottom:36px; }
  .cert-item {
    display:flex; align-items:center; justify-content:space-between; gap:12px;
    padding:14px 18px; border-radius:14px;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);
    transition:all .2s; flex-wrap:wrap;
  }
  .cert-item:hover { background:rgba(153,3,125,.08); border-color:rgba(153,3,125,.2); }
  .cert-icon { font-size:22px; flex-shrink:0; }
  .cert-title { flex:1; font-size:14px; font-weight:600; color:#fff; min-width:120px; }
  .cert-badge { padding:3px 9px; border-radius:99px; background:rgba(68,238,136,.1); border:1px solid rgba(68,238,136,.25); color:#44ee88; font-size:10px; font-weight:600; letter-spacing:.3px; }
  .download-btn {
    display:flex; align-items:center; gap:6px;
    padding:7px 14px; border-radius:9px;
    background:rgba(153,3,125,.15); border:1px solid rgba(153,3,125,.3);
    color:#e060c8; font-size:12px; font-weight:600; cursor:pointer; transition:all .2s;
  }
  .download-btn:hover { background:rgba(153,3,125,.28); color:#ff88e0; transform:translateY(-1px); }

  /* ── FOOTER ── */
  .pr-footer {
    position:relative; z-index:1;
    background:rgba(0,0,0,.3);
    border-top:1px solid rgba(255,255,255,.06);
    padding:40px 32px 24px;
  }
  .pr-footer-grid {
    max-width:900px; margin:0 auto;
    display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
    gap:28px; margin-bottom:28px;
  }
  .pr-footer-col h3 { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; color:#fff; margin-bottom:8px; }
  .pr-footer-col h4 { font-family:'Syne',sans-serif; font-weight:600; font-size:13px; color:rgba(255,255,255,.6); margin-bottom:8px; }
  .pr-footer-col p, .pr-footer-col a { font-size:12px; color:rgba(255,255,255,.35); text-decoration:none; display:block; margin-bottom:4px; transition:color .2s; }
  .pr-footer-col a:hover { color:rgba(255,255,255,.7); }
  .pr-footer-bottom { max-width:900px; margin:0 auto; padding-top:20px; border-top:1px solid rgba(255,255,255,.06); font-size:12px; color:rgba(255,255,255,.25); text-align:center; }

  /* Shimmer */
  .shimmer {
    border-radius:10px;
    background:linear-gradient(90deg,rgba(255,255,255,.05) 0%,rgba(255,255,255,.1) 50%,rgba(255,255,255,.05) 100%);
    background-size:200% 100%;
    animation:shimmerAnim 1.5s infinite;
  }
  @keyframes shimmerAnim { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

  /* ── RESPONSIVE ── */
  @media(max-width:768px){
    .pr-navbar { padding: 0 16px; }
    .pr-nav-links { display: none; }
    .logout-btn { display: none; }
    .hamburger { display: flex; }
    .pr-hero { padding: 28px 16px 84px; }
    .pr-hero-name { font-size: 20px; }
    .pr-content { padding: 28px 16px 48px; }
    .pr-footer { padding: 28px 16px 20px; }
    .pr-stats-strip { padding: 0 16px; }
  }

  @media(min-width:769px){
    .hamburger { display: none !important; }
    .mobile-menu { display: none !important; }
  }
`;

const BASE_URL = "http://127.0.0.1:5000";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }

    fetch(`${BASE_URL}/api/profile/${user.id}`)
      .then(r => r.json()).then(d => setProfile(d))
      .catch(e => console.error(e));

    fetch(`${BASE_URL}/api/my-courses/${user.id}`)
      .then(r => r.json()).then(data => {
        setMyCourses(data);
        setInProgress(data.filter(c => c.completed === 0));
        setCompleted(data.filter(c => c.completed === 1));
      }).catch(e => console.error(e));
  }, [navigate, user]);

  const handleLogout = () => { localStorage.removeItem("user"); navigate("/"); };

  const initials = profile?.name
    ? profile.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  const avatarSrc = profile?.profile_image
    ? (profile.profile_image.startsWith("http") ? profile.profile_image : BASE_URL + profile.profile_image)
    : null;

  return (
    <>
      <style>{styles}</style>
      <div className="pr-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* ── NAVBAR ── */}
        <nav className="pr-navbar">
          {/* Brand — LEFT */}
          <Link to="/home" className="pr-nav-brand">
            <div className="pr-nav-logo"><img src={logo} alt="EDU-TECH Logo" className="logo-image" /></div>
            <div>
              <div className="pr-nav-brand-text">EDU-TECH</div>
              <div className="pr-nav-brand-sub">E-Learning Platform</div>
            </div>
          </Link>

          {/* Everything on the RIGHT */}
          <div className="pr-nav-right">
            {/* Desktop links */}
            <div className="pr-nav-links">
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile" className="active">My Profile</Link>
            </div>

            {/* Logout — desktop */}
            <button className="logout-btn" onClick={handleLogout}>
              <span>⏻</span> Logout
            </button>

            {/* Hamburger — mobile only */}
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/home" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to="/my-courses" onClick={() => setMenuOpen(false)}>📚 My Courses</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>❤️ Wishlist</Link>
          <Link to="/profile" className="active" onClick={() => setMenuOpen(false)}>👤 My Profile</Link>
          <div className="mobile-menu-divider" />
          <div className="mobile-actions">
            <button className="logout-btn" style={{ flex: 1, justifyContent: "center" }} onClick={handleLogout}>
              ⏻ Logout
            </button>
          </div>
        </div>

        {/* ── HERO — sits directly under navbar, no gap ── */}
        <div className="pr-hero">
          <div className="pr-hero-inner">
            <div className="pr-avatar-wrap">
              <div className="pr-avatar">
                {avatarSrc
                  ? <img src={avatarSrc} alt="avatar" onError={e => e.target.style.display = "none"} />
                  : initials}
              </div>
              <div className="pr-avatar-online">✓</div>
            </div>

            <div className="pr-hero-info">
              {!profile ? (
                <>
                  <div className="shimmer" style={{ width: 180, height: 28, marginBottom: 8 }} />
                  <div className="shimmer" style={{ width: 140, height: 16, marginBottom: 12 }} />
                  <div className="shimmer" style={{ width: 260, height: 14 }} />
                </>
              ) : (
                <>
                  <div className="pr-hero-name">{profile.name}</div>
                  <div className="pr-hero-email">{profile.email}</div>
                  <div className="pr-hero-bio">{profile.about || "No bio added yet. Click Edit to add one!"}</div>
                  <div className="pr-hero-tags">
                    <span className="pr-tag pink">✦ Student</span>
                    <span className="pr-tag">🎓 EDU-TECH</span>
                    {completed.length > 0 && <span className="pr-tag">🏆 {completed.length} Certified</span>}
                  </div>
                </>
              )}
            </div>

            <button className="edit-btn" onClick={() => navigate("/edit-profile")}>
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div className="pr-stats-strip">
          <div className="pr-stats-card">
            <div className="pr-stat-item">
              <div className="pr-stat-icon">📚</div>
              <div className="pr-stat-num">{myCourses.length}</div>
              <div className="pr-stat-label">Total Enrolled</div>
            </div>
            <div className="pr-stat-item">
              <div className="pr-stat-icon">⚡</div>
              <div className="pr-stat-num">{inProgress.length}</div>
              <div className="pr-stat-label">In Progress</div>
            </div>
            <div className="pr-stat-item">
              <div className="pr-stat-icon">🏆</div>
              <div className="pr-stat-num">{completed.length}</div>
              <div className="pr-stat-label">Certificates</div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="pr-content">
          <div className="pr-section-title">
            <span>⚡</span> Courses in Progress
            {inProgress.length > 0 && (
              <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,.35)", marginLeft: 4 }}>
                ({inProgress.length})
              </span>
            )}
          </div>

          {!profile ? (
            <div className="course-grid">
              {[1,2,3].map(i => (
                <div key={i} className="course-card">
                  <div className="shimmer" style={{ height: 130 }} />
                  <div style={{ padding: "12px 14px" }}>
                    <div className="shimmer" style={{ height: 14, marginBottom: 8 }} />
                    <div className="shimmer" style={{ height: 10, width: "60%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : inProgress.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📖</div>
              <div className="empty-text">No courses in progress. Start learning today!</div>
            </div>
          ) : (
            <div className="course-grid">
              {inProgress.map(course => (
                <div key={course.id} className="course-card" onClick={() => navigate(`/course/${course.id}`)}>
                  <img src={course.image} alt={course.title} className="course-thumb"
                    onError={e => { e.target.style.display = "none"; }} />
                  <div className="course-info">
                    <div className="course-title">{course.title}</div>
                    <div className="course-lecturer">👤 {course.lecturer}</div>
                    <div className="progress-bar-wrap">
                      <div className="progress-bar-fill" style={{ width: `${course.progress || 0}%` }} />
                    </div>
                    <div className="progress-label">{course.progress || 0}% complete</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pr-section-title">
            <span>🏆</span> Certificates
            {completed.length > 0 && (
              <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,.35)", marginLeft: 4 }}>
                ({completed.length})
              </span>
            )}
          </div>

          {!profile ? (
            <div className="cert-list">
              {[1,2].map(i => <div key={i} className="shimmer" style={{ height: 56 }} />)}
            </div>
          ) : completed.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎓</div>
              <div className="empty-text">Complete a course to earn your first certificate!</div>
            </div>
          ) : (
            <div className="cert-list">
              {completed.map(course => (
                <div key={course.id} className="cert-item">
                  <span className="cert-icon">🎓</span>
                  <span className="cert-title">{course.title}</span>
                  <span className="cert-badge">COMPLETED</span>
                  <button
                    className="download-btn"
                    onClick={() => window.open(`${BASE_URL}/api/certificate/${user.id}/${course.id}`, "_blank")}
                  >
                    ⬇ Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <footer className="pr-footer">
          <div className="pr-footer-grid">
            <div className="pr-footer-col">
              <h3>EDU-TECH</h3>
              <p>An E-Learning Platform to upgrade your skills.</p>
            </div>
            <div className="pr-footer-col">
              <h4>Quick Links</h4>
              <Link to="/home">Home</Link>
              <Link to="/my-courses">My Courses</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/profile">Profile</Link>
            </div>
            <div className="pr-footer-col">
              <h4>Support</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/help">Help Center</Link>
            </div>
            <div className="pr-footer-col">
              <h4>Contact</h4>
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@edutech.com</p>
            </div>
          </div>
          <div className="pr-footer-bottom">© 2026 EDU-TECH. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}