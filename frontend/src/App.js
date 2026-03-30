import React, { useState, useEffect } from "react";
import logo from "./asset/logow.png";
import { Link, useNavigate } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AdminUsers from "./pages/AdminUsers";
import CourseCard from "./components/CourseCard";
import AdminAddCourse from "./pages/AdminAddCourse";
import AdminLogin from "./pages/AdminLogin";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import CourseDetails from "./pages/CourseDetails";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Wishlist from "./pages/Wishlist";
import MyCourses from "./pages/MyCourses";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import HelpCenter from "./pages/HelpCenter";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/Contact";
import About from "./pages/About";

import { Navigate } from "react-router-dom";

import API from "./api";
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const admin = JSON.parse(localStorage.getItem("admin") || sessionStorage.getItem("admin") || "null");

  if (!token) {
    return <Navigate to={adminOnly ? "/admin" : "/login"} />;
  }

  if (adminOnly && !admin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

function AdminPanel() {
  const navigate = useNavigate();
  const [courses, setCourses]         = useState([]);
  const [search, setSearch]           = useState("");
  const [activeTab, setActiveTab]     = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [loading, setLoading]         = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/api/courses`)
      .then(res => res.json())
      .then(data => { setCourses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const addCourse = async (course) => {
  try {
    // ✅ GET TOKEN FIRST
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Not authenticated. Please login again.");
      return;
    }

    const resAdd = await fetch(`${API}/api/admin/add-course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // ✅ now correct
      },
      body: JSON.stringify(course),
    });

    const addData = await resAdd.json();

    if (!resAdd.ok) {
      alert(addData.msg || addData.message || "Failed to add course");
      return;
    }

    const res = await fetch(`${API}/api/courses`);
    const data = await res.json();
    setCourses(data);
    setActiveTab("dashboard");

  } catch (err) {
    console.error(err);
    alert("Cannot connect to backend. Is Flask running?");
  }
};

  const deleteCourse = async (id) => {

  if (!token) {
    alert("Not authenticated. Please login again.");
    return;
  }

  const resDel = await fetch(`${API}/api/admin/course/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!resDel.ok) {
    alert("Delete failed");
    return;
  }

  const res = await fetch(`${API}/api/courses`);
  const data = await res.json();
  setCourses(data);
};

  const handleLogout = () => { localStorage.removeItem("user"); navigate("/"); };

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.lecturer?.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  );

  const byCategory = (cat) => filtered.filter(c => c.category === cat);
  const sections = [
    { key: "Trending", icon: "🔥" },
    { key: "Coding",   icon: "💻" },
    { key: "AI",       icon: "🤖" },
    { key: "Design",   icon: "🎨" },
  ];
  const totalCourses = courses.length;

  const navItems = [
    { key: "dashboard", icon: "📊", label: "Dashboard" },
    { key: "add",       icon: "➕", label: "Add Course" },
    { key: "courses",   icon: "📚", label: "All Courses" },
    { key: "users",     icon: "👥", label: "Users", link: "/admin/users" },
  ];

  // Shared sidebar nav — used in both desktop & mobile
  const SidebarNav = ({ onItemClick }) => (
    <>
      <nav className="adm-sidenav">
        {navItems.map(item =>
          item.link ? (
            <Link key={item.key} to={item.link} className="adm-nav-item" onClick={onItemClick}>
              <span className="adm-nav-icon">{item.icon}</span>
              <span className="adm-nav-label">{item.label}</span>
            </Link>
          ) : (
            <button
              key={item.key}
              className={`adm-nav-item ${activeTab === item.key ? "active" : ""}`}
              onClick={() => { setActiveTab(item.key); onItemClick && onItemClick(); }}
            >
              <span className="adm-nav-icon">{item.icon}</span>
              <span className="adm-nav-label">{item.label}</span>
            </button>
          )
        )}
      </nav>
      <div className="adm-sidebar-footer">
        <div className="adm-sidebar-stat">
          <span className="adm-ss-num">{totalCourses}</span>
          <span className="adm-ss-lbl">Total Courses</span>
        </div>
        <div className="adm-sidebar-stat">
          <span className="adm-ss-num">{sections.filter(s => byCategory(s.key).length > 0).length}</span>
          <span className="adm-ss-lbl">Categories</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        /*
          KEY FIX:
          - html/body take full viewport
          - .adm-shell = full viewport flex column
          - .adm-body  = fills remaining height, overflow hidden
          - .adm-main  = only this element scrolls (overflow-y: auto)
          - Desktop sidebar = full height, its own scroll if needed (never breaks)
          - Mobile sidebar = fixed overlay drawer (independent of page scroll)
        */

        html, body { height:100%; margin:0; padding:0; overflow:hidden; }
        #root       { height:100%; }

        .adm-shell {
          height: 100vh;
          display: flex; flex-direction: column;
          background: #1a0018;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          overflow: hidden;
        }

        /* ── TOPBAR ── always visible at top, never scrolls */
        .adm-topbar {
          height: 62px; flex-shrink: 0;
          display: flex; align-items: center; gap:12px;
          padding: 0 24px;
          background: rgba(26,0,24,0.96);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,.08);
          z-index: 300;
        }
        .adm-topbar-left { display:flex; align-items:center; gap:12px; flex-shrink:0; }

        .adm-menu-btn {
          display:flex; flex-direction:column; justify-content:center; align-items:center; gap:5px;
          width:36px; height:36px; border-radius:9px;
          border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05);
          cursor:pointer; padding:0; flex-shrink:0; transition:all .2s;
        }
        .adm-menu-btn span { display:block; width:16px; height:2px; background:rgba(255,255,255,.7); border-radius:99px; }
        .adm-menu-btn:hover { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); }

        .adm-brand { display:flex; align-items:center; gap:10px; }
        .adm-brand-logo { width:34px; height:34px; border-radius:9px; overflow:hidden; background:linear-gradient(135deg,#99037d,#4C003E); flex-shrink:0; }
        .adm-brand-logo img { width:100%; height:100%; object-fit:cover; }
        .adm-brand-name { font-family:'Syne',sans-serif; font-weight:800; font-size:16px; color:#fff; letter-spacing:-.3px; }
        .adm-brand-sub  { font-size:10px; color:rgba(255,160,230,.5); letter-spacing:.5px; }

        .adm-topbar-search {
          flex:1; max-width:420px; margin:0 auto;
          position:relative; display:flex; align-items:center;
        }
        .adm-search-icon { position:absolute; left:12px; font-size:13px; pointer-events:none; }
        .adm-search-input {
          width:100%; padding:9px 34px;
          background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1);
          border-radius:11px; color:#fff;
          font-family:'DM Sans',sans-serif; font-size:13px; outline:none; transition:all .2s;
        }
        .adm-search-input::placeholder { color:rgba(255,255,255,.25); }
        .adm-search-input:focus { background:rgba(255,255,255,.1); border-color:rgba(153,3,125,.55); box-shadow:0 0 0 3px rgba(153,3,125,.12); }
        .adm-search-clear { position:absolute; right:10px; background:none; border:none; color:rgba(255,255,255,.4); cursor:pointer; font-size:13px; }

        .adm-topbar-right { display:flex; align-items:center; gap:10px; margin-left:auto; flex-shrink:0; }
        .adm-admin-tag {
          padding:6px 12px; border-radius:99px; font-size:12px; font-weight:600;
          background:rgba(153,3,125,.15); border:1px solid rgba(153,3,125,.25); color:#e060c8; white-space:nowrap;
        }
        .adm-logout-btn {
          display:flex; align-items:center; gap:6px; padding:8px 14px; border-radius:9px;
          border:1px solid rgba(255,100,100,.25); background:rgba(255,60,60,.08);
          color:rgba(255,120,120,.85); font-size:12px; font-weight:500; cursor:pointer; transition:all .2s;
        }
        .adm-logout-btn:hover { background:rgba(255,60,60,.16); color:#ff8888; }

        /* ── BODY: fills remainder, no overflow ── */
        .adm-body { flex:1; display:flex; overflow:hidden; position:relative; }

        /* ── DESKTOP SIDEBAR ── */
        .adm-sidebar-desktop {
          flex-shrink: 0;
          height: 100%;               /* fills full body height */
          overflow-y: auto;           /* sidebar scrolls independently if content overflows */
          display: flex; flex-direction:column; justify-content:space-between;
          background: rgba(255,255,255,.03);
          border-right: 1px solid rgba(255,255,255,.07);
          transition: width .25s ease;
        }
        .adm-sidebar-desktop.open      { width: 210px; }
        .adm-sidebar-desktop.collapsed { width: 60px; }
        .adm-sidebar-desktop.collapsed .adm-nav-label    { display:none; }
        .adm-sidebar-desktop.collapsed .adm-sidebar-footer { display:none; }
        .adm-sidebar-desktop.collapsed .adm-nav-item    { justify-content:center; padding:12px 0; }

        /* ── MOBILE OVERLAY DRAWER ── */
        .adm-mob-overlay {
          display: none;
          position: fixed; inset:0; z-index:500;
        }
        .adm-mob-overlay.open { display:flex; }
        .adm-mob-backdrop {
          position:absolute; inset:0;
          background:rgba(0,0,0,.65); backdrop-filter:blur(3px);
        }
        .adm-mob-drawer {
          position:relative; z-index:1;
          width: 240px; height:100%;
          background: #1d0020;
          border-right: 1px solid rgba(255,255,255,.1);
          display:flex; flex-direction:column; justify-content:space-between;
          overflow-y: auto;
          animation: drawerSlide .22s ease;
        }
        @keyframes drawerSlide { from{transform:translateX(-100%)} to{transform:translateX(0)} }

        /* ── SHARED NAV ── */
        .adm-sidenav { display:flex; flex-direction:column; gap:4px; padding:16px 8px; }
        .adm-nav-item {
          display:flex; align-items:center; gap:12px;
          padding:11px 14px; border-radius:11px;
          font-size:13px; font-weight:500; color:rgba(255,255,255,.5);
          background:none; border:1px solid transparent; cursor:pointer;
          text-decoration:none; transition:all .2s;
          white-space:nowrap; width:100%; text-align:left;
        }
        .adm-nav-item:hover  { background:rgba(255,255,255,.07); color:#fff; }
        .adm-nav-item.active { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.3); color:#e060c8; }
        .adm-nav-icon  { font-size:18px; flex-shrink:0; }
        .adm-nav-label { white-space:nowrap; }

        .adm-sidebar-footer { padding:16px 12px; border-top:1px solid rgba(255,255,255,.06); display:flex; flex-direction:column; gap:10px; }
        .adm-sidebar-stat   { display:flex; flex-direction:column; }
        .adm-ss-num { font-family:'Syne',sans-serif; font-weight:800; font-size:20px; color:#fff; line-height:1; }
        .adm-ss-lbl { font-size:10px; color:rgba(255,255,255,.38); text-transform:uppercase; letter-spacing:.4px; margin-top:2px; }

        /* ── MAIN: only this scrolls ── */
        .adm-main {
          flex:1;
          min-width:0;     /* critical: lets flex child shrink below content size */
          width:0;         /* forces browser to recalculate width from flex, not content */
          height:100%;
          overflow-y:auto;
          overflow-x:hidden;
          padding:28px 24px 60px;
        }

        /* Stats */
        .adm-stats-row { display:grid; grid-template-columns:repeat(auto-fill,minmax(155px,1fr)); gap:14px; margin-bottom:32px; }
        .adm-stat-card {
          padding:20px 18px; border-radius:16px;
          background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08);
          transition:all .25s; position:relative; overflow:hidden; cursor:default;
        }
        .adm-stat-card::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%);
          pointer-events:none;
        }
        .adm-stat-card:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,.4); border-color:rgba(255,255,255,.14); }
        .adm-stat-icon  { font-size:24px; margin-bottom:10px; }
        .adm-stat-num   { font-family:'Syne',sans-serif; font-weight:800; font-size:30px; color:#fff; line-height:1; margin-bottom:4px; }
        .adm-stat-label { font-size:11px; color:rgba(255,255,255,.4); text-transform:uppercase; letter-spacing:.4px; }

        .adm-search-notice {
          display:flex; align-items:center; gap:10px;
          padding:10px 16px; border-radius:10px; margin-bottom:20px;
          background:rgba(153,3,125,.1); border:1px solid rgba(153,3,125,.2);
          font-size:13px; color:rgba(255,255,255,.7);
        }
        .adm-search-notice strong { color:#e060c8; }
        .adm-search-notice button { margin-left:auto; background:none; border:none; color:#e060c8; cursor:pointer; font-size:12px; font-weight:600; }

        .adm-section { margin-bottom:36px; }
        .adm-section-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
        .adm-section-title {
          font-family:'Syne',sans-serif; font-weight:700; font-size:17px;
          color:#fff; display:flex; align-items:center; gap:8px;
        }
        .adm-section-count {
          font-size:11px; font-weight:600; padding:3px 9px; border-radius:99px;
          background:rgba(153,3,125,.2); color:#e060c8; border:1px solid rgba(153,3,125,.28);
        }
        .adm-add-quick {
          padding:6px 14px; border-radius:8px; font-size:12px; font-weight:600;
          background:rgba(153,3,125,.15); border:1px solid rgba(153,3,125,.3);
          color:#e060c8; cursor:pointer; transition:all .2s;
        }
        .adm-add-quick:hover { background:rgba(153,3,125,.28); color:#fff; }


        .adm-grid { display:grid; gap:20px; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); }


        .adm-empty-cat {
          padding:32px; text-align:center; border-radius:12px;
          background:rgba(255,255,255,.03); border:1px dashed rgba(255,255,255,.08);
          font-size:13px; color:rgba(255,255,255,.3);
        }
        .adm-tab-wrap { width:100%; }

        /* Shimmer */
        .adm-shimmer-card { border-radius:14px; overflow:hidden; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.06); }
        .adm-shimmer {
          background:linear-gradient(90deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.11) 50%,rgba(255,255,255,.04) 100%);
          background-size:200% 100%; animation:admShim 1.5s infinite;
        }
        @keyframes admShim { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .adm-sh-img   { height:140px; }
        .adm-sh-line  { height:13px; border-radius:6px; margin-bottom:8px; }
        .adm-sh-short { height:10px; width:55%; border-radius:6px; }

        /* Mobile search icon button — hidden on desktop */
        .adm-mob-search-btn { display:none; }
        /* Mobile search dropdown — hidden by default */
        .adm-mob-searchbar {
          display: none;
          align-items: center; position: relative;
          padding: 10px 14px;
          background: rgba(26,0,24,0.96);
          border-bottom: 1px solid rgba(255,255,255,.08);
          flex-shrink: 0;
        }
        .adm-mob-searchbar.open { display:flex; }
        .adm-mob-searchbar .adm-search-icon { position:absolute; left:26px; font-size:13px; pointer-events:none; }
        .adm-mob-searchbar .adm-search-input { width:100%; padding:9px 34px; background:rgba(255,255,255,.09); border:1px solid rgba(255,255,255,.12); border-radius:11px; color:#fff; font-family:'DM Sans',sans-serif; font-size:13px; outline:none; }
        .adm-mob-searchbar .adm-search-input:focus { border-color:rgba(153,3,125,.55); box-shadow:0 0 0 3px rgba(153,3,125,.12); }
        .adm-mob-searchbar .adm-search-clear { position:absolute; right:22px; background:none; border:none; color:rgba(255,255,255,.4); cursor:pointer; font-size:13px; }
        @media (min-width:1400px) { .adm-grid { grid-template-columns:repeat(5,1fr); } }
        @media (min-width:1100px) and (max-width:1399px) { .adm-grid { grid-template-columns:repeat(5,1fr); } }
        @media (min-width:769px) and (max-width:1099px) { .adm-grid { grid-template-columns:repeat(3,1fr); } }
        @media (min-width:769px) {
          /* Desktop: show desktop sidebar, never show mobile overlay */
          .adm-mob-overlay { display:none !important; }
        }
        @media (max-width:768px) {
          /* Mobile: hide desktop sidebar, use overlay drawer instead */
          .adm-sidebar-desktop { display:none !important; }
          .adm-topbar { padding:0 14px; }
          .adm-topbar-search { display:none; }
          .adm-mob-search-btn {
            display:flex; align-items:center; justify-content:center;
            width:36px; height:36px; border-radius:9px;
            border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05);
            font-size:16px; cursor:pointer; transition:all .2s; flex-shrink:0;
          }
          .adm-mob-search-btn:hover { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); }
          .adm-admin-tag { display:none; }
          .adm-main { padding:18px 14px 48px; }
          .adm-stats-row { grid-template-columns:repeat(2,1fr); gap:10px; }
          .adm-stat-num { font-size:22px; }
          .adm-grid { grid-template-columns:repeat(1,1fr); gap:12px; }
        }
      `}</style>

      <div className="adm-shell">

        {/* ── TOPBAR ── */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button className="adm-menu-btn" onClick={() => setSidebarOpen(v => !v)}>
              <span /><span /><span />
            </button>
            <div className="adm-brand">
              <div className="adm-brand-logo"><img src={logo} alt="EDU-TECH Logo" className="logo-image" /></div>
              <div>
                <div className="adm-brand-name">EDU-TECH</div>
                <div className="adm-brand-sub">Admin Panel</div>
              </div>
            </div>
          </div>

          <div className="adm-topbar-search">
            <span className="adm-search-icon">🔍</span>
            <input
              className="adm-search-input"
              placeholder="Search courses, lecturers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="adm-search-clear" onClick={() => setSearch("")}>✕</button>}
          </div>

          <div className="adm-topbar-right">
            <button className="adm-mob-search-btn" onClick={() => setSearchOpen(v => !v)}>🔍</button>
            <div className="adm-admin-tag">👤 Admin</div>
            <button className="adm-logout-btn" onClick={handleLogout}>⏻ Logout</button>
          </div>
        </header>

        <div className={`adm-mob-searchbar ${searchOpen ? "open" : ""}`}>
          <span className="adm-search-icon">🔍</span>
          <input
            className="adm-search-input"
            placeholder="Search courses, lecturers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus={searchOpen}
          />
          {search && <button className="adm-search-clear" onClick={() => setSearch("")}>✕</button>}
        </div>

        <div className={`adm-body ${sidebarOpen ? "sidebar-open" : ""}`}>

          {/* DESKTOP SIDEBAR — stays fixed height, never goes anywhere */}
          <aside className={`adm-sidebar-desktop ${sidebarOpen ? "open" : "collapsed"}`}>
            <SidebarNav />
          </aside>

          {/* MOBILE OVERLAY DRAWER */}
          <div className={`adm-mob-overlay ${sidebarOpen ? "open" : ""}`}>
            <div className="adm-mob-backdrop" onClick={() => setSidebarOpen(false)} />
            <div className="adm-mob-drawer">
              <SidebarNav onItemClick={() => setSidebarOpen(false)} />
            </div>
          </div>

          {/* MAIN — the ONLY thing that scrolls */}
          <main className="adm-main">

            {activeTab === "dashboard" && (
              <>
                <div className="adm-stats-row">
                  {[
                    { icon:"📚", num:totalCourses,                 label:"Total Courses", color:"#99037d" },
                    { icon:"🔥", num:byCategory("Trending").length, label:"Trending",      color:"#e05a00" },
                    { icon:"💻", num:byCategory("Coding").length,   label:"Coding",        color:"#0066cc" },
                    { icon:"🤖", num:byCategory("AI").length,       label:"AI",            color:"#006644" },
                  ].map((s, i) => (
                    <div key={i} className="adm-stat-card" style={{ "--accent": s.color }}>
                      <div className="adm-stat-icon">{s.icon}</div>
                      <div className="adm-stat-num">{s.num}</div>
                      <div className="adm-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>

                {search && (
                  <div className="adm-search-notice">
                    🔍 {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "<strong>{search}</strong>"
                    <button onClick={() => setSearch("")}>Clear</button>
                  </div>
                )}

                {sections.map(({ key, icon }) => {
                  const data = byCategory(key);
                  if (data.length === 0 && !search) return null;
                  return (
                    <div key={key} className="adm-section">
                      <div className="adm-section-header">
                        <div className="adm-section-title">
                          {icon} {key} <span className="adm-section-count">{data.length}</span>
                        </div>
                        <button className="adm-add-quick" onClick={() => setActiveTab("add")}>+ Add</button>
                      </div>
                      {loading ? (
                        <div className="adm-grid">
                          {[1,2,3].map(i => (
                            <div key={i} className="adm-shimmer-card">
                              <div className="adm-shimmer adm-sh-img" />
                              <div style={{ padding:"12px" }}>
                                <div className="adm-shimmer adm-sh-line" />
                                <div className="adm-shimmer adm-sh-short" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : data.length === 0 ? (
                        <div className="adm-empty-cat">No {key} courses found</div>
                      ) : (
                        <div className="adm-grid">
                          {data.map(course => (
                            <CourseCard key={course.id} course={course} onDelete={deleteCourse} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}

            {activeTab === "add" && (
              <div className="adm-tab-wrap">
                <AdminAddCourse onAdd={addCourse} />
              </div>
            )}

            {activeTab === "courses" && (
              <div className="adm-tab-wrap">
                <div className="adm-section-title" style={{ marginBottom:20 }}>
                  📚 All Courses <span className="adm-section-count">{filtered.length}</span>
                </div>
                {search && (
                  <div className="adm-search-notice">
                    🔍 {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "<strong>{search}</strong>"
                    <button onClick={() => setSearch("")}>Clear</button>
                  </div>
                )}
                <div className="adm-grid">
                  {filtered.map(course => (
                    <CourseCard key={course.id} course={course} onDelete={deleteCourse} />
                  ))}
                </div>
                {filtered.length === 0 && <div className="adm-empty-cat">No courses found.</div>}
              </div>
            )}

          </main>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        {/* Private User Routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/my-courses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
        




      </Routes>
    </Router>
  );
}

export default App;
