import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import logo from "../asset/logow.png";

export default function LandingPage() {
  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start animation when component mounts
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 1500); // Start after hero animations

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    // Counter for students (50K)
    const studentInterval = setInterval(() => {
      setStudents((prev) => (prev < 50 ? prev + 1 : 50));
    }, 5);

    // Counter for courses (200)
    const courseInterval = setInterval(() => {
      setCourses((prev) => (prev < 200 ? prev + 1 : 200));
    }, 5);

    // Counter for success rate (95)
    const successInterval = setInterval(() => {
      setSuccessRate((prev) => (prev < 95 ? prev + 1 : 95));
    }, 5);

    // Clear intervals when done
    if (students >= 50 && courses >= 200 && successRate >= 95) {
      clearInterval(studentInterval);
      clearInterval(courseInterval);
      clearInterval(successInterval);
    }

    return () => {
      clearInterval(studentInterval);
      clearInterval(courseInterval);
      clearInterval(successInterval);
    };
  }, [hasStarted, students, courses, successRate]);

  return (
    <div className="landing-container">
      {/* Animated Background Orbs */}
      <div className="orbs-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">
            <span className="logo-icon">
                <img src={logo} alt="EDU-TECH Logo" className="logo-image" />
            </span>
            <span className="logo-text">EDU-TECH</span>
          </div>
          <div className="nav-links">
            <button className="btn btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</button>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/login" className="nav-btn nav-btn-login">Login</Link>
            <Link to="/signup" className="nav-btn nav-btn-signup">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text animate-in">
            <h1 className="hero-title">
              <span className="word" style={{ "--delay": "0.1s" }}>Learn</span>
              <span className="word" style={{ "--delay": "0.2s" }}>-Smarter,</span>
              <span className="word" style={{ "--delay": "0.3s" }}>Grow</span>
              <span className="word" style={{ "--delay": "0.4s" }}>-Faster</span>
            </h1>
            <p className="hero-subtitle">
              Transform your learning journey with AI-powered education
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">
                Get Started
                <span className="btn-arrow">→</span>
              </Link>
              <button className="btn btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Learn More</button>
            </div>
          </div>

          <div className="hero-image">
            <div className="floating-card card-1">
              <div className="card-icon">🎓</div>
              <div className="card-text">Learning</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">🚀</div>
              <div className="card-text">Growth</div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">✨</div>
              <div className="card-text">Excellence</div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-dot"></div>
          <p>Scroll to explore</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2 className="section-title">Why Choose EDU-TECH?</h2>
        <div className="features-grid">
          {[
            {
              icon: "🤖",
              title: "AI-Powered Learning",
              desc: "Personalized courses adapted to your learning pace"
            },
            {
              icon: "📊",
              title: "Progress Tracking",
              desc: "Real-time analytics to monitor your growth"
            },
            {
              icon: "🌍",
              title: "Global Community",
              desc: "Learn with students from around the world"
            },
            {
              icon: "🎯",
              title: "Goal-Oriented",
              desc: "Structured paths to achieve your goals"
            }
          ].map((feature, idx) => (
            <div key={idx} className="feature-card" style={{ "--delay": `${idx * 0.1}s` }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <h3 className="stat-number">{students}K+</h3>
          <p>Students</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">{courses}+</h3>
          <p>Courses</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">{successRate}%</h3>
          <p>Success Rate</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Start Learning?</h2>
        <p>Join thousands of students transforming their futures</p>
        <Link to="/signup" className="btn btn-primary btn-lg">
          Get Started Today
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>EDU-TECH</h4>
            <p>Transforming education through technology</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <button className="btn btn-secondary" onClick={e => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</button>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <Link to="/contact">Contact</Link>
            <Link to="/help">FAQ</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 EDU-TECH. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
