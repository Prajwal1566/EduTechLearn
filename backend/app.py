from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import os
import secrets
from flask import send_file
from PIL import Image, ImageDraw, ImageFont
import qrcode
from datetime import date
import re
from werkzeug.utils import secure_filename
import random
import smtplib
from email.message import EmailMessage
import time
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import create_access_token


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def safe_filename(text):
    # Replace anything that's not a letter, number, _ or - with _
    return re.sub(r'[^a-zA-Z0-9_-]', '_', text)


app = Flask(__name__)
# Load JWT secret from environment variable; fall back to a random key per process
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", secrets.token_hex(32))
jwt = JWTManager(app)

# Restrict CORS to the React dev server (update ALLOWED_ORIGINS in production)
_allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")]
CORS(app, origins=_allowed_origins, supports_credentials=True)

DB_NAME = "database.db"

def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

# Create tables if not exists
def init_db():
    conn = get_db()
    cur = conn.cursor()

    # Courses table (YOUR EXISTING)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            lecturer TEXT,
            price REAL,
            image TEXT,
            rating REAL,
            badge TEXT,
            category TEXT,
            video TEXT,
            description TEXT,
            students TEXT,
            language TEXT,
            last_update TEXT,
            duration TEXT
        )
    """)

    # Users table (NEW)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            about TEXT DEFAULT "",
            profile_image TEXT DEFAULT ""
                
        )
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS purchases (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            course_id INTEGER,
            progress INTEGER DEFAULT 0,
            completed INTEGER DEFAULT 0
        )
    """)

    conn.commit()
    conn.close()

# -------------------- certificate --------------------

init_db()

def generate_certificate(student_name, course_name):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    cert_dir = os.path.join(base_dir, "certificates")
    output_dir = os.path.join(cert_dir, "output")
    os.makedirs(output_dir, exist_ok=True)

    img = Image.open(os.path.join(cert_dir, "certificate1.jpg")).convert("RGB")
    draw = ImageDraw.Draw(img)

    width, height = img.size

    title_font = ImageFont.truetype(os.path.join(cert_dir, "ArchivoBlack-Regular.ttf"), 55)
    name_font = ImageFont.truetype(os.path.join(cert_dir, "DancingScript-Bold.ttf"), 58)
    course_font = ImageFont.truetype(os.path.join(cert_dir, "Caveat-SemiBold.ttf"), 42)
    text_font = ImageFont.truetype(os.path.join(cert_dir, "arial.ttf"), 32)
    small_font = ImageFont.truetype(os.path.join(cert_dir, "arial.ttf"), 28)

    text_color = (60, 20, 90)

    y_title = 190
    y_line1 = 280
    y_name = 330
    y_line2 = 410
    y_course = 475
    y_from = 550

    title_text = "CERTIFICATE OF COMPLETION"
    w = draw.textlength(title_text, font=title_font)
    draw.text(((width - w) / 2, y_title), title_text, fill=text_color, font=title_font)

    line1 = "This is to certify that"
    w = draw.textlength(line1, font=text_font)
    draw.text(((width - w) / 2, y_line1), line1, fill=text_color, font=text_font)

    w = draw.textlength(student_name, font=name_font)
    draw.text(((width - w) / 2, y_name), student_name, fill=text_color, font=name_font)

    line2 = "Has successfully completed the"
    w = draw.textlength(line2, font=text_font)
    draw.text(((width - w) / 2, y_line2), line2, fill=text_color, font=text_font)

    w = draw.textlength(course_name, font=course_font)
    draw.text(((width - w) / 2, y_course), course_name, fill=text_color, font=course_font)

    from_text = "Course from EDU-TECH – An Online E-Learning Platform"
    w = draw.textlength(from_text, font=text_font)
    draw.text(((width - w) / 2, y_from), from_text, fill=text_color, font=text_font)

    today = date.today().strftime("%d / %m / %Y")
    draw.text((60, height - 150), f"Date: {today}", fill=text_color, font=small_font)

    qr_data = f"Certificate | Name: {student_name} | Course: {course_name} | Date: {today}"
    qr = qrcode.make(qr_data).resize((160, 160))
    qr_x = width // 2 - 80
    qr_y = height - 210
    img.paste(qr, (qr_x, qr_y))

    safe_student = safe_filename(student_name)
    safe_course = safe_filename(course_name)

    file_name = f"{safe_student}_{safe_course}_certificate.png"
    file_path = os.path.join(output_dir, file_name)
    img.save(file_path)

    return file_path

#_______________________otp___________________________
otp_store = {}  # { email: {"otp": 123456, "time": timestamp} }

SENDER_EMAIL = os.getenv("SENDER_EMAIL", "collegedaymail1@gmail.com")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD", "")  # Set in .env — never hard-code

def send_otp_email(receiver_email, username, otp):
    msg = EmailMessage()
    msg["Subject"] = "EDU-TECH | Password Reset OTP"
    msg["From"] = "EDU-TECH <collegedaymail1@gmail.com>"
    msg["To"] = receiver_email

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Password Reset OTP</title>
    </head>
    <body style="margin:0; padding:0; background-color:#0b0010; font-family:Arial, sans-serif;">
      <div style="max-width:600px; margin:40px auto; background:#120018; border-radius:10px; overflow:hidden; box-shadow:0 0 20px rgba(153,3,125,0.4);">
        
        <!-- Header -->
        <div style="background:linear-gradient(90deg, #4C003E, #99037d); padding:20px; text-align:center;">
          <h1 style="margin:0; color:#ffffff;">EDU-TECH E-Learning</h1>
          <p style="margin:5px 0 0; color:#f0cfe8;">Password Reset</p>
        </div>

        <!-- Body -->
        <div style="padding:30px; color:#e9e9e9;">
          <p style="font-size:16px;">Hi <strong>{username}</strong>,</p>

          <p style="font-size:15px; line-height:1.6;">
            Use the OTP below to reset your password. This OTP is valid for <strong>10 minutes</strong>.
          </p>

          <!-- OTP Box -->
          <div style="margin:30px 0; text-align:center;">
            <div style="
              display:inline-block;
              padding:15px 30px;
              font-size:28px;
              letter-spacing:6px;
              font-weight:bold;
              color:#ffffff;
              background:linear-gradient(90deg, #4C003E, #99037d);
              border-radius:8px;
              box-shadow:0 0 15px rgba(153,3,125,0.6);
            ">
              {otp}
            </div>
          </div>

          <p style="font-size:14px; color:#cccccc;">
            ⚠️ Do not share this OTP with anyone.  
            If you did not request a password reset, please ignore this email.
          </p>

          <p style="margin-top:30px; font-size:15px;">
            Regards,<br>
            <strong>PSS TEAM</strong><br>
            <span style="color:#b98bb0;">EDU-TECH E-Learning</span>
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#0b0010; padding:15px; text-align:center; color:#777; font-size:12px;">
          © {date.today().year} EDU-TECH. All rights reserved.
        </div>

      </div>
    </body>
    </html>
    """

    msg.set_content("Your email client does not support HTML emails.")
    msg.add_alternative(html_content, subtype="html")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.send_message(msg)

@app.route("/api/send-otp", methods=["POST"])
def send_otp():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Check if user exists
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT name FROM users WHERE email = ?", (email,))
    user = cur.fetchone()
    conn.close()

    if not user:
        return jsonify({"error": "No account found with this email"}), 404

    username = user["name"]

    otp = random.randint(100000, 999999)

    # Store OTP with timestamp
    otp_store[email] = {
        "otp": otp,
        "time": time.time()
    }

    try:
        send_otp_email(email, username, otp)
        return jsonify({"message": "OTP sent successfully"})
    except Exception as e:
        return jsonify({"error": "Failed to send OTP"}), 500

@app.route("/api/verify-otp", methods=["POST"])
def verify_otp():
    data = request.json
    email = data.get("email")
    otp = data.get("otp")

    if email not in otp_store:
        return jsonify({"error": "OTP not found or expired"}), 400

    saved_otp = otp_store[email]["otp"]
    saved_time = otp_store[email]["time"]

    # Check expiry: 10 minutes = 600 seconds
    if time.time() - saved_time > 600:
        otp_store.pop(email, None)
        return jsonify({"error": "OTP expired"}), 400

    if str(saved_otp) == str(otp):
        return jsonify({"message": "OTP verified"})
    else:
        return jsonify({"error": "Invalid OTP"}), 400

@app.route("/api/reset-password", methods=["POST"])
def reset_password():
    data = request.json
    email = data.get("email")
    new_password = data.get("password")

    if not email or not new_password:
        return jsonify({"error": "Missing data"}), 400

    # Check OTP exists (optional safety)
    if email not in otp_store:
        return jsonify({"error": "OTP not verified"}), 400

    hashed_password = generate_password_hash(new_password)

    conn = get_db()
    cur = conn.cursor()

    # Check user exists
    cur.execute("SELECT id FROM users WHERE email = ?", (email,))
    user = cur.fetchone()

    if not user:
        conn.close()
        return jsonify({"error": "User not found"}), 404

    # Update password
    cur.execute(
        "UPDATE users SET password = ? WHERE email = ?",
        (hashed_password, email)
    )
    conn.commit()
    conn.close()

    # Remove OTP after success
    otp_store.pop(email, None)

    return jsonify({"message": "Password changed successfully"})

    


# -------------------- AUTH APIs --------------------

ADMIN_USERNAME = os.getenv("ADMIN_USER", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASS", "edutech@123")

@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        
        # 🔐 CREATE JWT TOKEN
        access_token = create_access_token(identity=username)

        return jsonify({
            "message": "Login successful",
            "token": access_token,   # 🔥 ADD THIS
            "admin": {
                "username": username,
                "role": "admin"
            }
        }), 200
    else:
        return jsonify({"message": "Invalid admin credentials"}), 401

# Signup
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    conn = get_db()
    cur = conn.cursor()

    # Check if user already exists
    cur.execute("SELECT * FROM users WHERE email = ?", (email,))
    existing = cur.fetchone()
    if existing:
        conn.close()
        return jsonify({"message": "Email already registered"}), 400

    hashed_password = generate_password_hash(password)

    cur.execute("""
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    """, (name, email, hashed_password))

    conn.commit()
    conn.close()

    return jsonify({"message": "Signup successful"}), 200


# Login
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password required"}), 400

    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cur.fetchone()
    conn.close()

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid password"}), 401

    # 🔐 CREATE JWT TOKEN
    access_token = create_access_token(identity=user["email"])

    return jsonify({
        "message": "Login successful",
        "token": access_token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    }), 200

@app.route("/api/purchase", methods=["POST"])
def purchase_course():
    data = request.json
    user_id = data.get("user_id")
    course_id = data.get("course_id")

    if not user_id or not course_id:
        return jsonify({"message": "Missing user or course"}), 400

    conn = get_db()
    cur = conn.cursor()

    # ✅ Check if already purchased
    cur.execute(
        "SELECT id FROM purchases WHERE user_id = ? AND course_id = ?",
        (user_id, course_id)
    )
    existing = cur.fetchone()

    if existing:
        conn.close()
        return jsonify({"message": "Already purchased"}), 200

    # ✅ Insert only if not exists
    cur.execute("""
        INSERT INTO purchases (user_id, course_id, progress, completed)
        VALUES (?, ?, 0, 0)
    """, (user_id, course_id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Purchase saved"}), 200

# Mycourse
@app.route("/api/my-courses/<int:user_id>", methods=["GET"])
def my_courses(user_id):
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
    SELECT courses.*, MAX(purchases.progress) as progress, MAX(purchases.completed) as completed
    FROM purchases
    JOIN courses ON purchases.course_id = courses.id
    WHERE purchases.user_id = ?
    GROUP BY courses.id
""", (user_id,))

    rows = cur.fetchall()
    conn.close()

    result = [dict(row) for row in rows]
    return jsonify(result)


@app.route("/api/has-purchased/<int:user_id>/<int:course_id>", methods=["GET"])
def has_purchased(user_id, course_id):
    conn = get_db()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM purchases WHERE user_id = ? AND course_id = ?",
        (user_id, course_id)
    )
    row = cur.fetchone()
    conn.close()

    return jsonify({"purchased": True if row else False})

@app.route("/api/update-progress", methods=["POST"])
def update_progress():
    data = request.json
    user_id = data.get("user_id")
    course_id = data.get("course_id")
    progress = data.get("progress")

    if user_id is None or course_id is None or progress is None:
        return jsonify({"message": "Missing data"}), 400

    completed = 1 if int(progress) >= 100 else 0

    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        UPDATE purchases
        SET progress = ?, completed = ?
        WHERE user_id = ? AND course_id = ?
    """, (progress, completed, user_id, course_id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Progress updated", "completed": completed}), 200


@app.route("/api/certificate/<int:user_id>/<int:course_id>", methods=["GET"])
def download_certificate(user_id, course_id):
    conn = get_db()
    cur = conn.cursor()

    # Check user
    cur.execute("SELECT name FROM users WHERE id = ?", (user_id,))
    user = cur.fetchone()

    # Check course
    cur.execute("SELECT title FROM courses WHERE id = ?", (course_id,))
    course = cur.fetchone()

    # Check if completed
    cur.execute("""
        SELECT completed FROM purchases 
        WHERE user_id = ? AND course_id = ?
    """, (user_id, course_id))
    purchase = cur.fetchone()

    conn.close()

    if not user or not course:
        return jsonify({"message": "Invalid user or course"}), 404

    if not purchase or purchase["completed"] != 1:
        return jsonify({"message": "Course not completed yet"}), 403

    file_path = generate_certificate(user["name"], course["title"])

    return send_file(file_path, as_attachment=True)


# Update profile
@app.route("/api/profile/<int:user_id>", methods=["GET"])
def get_profile(user_id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id, name, email, about, profile_image FROM users WHERE id = ?", (user_id,))
    user = cur.fetchone()
    conn.close()

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify(dict(user))


@app.route("/api/profile/update/<int:user_id>", methods=["POST"])
def update_profile(user_id):
    name = request.form.get("name")
    about = request.form.get("about")

    file = request.files.get("profile_image")

    conn = get_db()
    cur = conn.cursor()

    # Get old image (if needed)
    cur.execute("SELECT profile_image FROM users WHERE id = ?", (user_id,))
    old = cur.fetchone()

    profile_image_path = old["profile_image"] if old else None

    if file:
        filename = secure_filename(file.filename)
        filename = f"user_{user_id}_{filename}"
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(save_path)

        # Save path to DB (URL path)
        profile_image_path = f"/uploads/profile/{filename}"

    cur.execute("""
        UPDATE users
        SET name = ?, about = ?, profile_image = ?
        WHERE id = ?
    """, (name, about, profile_image_path, user_id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Profile updated successfully", "profile_image": profile_image_path})

@app.route("/uploads/profile/<filename>")
def serve_profile_image(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# -------------------- ADMIN / COURSES APIs (UNCHANGED) --------------------

# Add course
@app.route("/api/admin/add-course", methods=["POST"])
@jwt_required()
def add_course():
    data = request.json
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO courses (title, lecturer, price, image, rating, badge, category,video, description, students, language, last_update, duration)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data["title"],
        data["lecturer"],
        data["price"],
        data["image"],
        data["rating"],
        data.get("badge", ""),
        data.get("category", "Trending"),
        data.get("video", ""),
        data.get("description", ""),
        data.get("students", ""),
        data.get("language", ""),
        data.get("last_update", ""),
        data.get("duration", "")
    ))
    conn.commit()
    conn.close()
    return jsonify({"success": True})



# Get all courses
@app.route("/api/courses", methods=["GET"])
def get_courses():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM courses")
    rows = cur.fetchall()
    conn.close()
    courses = [dict(row) for row in rows]
    return jsonify(courses)

# Delete course
@app.route("/api/admin/course/<int:course_id>", methods=["DELETE"])
@jwt_required()
def delete_course(course_id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("DELETE FROM courses WHERE id = ?", (course_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

@app.route("/api/admin/users", methods=["GET"])
@jwt_required()
def get_all_users():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("SELECT id, name, email FROM users")
    users = cur.fetchall()

    conn.close()

    return jsonify([dict(user) for user in users])

@app.route("/api/admin/delete-user/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    conn = get_db()
    cur = conn.cursor()

    # Delete user purchases first (important for foreign key safety later)
    cur.execute("DELETE FROM purchases WHERE user_id = ?", (user_id,))
    cur.execute("DELETE FROM users WHERE id = ?", (user_id,))

    conn.commit()
    conn.close()

    return jsonify({"message": "User deleted successfully"})


if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug_mode)
