import React, { useState } from "react";

const AdminAddCourse = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "", lecturer: "", price: "", image: "", rating: "",
    badge: "", category: "Trending", video: "", description: "",
    students: "", language: "", last_update: "", duration: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, price: Number(form.price), rating: Number(form.rating) });
    setForm({
      title: "", lecturer: "", price: "", image: "", rating: "",
      badge: "", category: "Trending", video: "", description: "",
      students: "", language: "", last_update: "", duration: "",
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const fields = [
    [
      { name:"title",    label:"Course Title",       placeholder:"e.g. Full Stack Web Dev",  required:true  },
      { name:"lecturer", label:"Lecturer Name",       placeholder:"e.g. John Smith",          required:true  },
    ],
    [
      { name:"price",    label:"Price (₹)",           placeholder:"e.g. 999",  type:"number", required:true  },
      { name:"rating",   label:"Rating (0–5)",         placeholder:"e.g. 4.5",  type:"number", step:"0.1", required:true },
    ],
    [
      { name:"duration", label:"Duration",             placeholder:"e.g. 10 Hours",            required:true  },
      { name:"language", label:"Language",             placeholder:"e.g. English",             required:true  },
    ],
    [
      { name:"students",    label:"Students Enrolled", placeholder:"e.g. 100,000+",           required:true  },
      { name:"last_update", label:"Last Update",       placeholder:"e.g. 2 Feb 2026",         required:true  },
    ],
    [
      { name:"badge",  label:"Badge",              placeholder:"e.g. Best Seller (optional)", required:false },
    ],
  ];

  return (
    <div className="aac-wrap">

      <div className="aac-header">
        <div className="aac-header-icon">➕</div>
        <div>
          <h2 className="aac-header-title">Add New Course</h2>
          <p className="aac-header-sub">Fill in the details below to publish a new course to the platform</p>
        </div>
      </div>

      {submitted && (
        <div className="aac-toast">✅ Course published successfully!</div>
      )}

      <form onSubmit={handleSubmit} className="aac-form">

        {/* Paired rows */}
        {fields.map((row, ri) => (
          <div key={ri} className={`aac-row ${row.length === 1 ? "aac-row-single" : ""}`}>
            {row.map(f => (
              <div key={f.name} className="aac-field">
                <label>{f.label}{f.required && <span className="aac-req">*</span>}</label>
                <input
                  name={f.name}
                  placeholder={f.placeholder}
                  type={f.type || "text"}
                  step={f.step}
                  value={form[f.name]}
                  onChange={handleChange}
                  required={f.required}
                />
              </div>
            ))}
          </div>
        ))}

        {/* Category select */}
        <div className="aac-field">
          <label>Category <span className="aac-req">*</span></label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="Trending">🔥 Trending</option>
            <option value="Coding">💻 Coding</option>
            <option value="AI">🤖 AI</option>
            <option value="Design">🎨 Design</option>
          </select>
        </div>

        {/* Full width fields */}
        <div className="aac-field">
          <label>Image URL <span className="aac-req">*</span></label>
          <input name="image" placeholder="https://example.com/image.jpg" value={form.image} onChange={handleChange} required />
        </div>

        <div className="aac-field">
          <label>YouTube Video Link <span className="aac-req">*</span></label>
          <input name="video" placeholder="https://youtube.com/watch?v=..." value={form.video} onChange={handleChange} required />
        </div>

        <div className="aac-field">
          <label>Course Description <span className="aac-req">*</span></label>
          <textarea name="description" placeholder="Describe what students will learn in this course..." value={form.description} onChange={handleChange} required rows="4" />
        </div>

        <button type="submit" className="aac-submit">
          ➕ Publish Course
        </button>
      </form>

      <style>{`
        .aac-wrap {
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 20px;
          padding: 28px 32px 32px;
          max-width: 860px;
        }

        .aac-header { display:flex; align-items:flex-start; gap:14px; margin-bottom:24px; }
        .aac-header-icon {
          width:48px; height:48px; border-radius:13px; flex-shrink:0;
          background:rgba(153,3,125,.18); border:1px solid rgba(153,3,125,.3);
          display:flex; align-items:center; justify-content:center; font-size:20px;
        }
        .aac-header-title { font-family:'Syne',sans-serif; font-weight:800; font-size:19px; color:#fff; margin-bottom:3px; }
        .aac-header-sub   { font-size:12px; color:rgba(255,255,255,.38); line-height:1.5; }

        .aac-toast {
          padding:12px 18px; border-radius:11px; margin-bottom:20px;
          background:rgba(68,238,136,.1); border:1px solid rgba(68,238,136,.28);
          color:#44ee88; font-size:13px; font-weight:600;
          animation:toastIn .3s ease;
        }
        @keyframes toastIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }

        .aac-form { display:flex; flex-direction:column; gap:14px; }

        .aac-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .aac-row-single { grid-template-columns:1fr; }

        .aac-field { display:flex; flex-direction:column; gap:6px; }
        .aac-field label {
          font-size:11px; font-weight:700; text-transform:uppercase;
          letter-spacing:.5px; color:rgba(255,255,255,.5);
          display:flex; align-items:center; gap:4px;
        }
        .aac-req { color:#e060c8; font-size:13px; }

        .aac-field input,
        .aac-field select,
        .aac-field textarea {
          padding:11px 14px;
          background:rgba(255,255,255,.06);
          border:1px solid rgba(255,255,255,.1);
          border-radius:10px; color:#fff;
          font-family:'DM Sans',sans-serif; font-size:13px;
          outline:none; transition:all .2s; resize:vertical;
          width:100%;
        }
        .aac-field input::placeholder,
        .aac-field textarea::placeholder { color:rgba(255,255,255,.2); }
        .aac-field input:focus,
        .aac-field select:focus,
        .aac-field textarea:focus {
          border-color:rgba(153,3,125,.6);
          background:rgba(255,255,255,.09);
          box-shadow:0 0 0 3px rgba(153,3,125,.14);
        }
        .aac-field select option { background:#2a0022; color:#fff; }

        .aac-submit {
          margin-top:8px; padding:14px;
          border-radius:12px; border:none;
          background:linear-gradient(90deg,#4C003E,#99037d,#cc05a0);
          color:#fff; font-family:'Syne',sans-serif;
          font-size:15px; font-weight:700; cursor:pointer;
          transition:all .25s; letter-spacing:.2px;
        }
        .aac-submit:hover { opacity:.88; transform:translateY(-2px); box-shadow:0 10px 30px rgba(153,3,125,.45); }
        .aac-submit:active { transform:translateY(0); }

        @media(max-width:600px) {
          .aac-wrap { padding:20px 16px; }
          .aac-row  { grid-template-columns:1fr; }
        }
      `}</style>
    </div>
  );
};

export default AdminAddCourse;