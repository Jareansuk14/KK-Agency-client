import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "../styles/Register.scss";
import Navbar from "../components/Navbar";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("https://kkagency-api.onrender.com/auth/register", {
        method: "POST",
        body: register_form
      })

      if (response.ok) {
        navigate("/login")
      }
    } catch (err) {
      console.log("Registration failed", err.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="register">
        <div className="register_content">
          <form className="register_content_form" onSubmit={handleSubmit}>
            <input
              placeholder="ชื่อจริง"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              placeholder="นามสกุล"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              placeholder="อีเมล"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              placeholder="รหัสผ่าน"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
            />
            <input
              placeholder="ยืนยันรหัสผ่าน"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              required
            />

            {!passwordMatch && (
              <p style={{ color: "red" }}>รหัสผ่านไม่ตรงกัน!</p>
            )}

            <input
              id="image"
              type="file"
              name="profileImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
              required
            />
            <label htmlFor="image">
              <img src="/assets/addImage.png" alt="add profile photo" />
              <p>อัพโหลดรูปโปรไฟล์ของคุณ</p>
            </label>

            {formData.profileImage && (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="profile photo"
                style={{ maxWidth: "80px" }}
              />
            )}
            <button type="submit" disabled={!passwordMatch}>ลงทะเบียน</button>
          </form>
          <Link to="/login">คุณมีบัญชีอยู่แล้ว? เข้าสู่ระบบที่นี่</Link>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
