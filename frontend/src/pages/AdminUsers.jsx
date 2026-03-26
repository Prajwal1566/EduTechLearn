import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:5000";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers]       = useState([]);
  const [search, setSearch]     = useState("");
  const [loading, setLoading]   = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // for confirm modal

  // ── same logic as original ──
  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/admin/users`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(err => { console.error("Error loading users", err); setLoading(false); });
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`${BASE_URL}/api/admin/delete-user/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    fetchUsers();
    setDeleteId(null);
  };

  const handleLogout = () => { localStorage.removeItem("user"); navigate("/"); };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    String(u.id).includes(search)
  );

  const navItems = [
    { label: "📊 Dashboard", to: "/admin-panel" },
    { label: "👥 Users",     to: "/admin/users", active: true },
  ];

  return (
    <div className="au-shell">

      {/* ── TOPBAR ── */}
      <header className="au-topbar">
        <div className="au-topbar-left">
          <button className="au-menu-btn" onClick={() => setSidebarOpen(v => !v)}>
            <span /><span /><span />
          </button>
          <div className="au-brand">
            <div className="au-brand-logo"><img src="/logow.png" alt="logo" /></div>
            <div>
              <div className="au-brand-name">EDU-TECH</div>
              <div className="au-brand-sub">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="au-topbar-search">
          <span className="au-search-icon">🔍</span>
          <input
            className="au-search-input"
            placeholder="Search by name, email or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="au-search-clear" onClick={() => setSearch("")}>✕</button>}
        </div>

        <div className="au-topbar-right">
          <div className="au-admin-tag">👤 Admin</div>
          <button className="au-logout-btn" onClick={handleLogout}>⏻ Logout</button>
        </div>
      </header>

      <div className="au-body">

        {/* ── DESKTOP SIDEBAR ── */}
        <aside className={`au-sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
          <nav className="au-sidenav">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`au-nav-item ${item.active ? "active" : ""}`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          {sidebarOpen && (
            <div className="au-sidebar-footer">
              <div className="au-sidebar-stat">
                <span className="au-ss-num">{users.length}</span>
                <span className="au-ss-lbl">Total Users</span>
              </div>
            </div>
          )}
        </aside>

        {/* ── MOBILE OVERLAY ── */}
        <div className={`au-mob-overlay ${sidebarOpen ? "open" : ""}`}>
          <div className="au-mob-backdrop" onClick={() => setSidebarOpen(false)} />
          <div className="au-mob-drawer">
            <nav className="au-sidenav">
              {navItems.map(item => (
                <Link key={item.to} to={item.to}
                  className={`au-nav-item ${item.active ? "active" : ""}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="au-sidebar-footer">
              <div className="au-sidebar-stat">
                <span className="au-ss-num">{users.length}</span>
                <span className="au-ss-lbl">Total Users</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <main className="au-main">

          {/* Page header */}
          <div className="au-page-header">
            <div className="au-page-left">
              <div className="au-page-icon">👥</div>
              <div>
                <h1 className="au-page-title">User Management</h1>
                <p className="au-page-sub">View and manage all registered users</p>
              </div>
            </div>
            <div className="au-user-count-badge">
              👥 {filtered.length} User{filtered.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Table card */}
          <div className="au-table-card">
            {loading ? (
              <div className="au-shimmer-wrap">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="au-shimmer-row">
                    <div className="au-shimmer au-sh-sm" />
                    <div className="au-shimmer au-sh-md" />
                    <div className="au-shimmer au-sh-lg" />
                    <div className="au-shimmer au-sh-sm" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="au-empty">
                <div className="au-empty-icon">🔍</div>
                <p className="au-empty-title">{search ? `No users matching "${search}"` : "No users found"}</p>
              </div>
            ) : (
              <div className="au-table-wrap">
                <table className="au-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th style={{ textAlign:"center" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((user, i) => (
                      <tr key={user.id} className="au-row" style={{ animationDelay: `${i * 0.04}s` }}>
                        <td><span className="au-id-badge">#{user.id}</span></td>
                        <td>
                          <div className="au-user-cell">
                            <div className="au-avatar">{user.name?.[0]?.toUpperCase() || "?"}</div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td><span className="au-email">{user.email}</span></td>
                        <td style={{ textAlign:"center" }}>
                          <button
                            className="au-delete-btn"
                            onClick={() => setDeleteId(user.id)}
                          >
                            🗑 Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteId && (
        <div className="au-modal-overlay">
          <div className="au-modal">
            <div className="au-modal-icon">⚠️</div>
            <h3 className="au-modal-title">Delete User?</h3>
            <p className="au-modal-text">This action cannot be undone. The user will be permanently removed.</p>
            <div className="au-modal-actions">
              <button className="au-modal-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="au-modal-confirm" onClick={() => handleDelete(deleteId)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        html, body { height:100%; overflow:hidden; }
        #root { height:100%; }

        .au-shell {
          height:100vh; display:flex; flex-direction:column;
          background:#1a0018; font-family:'DM Sans',sans-serif;
          color:#fff; overflow:hidden;
        }

        /* ── TOPBAR ── */
        .au-topbar {
          height:62px; flex-shrink:0;
          display:flex; align-items:center; gap:12px; padding:0 24px;
          background:rgba(26,0,24,0.96); backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(255,255,255,.08); z-index:300;
        }
        .au-topbar-left { display:flex; align-items:center; gap:12px; flex-shrink:0; }

        .au-menu-btn {
          display:flex; flex-direction:column; justify-content:center; align-items:center; gap:5px;
          width:36px; height:36px; border-radius:9px;
          border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.05);
          cursor:pointer; padding:0; flex-shrink:0; transition:all .2s;
        }
        .au-menu-btn span { display:block; width:16px; height:2px; background:rgba(255,255,255,.7); border-radius:99px; }
        .au-menu-btn:hover { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.4); }

        .au-brand { display:flex; align-items:center; gap:10px; }
        .au-brand-logo { width:34px; height:34px; border-radius:9px; overflow:hidden; background:linear-gradient(135deg,#99037d,#4C003E); flex-shrink:0; }
        .au-brand-logo img { width:100%; height:100%; object-fit:cover; }
        .au-brand-name { font-family:'Syne',sans-serif; font-weight:800; font-size:16px; color:#fff; letter-spacing:-.3px; }
        .au-brand-sub  { font-size:10px; color:rgba(255,160,230,.5); letter-spacing:.5px; }

        .au-topbar-search {
          flex:1; max-width:420px; margin:0 auto;
          position:relative; display:flex; align-items:center;
        }
        .au-search-icon { position:absolute; left:12px; font-size:13px; pointer-events:none; }
        .au-search-input {
          width:100%; padding:9px 34px;
          background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1);
          border-radius:11px; color:#fff;
          font-family:'DM Sans',sans-serif; font-size:13px; outline:none; transition:all .2s;
        }
        .au-search-input::placeholder { color:rgba(255,255,255,.25); }
        .au-search-input:focus { background:rgba(255,255,255,.1); border-color:rgba(153,3,125,.55); box-shadow:0 0 0 3px rgba(153,3,125,.12); }
        .au-search-clear { position:absolute; right:10px; background:none; border:none; color:rgba(255,255,255,.4); cursor:pointer; font-size:13px; }

        .au-topbar-right { display:flex; align-items:center; gap:10px; margin-left:auto; flex-shrink:0; }
        .au-admin-tag {
          padding:6px 12px; border-radius:99px; font-size:12px; font-weight:600;
          background:rgba(153,3,125,.15); border:1px solid rgba(153,3,125,.25); color:#e060c8; white-space:nowrap;
        }
        .au-logout-btn {
          display:flex; align-items:center; gap:6px; padding:8px 14px; border-radius:9px;
          border:1px solid rgba(255,100,100,.25); background:rgba(255,60,60,.08);
          color:rgba(255,120,120,.85); font-size:12px; font-weight:500; cursor:pointer; transition:all .2s;
        }
        .au-logout-btn:hover { background:rgba(255,60,60,.16); color:#ff8888; }

        /* ── BODY ── */
        .au-body { flex:1; display:flex; overflow:hidden; position:relative; }

        /* ── DESKTOP SIDEBAR ── */
        .au-sidebar {
          flex-shrink:0; height:100%; overflow-y:auto;
          display:flex; flex-direction:column; justify-content:space-between;
          background:rgba(255,255,255,.03);
          border-right:1px solid rgba(255,255,255,.07);
          transition:width .25s ease;
        }
        .au-sidebar.open      { width:210px; }
        .au-sidebar.collapsed { width:60px; }
        .au-sidebar.collapsed .au-nav-item span { display:none; }
        .au-sidebar.collapsed .au-sidebar-footer { display:none; }
        .au-sidebar.collapsed .au-nav-item { justify-content:center; padding:12px 0; }

        /* ── MOBILE OVERLAY ── */
        .au-mob-overlay { display:none; position:fixed; inset:0; z-index:500; }
        .au-mob-overlay.open { display:flex; }
        .au-mob-backdrop { position:absolute; inset:0; background:rgba(0,0,0,.65); backdrop-filter:blur(3px); }
        .au-mob-drawer {
          position:relative; z-index:1; width:240px; height:100%;
          background:#1d0020; border-right:1px solid rgba(255,255,255,.1);
          display:flex; flex-direction:column; justify-content:space-between;
          overflow-y:auto; animation:auDrawer .22s ease;
        }
        @keyframes auDrawer { from{transform:translateX(-100%)} to{transform:translateX(0)} }

        /* ── SHARED NAV ── */
        .au-sidenav { display:flex; flex-direction:column; gap:4px; padding:16px 8px; }
        .au-nav-item {
          display:flex; align-items:center; gap:10px;
          padding:11px 14px; border-radius:11px;
          font-size:13px; font-weight:500; color:rgba(255,255,255,.5);
          text-decoration:none; transition:all .2s;
          border:1px solid transparent; white-space:nowrap;
        }
        .au-nav-item:hover  { background:rgba(255,255,255,.07); color:#fff; }
        .au-nav-item.active { background:rgba(153,3,125,.2); border-color:rgba(153,3,125,.3); color:#e060c8; }

        .au-sidebar-footer { padding:16px 12px; border-top:1px solid rgba(255,255,255,.06); }
        .au-sidebar-stat   { display:flex; flex-direction:column; }
        .au-ss-num { font-family:'Syne',sans-serif; font-weight:800; font-size:22px; color:#fff; }
        .au-ss-lbl { font-size:10px; color:rgba(255,255,255,.38); text-transform:uppercase; letter-spacing:.4px; margin-top:2px; }

        /* ── MAIN ── */
        .au-main {
          flex:1; min-width:0; width:0;
          height:100%; overflow-y:auto; overflow-x:hidden;
          padding:28px 28px 60px;
        }

        /* Page header */
        .au-page-header {
          display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:14px; margin-bottom:28px;
        }
        .au-page-left { display:flex; align-items:center; gap:14px; }
        .au-page-icon {
          width:50px; height:50px; border-radius:14px; flex-shrink:0;
          background:rgba(153,3,125,.18); border:1px solid rgba(153,3,125,.3);
          display:flex; align-items:center; justify-content:center; font-size:22px;
        }
        .au-page-title { font-family:'Syne',sans-serif; font-weight:800; font-size:21px; color:#fff; margin-bottom:3px; }
        .au-page-sub   { font-size:13px; color:rgba(255,255,255,.4); }
        .au-user-count-badge {
          padding:8px 18px; border-radius:99px;
          background:rgba(153,3,125,.16); border:1px solid rgba(153,3,125,.3);
          font-family:'Syne',sans-serif; font-weight:700; font-size:13px; color:#e060c8;
          white-space:nowrap;
        }

        /* Table card */
        .au-table-card {
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.09);
          border-radius:18px; overflow:hidden;
        }
        .au-table-wrap { overflow-x:auto; }
        .au-table {
          width:100%; border-collapse:collapse; font-size:14px;
        }
        .au-table thead tr {
          background:rgba(153,3,125,.2);
          border-bottom:1px solid rgba(153,3,125,.3);
        }
        .au-table th {
          padding:14px 18px; text-align:left;
          font-family:'Syne',sans-serif; font-size:11px; font-weight:700;
          text-transform:uppercase; letter-spacing:.5px; color:#e060c8;
        }
        .au-row {
          border-bottom:1px solid rgba(255,255,255,.05);
          transition:background .18s ease;
          animation:rowIn .3s ease both;
        }
        @keyframes rowIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .au-row:last-child { border-bottom:none; }
        .au-row:hover { background:rgba(255,255,255,.04); }
        .au-table td { padding:13px 18px; color:rgba(255,255,255,.8); vertical-align:middle; }

        .au-id-badge {
          display:inline-block; padding:3px 9px; border-radius:6px;
          background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1);
          font-size:12px; font-weight:600; color:rgba(255,255,255,.5);
        }

        .au-user-cell { display:flex; align-items:center; gap:10px; }
        .au-avatar {
          width:32px; height:32px; border-radius:50%; flex-shrink:0;
          background:linear-gradient(135deg,#99037d,#cc05a0);
          display:flex; align-items:center; justify-content:center;
          font-family:'Syne',sans-serif; font-weight:700; font-size:13px; color:#fff;
        }

        .au-email { font-size:13px; color:rgba(255,255,255,.5); }

        .au-delete-btn {
          padding:7px 16px; border-radius:9px;
          background:rgba(255,60,60,.1); border:1px solid rgba(255,100,100,.25);
          color:rgba(255,120,120,.85); font-size:12px; font-weight:600;
          cursor:pointer; transition:all .2s;
        }
        .au-delete-btn:hover { background:rgba(255,60,60,.22); border-color:rgba(255,100,100,.5); color:#ff8888; transform:scale(1.04); }

        /* Shimmer */
        .au-shimmer-wrap { padding:16px; display:flex; flex-direction:column; gap:12px; }
        .au-shimmer-row  { display:grid; grid-template-columns:80px 1fr 1.5fr 80px; gap:12px; align-items:center; }
        .au-shimmer {
          height:14px; border-radius:6px;
          background:linear-gradient(90deg,rgba(255,255,255,.05) 0%,rgba(255,255,255,.12) 50%,rgba(255,255,255,.05) 100%);
          background-size:200% 100%; animation:auShim 1.5s infinite;
        }
        @keyframes auShim { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .au-sh-sm { width:60%; }
        .au-sh-md { width:70%; }
        .au-sh-lg { width:85%; }

        /* Empty */
        .au-empty { padding:60px 20px; text-align:center; }
        .au-empty-icon  { font-size:40px; margin-bottom:12px; }
        .au-empty-title { font-size:15px; color:rgba(255,255,255,.35); }

        /* ── MODAL ── */
        .au-modal-overlay {
          position:fixed; inset:0; z-index:600;
          background:rgba(0,0,0,.7); backdrop-filter:blur(6px);
          display:flex; align-items:center; justify-content:center;
          animation:modalBg .2s ease;
        }
        @keyframes modalBg { from{opacity:0} to{opacity:1} }
        .au-modal {
          background:#22002a; border:1px solid rgba(255,255,255,.1);
          border-radius:20px; padding:32px 28px; max-width:380px; width:90%;
          text-align:center; animation:modalIn .25s ease;
        }
        @keyframes modalIn { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
        .au-modal-icon  { font-size:40px; margin-bottom:14px; }
        .au-modal-title { font-family:'Syne',sans-serif; font-weight:800; font-size:19px; color:#fff; margin-bottom:8px; }
        .au-modal-text  { font-size:13px; color:rgba(255,255,255,.45); margin-bottom:24px; line-height:1.6; }
        .au-modal-actions { display:flex; gap:10px; }
        .au-modal-cancel {
          flex:1; padding:12px; border-radius:11px;
          background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1);
          color:rgba(255,255,255,.6); font-size:14px; font-weight:600; cursor:pointer; transition:all .2s;
        }
        .au-modal-cancel:hover { background:rgba(255,255,255,.12); color:#fff; }
        .au-modal-confirm {
          flex:1; padding:12px; border-radius:11px;
          background:rgba(255,60,60,.15); border:1px solid rgba(255,100,100,.3);
          color:#ff8888; font-size:14px; font-weight:600; cursor:pointer; transition:all .2s;
        }
        .au-modal-confirm:hover { background:rgba(255,60,60,.28); color:#fff; }

        /* ── RESPONSIVE ── */
        @media (min-width:769px) { .au-mob-overlay { display:none !important; } }
        @media (max-width:768px) {
          .au-sidebar { display:none !important; }
          .au-topbar  { padding:0 14px; }
          .au-topbar-search { display:none; }
          .au-admin-tag { display:none; }
          .au-main { padding:18px 14px 48px; }
          .au-table th, .au-table td { padding:10px 12px; font-size:12px; }
        }
      `}</style>
    </div>
  );
}