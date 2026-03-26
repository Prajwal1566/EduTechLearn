import React, { useState, useEffect } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./CourseCard.css";

export default function CourseCard({ course, onDelete }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setLiked(saved.includes(course.id));
  }, [course.id]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    let saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (saved.includes(course.id)) {
      saved = saved.filter((id) => id !== course.id);
      setLiked(false);
    } else {
      saved.push(course.id);
      setLiked(true);
    }
    localStorage.setItem("wishlist", JSON.stringify(saved));
  };

  return (
    <Link to={`/course/${course.id}`} className="block" style={{ textDecoration: "none" }}>
      <div className="course-card">
        <div className="image-wrapper">
          <img src={course.image} alt={course.title} />

          <button className={`wishlist-btn ${liked ? "liked" : ""}`} onClick={toggleWishlist}>
            <FaHeart />
          </button>

          <div className="rating-badge">
            <FaStar className="star-icon" />
            <span className="rating">{course.rating}</span>
          </div>

          {course.badge && <span className="badge">{course.badge}</span>}
        </div>

        <div className="course-content">
          <h3>{course.title}</h3>
          <p>{course.lecturer}</p>
          <div className="price-row">
            <span className="price">₹ {course.price}</span>
            {onDelete && (
              <button className="delete-btn" onClick={(e) => { e.preventDefault(); onDelete(course.id); }}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}