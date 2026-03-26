import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div style={{
      background: "#0a0612",
      color: "#ffffff",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'DM Sans', -apple-system, sans-serif"
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }

          .feature-card {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .feature-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 60px rgba(153, 3, 125, 0.4);
          }
          
          .mission-card {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .mission-card:nth-child(2) {
            animation-delay: 0.2s;
          }
          
          .floating-shape {
            animation: float 6s ease-in-out infinite;
          }
          
          .glow-text {
            text-shadow: 0 0 40px rgba(153, 3, 125, 0.5),
                         0 0 80px rgba(153, 3, 125, 0.3);
          }

          /* ==================== RESPONSIVE STYLES ==================== */
          
          /* Tablets (768px - 1024px) */
          @media (max-width: 1024px) {
            section:first-of-type h1 {
              font-size: 56px !important;
            }
            section:nth-of-type(2) h2 {
              font-size: 32px !important;
            }
            section:nth-of-type(3) h2 {
              font-size: 44px !important;
            }
          }

          /* Large Tablets & Small Laptops (768px) */
          @media (max-width: 768px) {
            section:first-of-type {
              padding: 100px 20px 80px !important;
            }
            section:first-of-type h1 {
              font-size: 48px !important;
              line-height: 1.15 !important;
            }
            section:first-of-type > div > p {
              font-size: 17px !important;
              max-width: 550px !important;
            }
            section:first-of-type > div > div:last-child {
              flex-wrap: wrap !important;
              gap: 12px !important;
            }
            section:nth-of-type(2) {
              padding: 60px 20px !important;
            }
            section:nth-of-type(2) > div {
              grid-template-columns: 1fr !important;
              gap: 30px !important;
            }
            .mission-card {
              padding: 40px 30px !important;
            }
            .mission-card h2 {
              font-size: 30px !important;
            }
            .mission-card p {
              font-size: 16px !important;
            }
            section:nth-of-type(3) {
              padding: 80px 20px !important;
            }
            section:nth-of-type(3) h2 {
              font-size: 40px !important;
            }
            section:nth-of-type(3) > div > div:last-child {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 25px !important;
            }
            section:nth-of-type(4) {
              padding: 80px 20px !important;
            }
            section:nth-of-type(4) h2 {
              font-size: 36px !important;
            }
            section:nth-of-type(5) {
              padding: 100px 20px !important;
            }
            section:nth-of-type(5) h2 {
              font-size: 44px !important;
            }
          }

          /* Mobile Devices (640px and below) */
          @media (max-width: 640px) {
            section:first-of-type {
              padding: 80px 15px 60px !important;
            }
            section:first-of-type > div > div:first-child {
              font-size: 11px !important;
              padding: 6px 16px !important;
            }
            section:first-of-type h1 {
              font-size: 36px !important;
              margin-bottom: 20px !important;
            }
            .glow-text {
              text-shadow: 0 0 30px rgba(153, 3, 125, 0.4),
                           0 0 60px rgba(153, 3, 125, 0.2) !important;
            }
            section:first-of-type > div > p {
              font-size: 16px !important;
              max-width: 100% !important;
              margin: 0 auto 30px !important;
            }
            section:first-of-type > div > div:last-child {
              flex-direction: column !important;
              width: 100% !important;
              max-width: 300px !important;
              margin: 0 auto !important;
            }
            section:first-of-type > div > div:last-child > div {
              width: 100% !important;
              padding: 12px 20px !important;
              font-size: 13px !important;
            }
            section:nth-of-type(2) {
              padding: 50px 15px !important;
            }
            section:nth-of-type(2) > div {
              grid-template-columns: 1fr !important;
              gap: 25px !important;
            }
            .mission-card {
              padding: 35px 25px !important;
              border-radius: 20px !important;
            }
            .mission-card > div:first-child {
              font-size: 40px !important;
              margin-bottom: 15px !important;
            }
            .mission-card h2 {
              font-size: 28px !important;
              margin-bottom: 15px !important;
            }
            .mission-card p {
              font-size: 15px !important;
              line-height: 1.7 !important;
            }
            .mission-card > div:last-child {
              margin-top: 25px !important;
            }
            .mission-card > div:last-child span {
              padding: 5px 12px !important;
              font-size: 11px !important;
            }
            section:nth-of-type(3) {
              padding: 70px 15px !important;
            }
            section:nth-of-type(3) > div > div:first-child {
              margin-bottom: 50px !important;
            }
            section:nth-of-type(3) h2 {
              font-size: 32px !important;
              margin-bottom: 15px !important;
            }
            section:nth-of-type(3) > div > div:first-child > p {
              font-size: 16px !important;
            }
            section:nth-of-type(3) > div > div:last-child {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
            .feature-card {
              padding: 30px 25px !important;
            }
            .feature-card > div:nth-child(2) {
              font-size: 40px !important;
              margin-bottom: 15px !important;
            }
            .feature-card h3 {
              font-size: 18px !important;
              margin-bottom: 10px !important;
            }
            .feature-card p {
              font-size: 14px !important;
            }
            .feature-card:hover {
              transform: translateY(-5px) scale(1.01) !important;
            }
            section:nth-of-type(4) {
              padding: 70px 15px !important;
            }
            section:nth-of-type(4) > div > div:first-child {
              width: 100px !important;
              height: 100px !important;
              margin: 0 auto 25px !important;
              font-size: 48px !important;
            }
            section:nth-of-type(4) h2 {
              font-size: 32px !important;
              margin-bottom: 15px !important;
            }
            section:nth-of-type(4) > div > p {
              font-size: 16px !important;
              margin-bottom: 25px !important;
            }
            section:nth-of-type(4) > div > div:last-child {
              flex-direction: column !important;
              gap: 15px !important;
              padding: 18px 25px !important;
            }
            section:nth-of-type(4) > div > div:last-child > div {
              text-align: center !important;
            }
            section:nth-of-type(4) > div > div:last-child > div > div:first-child {
              font-size: 24px !important;
              margin-bottom: 4px !important;
            }
            section:nth-of-type(4) > div > div:last-child > div > div:last-child {
              font-size: 12px !important;
            }
            section:nth-of-type(4) > div > div:last-child > div:nth-child(even) {
              display: none !important;
            }
            section:nth-of-type(5) {
              padding: 80px 15px !important;
            }
            section:nth-of-type(5) h2 {
              font-size: 36px !important;
              margin-bottom: 20px !important;
              line-height: 1.2 !important;
            }
            section:nth-of-type(5) > div > p {
              font-size: 16px !important;
              margin-bottom: 35px !important;
            }
            section:nth-of-type(5) button {
              padding: 16px 40px !important;
              font-size: 16px !important;
              width: 100% !important;
              max-width: 300px !important;
            }
            section:nth-of-type(5) > div > div:last-child {
              flex-direction: column !important;
              gap: 20px !important;
              margin-top: 40px !important;
            }
            section:nth-of-type(5) > div > div:last-child > div {
              font-size: 13px !important;
            }
            section:nth-of-type(5) > div > div:last-child > div span:first-child {
              font-size: 18px !important;
            }
            .floating-shape {
              display: none !important;
            }
          }

          /* Small Mobile (480px and below) */
          @media (max-width: 480px) {
            section:first-of-type {
              padding: 70px 12px 50px !important;
            }
            section:first-of-type h1 {
              font-size: 30px !important;
              margin-bottom: 18px !important;
            }
            section:first-of-type > div > p {
              font-size: 15px !important;
              margin-bottom: 25px !important;
            }
            section:first-of-type > div > div:last-child {
              max-width: 280px !important;
            }
            section:first-of-type > div > div:last-child > div {
              font-size: 12px !important;
              padding: 10px 16px !important;
            }
            section:nth-of-type(2) {
              padding: 40px 12px !important;
            }
            .mission-card {
              padding: 30px 20px !important;
            }
            .mission-card h2 {
              font-size: 26px !important;
            }
            .mission-card p {
              font-size: 14px !important;
            }
            section:nth-of-type(3) {
              padding: 60px 12px !important;
            }
            section:nth-of-type(3) h2 {
              font-size: 28px !important;
            }
            section:nth-of-type(3) > div > div:first-child > p {
              font-size: 15px !important;
            }
            .feature-card {
              padding: 25px 20px !important;
              border-radius: 16px !important;
            }
            .feature-card > div:nth-child(2) {
              font-size: 36px !important;
            }
            .feature-card h3 {
              font-size: 17px !important;
            }
            .feature-card p {
              font-size: 13px !important;
            }
            section:nth-of-type(4) {
              padding: 60px 12px !important;
            }
            section:nth-of-type(4) > div > div:first-child {
              width: 90px !important;
              height: 90px !important;
              font-size: 44px !important;
            }
            section:nth-of-type(4) h2 {
              font-size: 28px !important;
            }
            section:nth-of-type(4) > div > p {
              font-size: 15px !important;
            }
            section:nth-of-type(4) > div > div:last-child {
              padding: 16px 20px !important;
            }
            section:nth-of-type(4) > div > div:last-child > div > div:first-child {
              font-size: 22px !important;
            }
            section:nth-of-type(4) > div > div:last-child > div > div:last-child {
              font-size: 11px !important;
            }
            section:nth-of-type(5) {
              padding: 70px 12px !important;
            }
            section:nth-of-type(5) h2 {
              font-size: 32px !important;
              line-height: 1.15 !important;
            }
            section:nth-of-type(5) > div > p {
              font-size: 15px !important;
            }
            section:nth-of-type(5) button {
              padding: 15px 35px !important;
              font-size: 15px !important;
            }
            section:nth-of-type(5) > div > div:last-child > div {
              font-size: 12px !important;
            }
          }
        `}
      </style>

      {/* Animated Background Elements */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 0
      }}>
        {/* Gradient Orbs */}
        <div style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(153, 3, 125, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "pulse 4s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(76, 0, 62, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "pulse 5s ease-in-out infinite",
          animationDelay: "1s"
        }} />

        {/* Geometric Shapes */}
        <div className="floating-shape" style={{
          position: "absolute",
          top: "30%",
          left: "15%",
          width: "80px",
          height: "80px",
          border: "2px solid rgba(153, 3, 125, 0.3)",
          transform: "rotate(45deg)",
          animationDelay: "0s"
        }} />
        <div className="floating-shape" style={{
          position: "absolute",
          top: "60%",
          right: "20%",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "2px solid rgba(218, 165, 32, 0.3)",
          animationDelay: "1.5s"
        }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        
        {/* HERO SECTION */}
        <section style={{
          padding: "140px 20px 120px",
          textAlign: "center",
          position: "relative"
        }}>
          <div style={{
            maxWidth: "900px",
            margin: "0 auto"
          }}>
            <div style={{
              display: "inline-block",
              padding: "8px 20px",
              background: "linear-gradient(135deg, rgba(153, 3, 125, 0.2), rgba(76, 0, 62, 0.2))",
              border: "1px solid rgba(153, 3, 125, 0.3)",
              borderRadius: "30px",
              marginBottom: "30px",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#daa520"
            }}>
              ✦ About Us
            </div>
            
            <h1 className="glow-text" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "72px",
              fontWeight: "700",
              marginBottom: "30px",
              lineHeight: "1.1",
              background: "linear-gradient(135deg, #ffffff 0%, #daa520 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Redefining Education
            </h1>
            
            <p style={{
              fontSize: "20px",
              lineHeight: "1.7",
              color: "rgba(255, 255, 255, 0.7)",
              maxWidth: "650px",
              margin: "0 auto 40px",
              fontWeight: "400"
            }}>
              We're building the future of learning—where cutting-edge technology 
              meets timeless academic excellence to empower the next generation.
            </p>

            <div style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              <div style={{
                padding: "12px 24px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600"
              }}>
                🌍 Global Platform
              </div>
              <div style={{
                padding: "12px 24px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600"
              }}>
                🎓 10K+ Students
              </div>
              <div style={{
                padding: "12px 24px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600"
              }}>
                ⭐ 4.9 Rating
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section style={{
          padding: "80px 20px",
          maxWidth: "1200px",
          margin: "auto",
          position: "relative"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
            gap: "40px"
          }}>
            {/* Mission Card */}
            <div className="mission-card" style={{
              background: "linear-gradient(135deg, rgba(153, 3, 125, 0.1), rgba(76, 0, 62, 0.05))",
              border: "1px solid rgba(153, 3, 125, 0.2)",
              borderRadius: "24px",
              padding: "50px 40px",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "200px",
                height: "200px",
                background: "radial-gradient(circle, rgba(153, 3, 125, 0.2) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(40px)"
              }} />
              
              <div style={{
                fontSize: "48px",
                marginBottom: "20px"
              }}>🎯</div>
              
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "36px",
                fontWeight: "700",
                marginBottom: "20px",
                color: "#ffffff"
              }}>
                Our Mission
              </h2>
              
              <p style={{
                fontSize: "17px",
                lineHeight: "1.8",
                color: "rgba(255, 255, 255, 0.75)",
                fontWeight: "400"
              }}>
                To democratize world-class education through innovative technology, 
                making high-quality learning accessible, affordable, and engaging for 
                students across every corner of the globe.
              </p>

              <div style={{
                marginTop: "30px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap"
              }}>
                {["Accessible", "Affordable", "Quality"].map((tag, i) => (
                  <span key={i} style={{
                    padding: "6px 14px",
                    background: "rgba(153, 3, 125, 0.2)",
                    border: "1px solid rgba(153, 3, 125, 0.3)",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#daa520"
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Vision Card */}
            <div className="mission-card" style={{
              background: "linear-gradient(135deg, rgba(218, 165, 32, 0.1), rgba(184, 134, 11, 0.05))",
              border: "1px solid rgba(218, 165, 32, 0.2)",
              borderRadius: "24px",
              padding: "50px 40px",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: "-50px",
                left: "-50px",
                width: "200px",
                height: "200px",
                background: "radial-gradient(circle, rgba(218, 165, 32, 0.2) 0%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(40px)"
              }} />
              
              <div style={{
                fontSize: "48px",
                marginBottom: "20px"
              }}>🚀</div>
              
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "36px",
                fontWeight: "700",
                marginBottom: "20px",
                color: "#ffffff"
              }}>
                Our Vision
              </h2>
              
              <p style={{
                fontSize: "17px",
                lineHeight: "1.8",
                color: "rgba(255, 255, 255, 0.75)",
                fontWeight: "400"
              }}>
                To emerge as the world's most transformative digital learning ecosystem—
                where innovation, creativity, and academic rigor converge to shape 
                the leaders and thinkers of tomorrow.
              </p>

              <div style={{
                marginTop: "30px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap"
              }}>
                {["Innovation", "Leadership", "Excellence"].map((tag, i) => (
                  <span key={i} style={{
                    padding: "6px 14px",
                    background: "rgba(218, 165, 32, 0.2)",
                    border: "1px solid rgba(218, 165, 32, 0.3)",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#daa520"
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section style={{
          padding: "100px 20px",
          background: "linear-gradient(180deg, transparent 0%, rgba(153, 3, 125, 0.05) 50%, transparent 100%)",
          position: "relative"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "auto"
          }}>
            <div style={{
              textAlign: "center",
              marginBottom: "70px"
            }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "52px",
                fontWeight: "700",
                marginBottom: "20px",
                background: "linear-gradient(135deg, #ffffff 0%, #daa520 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                The EDU-TECH Advantage
              </h2>
              <p style={{
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.6)",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                Six pillars that make us the platform of choice for modern learners
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "30px"
            }}>
              {[
                {
                  icon: "💻",
                  title: "Modern Interface",
                  desc: "Sleek, intuitive design that makes learning a pleasure"
                },
                {
                  icon: "🔐",
                  title: "Bank-Grade Security",
                  desc: "Your data protected with enterprise-level encryption"
                },
                {
                  icon: "📚",
                  title: "Curated Curriculum",
                  desc: "Expert-designed courses across diverse disciplines"
                },
                {
                  icon: "🌙",
                  title: "Adaptive Themes",
                  desc: "Personalize your experience with dark/light modes"
                },
                {
                  icon: "📈",
                  title: "Progress Analytics",
                  desc: "Track your growth with detailed insights"
                },
                {
                  icon: "🛒",
                  title: "Smart Management",
                  desc: "Wishlist, bookmarks, and intelligent recommendations"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="feature-card"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "20px",
                    padding: "40px 30px",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer"
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #99037d, #daa520)",
                    opacity: 0,
                    transition: "opacity 0.3s"
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                  />
                  
                  <div style={{
                    fontSize: "48px",
                    marginBottom: "20px",
                    display: "inline-block",
                    transform: "scale(1)",
                    transition: "transform 0.3s"
                  }}>
                    {item.icon}
                  </div>
                  
                  <h3 style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginBottom: "12px",
                    color: "#ffffff"
                  }}>
                    {item.title}
                  </h3>
                  
                  <p style={{
                    fontSize: "15px",
                    lineHeight: "1.6",
                    color: "rgba(255, 255, 255, 0.6)"
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER SECTION */}
        <section style={{
          padding: "100px 20px",
          background: "linear-gradient(135deg, rgba(153, 3, 125, 0.1) 0%, rgba(10, 6, 18, 0.5) 100%)",
          borderTop: "1px solid rgba(153, 3, 125, 0.2)",
          borderBottom: "1px solid rgba(153, 3, 125, 0.2)"
        }}>
          <div style={{
            maxWidth: "800px",
            margin: "auto",
            textAlign: "center"
          }}>
            <div style={{
              width: "120px",
              height: "120px",
              margin: "0 auto 30px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #99037d, #daa520)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "56px",
              border: "4px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 20px 60px rgba(153, 3, 125, 0.3)"
            }}>
              👨‍💻
            </div>
            
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "42px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#ffffff"
            }}>
              Built by PSS
            </h2>
            
            <p style={{
              fontSize: "18px",
              lineHeight: "1.8",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "30px"
            }}>
              A passionate software engineer committed to creating secure, scalable, 
              and beautiful web experiences. EDU-TECH represents a vision where 
              technology empowers education at scale.
            </p>

            <div style={{
              display: "inline-flex",
              gap: "20px",
              padding: "20px 30px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px"
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#daa520",
                  marginBottom: "5px"
                }}>
                  5+
                </div>
                <div style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}>
                  Years Dev
                </div>
              </div>
              
              <div style={{
                width: "1px",
                background: "rgba(255, 255, 255, 0.1)"
              }} />
              
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#daa520",
                  marginBottom: "5px"
                }}>
                  20+
                </div>
                <div style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}>
                  Projects
                </div>
              </div>
              
              <div style={{
                width: "1px",
                background: "rgba(255, 255, 255, 0.1)"
              }} />
              
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#daa520",
                  marginBottom: "5px"
                }}>
                  100%
                </div>
                <div style={{
                  fontSize: "13px",
                  color: "rgba(255, 255, 255, 0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}>
                  Passion
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section style={{
          padding: "120px 20px",
          textAlign: "center",
          position: "relative"
        }}>
          <div style={{
            maxWidth: "700px",
            margin: "auto"
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "56px",
              fontWeight: "700",
              marginBottom: "25px",
              lineHeight: "1.2"
            }}>
              Ready to Transform Your Learning?
            </h2>
            
            <p style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.6)",
              marginBottom: "40px"
            }}>
              Join thousands of students already mastering new skills
            </p>

            <Link to="/" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "18px 50px",
                background: "linear-gradient(135deg, #99037d 0%, #daa520 100%)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontSize: "17px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 20px 60px rgba(153, 3, 125, 0.4)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 30px 80px rgba(153, 3, 125, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(153, 3, 125, 0.4)";
              }}
              >
                <span style={{ position: "relative", zIndex: 1 }}>
                  Get Started →
                </span>
              </button>
            </Link>

            <div style={{
              marginTop: "50px",
              display: "flex",
              gap: "40px",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "14px"
              }}>
                <span style={{ color: "#daa520", fontSize: "20px" }}>✓</span>
                Experienced Teaching coachs
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "14px"
              }}>
                <span style={{ color: "#daa520", fontSize: "20px" }}>✓</span>
                Trusted
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "14px"
              }}>
                <span style={{ color: "#daa520", fontSize: "20px" }}>✓</span>
                Valuable Certificate
              </div>
            </div>
          </div>
        </section>

        {/* Footer Accent */}
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg, transparent, #99037d, #daa520, transparent)",
          margin: "0 auto",
          maxWidth: "80%"
        }} />
      </div>
    </div>
  );
}