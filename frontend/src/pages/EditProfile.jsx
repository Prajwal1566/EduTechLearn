import React, { useEffect, useState } from "react";
import logo from "../asset/logow.png";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ep-root {
    min-height: 100vh;
    background: #1f001d;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow-x: hidden;
  }

  /* Orbs */
  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
    animation: floatOrb 10s ease-in-out infinite;
  }
  .orb-1 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #9900ff33, transparent);
    top: -80px; left: -80px;
    animation-delay: 0s;
  }
  .orb-2 {
    width: 350px; height: 350px;
    background: radial-gradient(circle, #ff00aa22, transparent);
    bottom: -60px; right: -60px;
    animation-delay: -4s;
  }

  @keyframes floatOrb {
    0%,100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(20px,-30px) scale(1.05); }
  }

  /* Top nav bar */
  .ep-navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 32px;
    background: rgba(31,0,29,0.7);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .ep-navbar-brand {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: #fff;
    letter-spacing: -0.3px;
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .ep-navbar-logo {
    width: 32px; height: 32px;
    border-radius: 8px;
    overflow: hidden;
    background: linear-gradient(135deg, #99037d, #4C003E);
  }
  .ep-navbar-logo img { width: 100%; height: 100%; object-fit: cover; }

  .ep-navbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .back-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 14px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.7);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
  }
  .back-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

  /* Main layout */
  .ep-main {
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto;
    padding: 36px 20px 60px;
  }

  .ep-page-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 26px;
    color: #fff;
    margin-bottom: 4px;
  }

  .ep-page-sub {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    margin-bottom: 32px;
  }

  /* Card */
  .ep-card {
    border-radius: 20px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    backdrop-filter: blur(24px);
    overflow: hidden;
    margin-bottom: 20px;
    transition: box-shadow 0.3s;
  }
  .ep-card:hover {
    box-shadow: 0 8px 40px rgba(153,3,125,0.12);
  }

  .ep-card-header {
    padding: 20px 24px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ep-card-icon {
    width: 34px; height: 34px;
    border-radius: 9px;
    background: linear-gradient(135deg, rgba(153,3,125,0.3), rgba(76,0,62,0.4));
    display: flex; align-items: center; justify-content: center;
    font-size: 15px;
    border: 1px solid rgba(153,3,125,0.3);
  }

  .ep-card-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #fff;
  }

  .ep-card-body {
    padding: 24px;
  }

  /* Avatar section */
  .avatar-section {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
  }

  .avatar-wrap {
    position: relative;
    flex-shrink: 0;
  }

  .avatar-img {
    width: 88px; height: 88px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(153,3,125,0.5);
    box-shadow: 0 0 0 4px rgba(153,3,125,0.1);
    background: linear-gradient(135deg, #99037d, #4C003E);
    display: flex; align-items: center; justify-content: center;
    font-size: 32px;
    color: rgba(255,255,255,0.7);
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    overflow: hidden;
  }
  .avatar-img img { width: 100%; height: 100%; object-fit: cover; }

  .avatar-badge {
    position: absolute;
    bottom: 2px; right: 2px;
    width: 22px; height: 22px;
    border-radius: 50%;
    background: #44ee88;
    border: 2px solid #1f001d;
    display: flex; align-items: center; justify-content: center;
    font-size: 9px;
  }

  .avatar-info { flex: 1; min-width: 160px; }

  .avatar-name {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: #fff;
    margin-bottom: 4px;
  }

  .avatar-email {
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    margin-bottom: 10px;
  }

  .avatar-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 99px;
    background: rgba(153,3,125,0.15);
    border: 1px solid rgba(153,3,125,0.3);
    font-size: 11px;
    color: #e060c8;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  /* Field */
  .field { margin-bottom: 18px; }
  .field:last-child { margin-bottom: 0; }

  .field-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.55);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .field-input, .field-textarea {
    width: 100%;
    padding: 12px 16px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease;
    resize: none;
  }
  .field-input::placeholder, .field-textarea::placeholder { color: rgba(255,255,255,0.22); }

  .field-input:focus, .field-textarea:focus {
    background: rgba(153,3,125,0.08);
    border-color: rgba(153,3,125,0.6);
    box-shadow: 0 0 0 3px rgba(153,3,125,0.15);
  }

  .field-hint {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    margin-top: 5px;
  }

  /* Character count */
  .char-count {
    text-align: right;
    font-size: 11px;
    color: rgba(255,255,255,0.25);
    margin-top: 4px;
  }

  /* Grid */
  .field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media (max-width: 560px) {
    .field-grid { grid-template-columns: 1fr; }
  }

  /* URL preview */
  .url-preview {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding: 8px 12px;
    border-radius: 10px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
  }
  .url-preview-img {
    width: 36px; height: 36px;
    border-radius: 8px;
    object-fit: cover;
    background: rgba(153,3,125,0.2);
    flex-shrink: 0;
    overflow: hidden;
  }
  .url-preview-img img { width: 100%; height: 100%; object-fit: cover; }
  .url-preview-text {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    word-break: break-all;
  }

  /* Actions */
  .ep-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .btn-save {
    display: flex; align-items: center; gap: 8px;
    padding: 13px 28px;
    background: linear-gradient(135deg, #99037d, #4C003E 60%, #7a0260);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 24px rgba(153,3,125,0.35);
    position: relative;
    overflow: hidden;
  }
  .btn-save::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .btn-save:hover::before { opacity: 1; }
  .btn-save:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(153,3,125,0.5); }
  .btn-save:active { transform: translateY(0); }
  .btn-save:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  .btn-cancel {
    display: flex; align-items: center; gap: 8px;
    padding: 13px 22px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    color: rgba(255,255,255,0.65);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-cancel:hover { background: rgba(255,255,255,0.1); color: #fff; }

  /* Save feedback */
  .save-feedback {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px;
    color: #44ee88;
    font-weight: 600;
    animation: fadeInUp 0.3s ease;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Loading shimmer */
  .shimmer {
    background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
    height: 44px;
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  /* Divider */
  .ep-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    margin: 20px 0;
  }

  @keyframes blink { 0%,80%,100% { opacity: 0; } 40% { opacity: 1; } }
  .dot { display: inline-block; animation: blink 1.2s ease-in-out infinite; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
`;

export default function EditProfile() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [profileImage, setProfileImage] = useState(""); // final URL from backend
  const [imageFile, setImageFile] = useState(null);     // selected file
  const [preview, setPreview] = useState("");           // local preview
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);


  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/api/profile/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setAbout(data.about || "");
        setPreview(data.profile_image || "");
        setLoading(false);
       if (data.profile_image) {
  const fullUrl = API + data.profile_image;
  setProfileImage(fullUrl);
  setPreview(fullUrl);
} else {
  setProfileImage("");
  setPreview("");
}
      });
  }, [user.id]);

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setImageFile(file);
  setPreview(URL.createObjectURL(file)); // instant preview
};

  const handleSave = async () => {
    setSaving(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);

// only send file if user selected new one
    if (imageFile) {
      formData.append("profile_image", imageFile);
    }

    await fetch(`${API}/api/profile/update/${user.id}`, {
      method: "POST",
      body: formData,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate("/profile");
    }, 1500);
  };

  const initials = name
    ? name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <>
      <style>{styles}</style>
      <div className="ep-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        {/* Navbar */}
        <nav className="ep-navbar">
          <Link to="/profile" className="ep-navbar-brand">
            <div className="ep-navbar-logo">
              <img src={logo} alt="EDU-TECH Logo" className="logo-image" />
            </div>
            EDU-TECH
          </Link>
          <div className="ep-navbar-right">
            <button className="back-btn" onClick={() => navigate("/profile")}>
              ← Back to Profile
            </button>
          </div>
        </nav>

        <div className="ep-main">
          <div className="ep-page-title">Edit Profile</div>
          <div className="ep-page-sub">Update your personal information and preferences</div>

          {/* Profile Preview Card */}
          <div className="ep-card">
            <div className="ep-card-header">
              <div className="ep-card-icon">👤</div>
              <div className="ep-card-title">Profile Preview</div>
            </div>
            <div className="ep-card-body">
              <div className="avatar-section">
                <div className="avatar-wrap">
                  <div className="avatar-img">
                    {preview || profileImage
                      ? <img src={preview || profileImage} alt="avatar" />
                      : initials}
                  </div>
                  <div className="avatar-badge">✓</div>
                </div>
                <div className="avatar-info">
                  {loading
                    ? <div className="shimmer" style={{ width: 160, height: 24, marginBottom: 8 }} />
                    : <div className="avatar-name">{name || "Your Name"}</div>}
                  <div className="avatar-email">{user?.email || "your@email.com"}</div>
                  <span className="avatar-tag">✦ Student</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info Card */}
          <div className="ep-card">
            <div className="ep-card-header">
              <div className="ep-card-icon">✏️</div>
              <div className="ep-card-title">Personal Information</div>
            </div>
            <div className="ep-card-body">
              {loading ? (
                <>
                  <div className="shimmer" style={{ marginBottom: 16 }} />
                  <div className="shimmer" style={{ height: 88 }} />
                </>
              ) : (
                <>
                  <div className="field">
                    <label className="field-label">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="field-input"
                      maxLength={60}
                    />
                    <div className="char-count">{name.length}/60</div>
                  </div>

                  <div className="field">
                    <label className="field-label">About Me</label>
                    <textarea
                      rows={4}
                      placeholder="Tell others a little about yourself..."
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="field-textarea"
                      maxLength={300}
                    />
                    <div className="char-count">{about.length}/300</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Profile Image Card */}
          <div className="ep-card">
            <div className="ep-card-header">
              <div className="ep-card-icon">🖼️</div>
              <div className="ep-card-title">Profile Image</div>
            </div>
            <div className="ep-card-body">
              {loading ? (
                <div className="shimmer" />
              ) : (
                <div className="field" style={{ marginBottom: 0 }}>
                  <label className="field-label">Upload Profile Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="field-input"
                />

                <div className="field-hint">Choose an image from your device</div>
                
                {preview && (
                  <div className="url-preview">
                    <div className="url-preview-img">
                      <img src={preview} alt="preview" />
                    </div>
                    <div className="url-preview-text">Selected image preview</div>
                  </div>
                )}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="ep-card">
            <div className="ep-card-body">
              <div className="ep-actions">
                <button onClick={handleSave} disabled={saving || loading} className="btn-save">
                  {saving
                    ? <>Saving<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></>
                    : "💾 Save Changes"}
                </button>
                <button onClick={() => navigate("/profile")} className="btn-cancel">
                  Cancel
                </button>
                {saved && (
                  <div className="save-feedback">
                    ✓ Saved! Redirecting...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}