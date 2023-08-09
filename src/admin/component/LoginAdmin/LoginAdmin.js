import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin, loginUser } from "../../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginAdmin.css";
import axios from "axios";

function LoginAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- Hàm này sẽ được sử dụng để điều hướng
  const { user, error } = useSelector((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:3000/admins");
    const admin = response.data;
    if (email === admin.email && password === admin.password) {
      localStorage.setItem("adminId", admin.id);
      navigate("/admin/dashboard"); // <-- điều hướng đến trang dashboard khi đăng nhập thành công
    } else {
      alert("Mật Khẩu Hoặc Email Không Đúng");
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleLogin} className="login-form" autoComplete="off">
        <h1>Đăng Nhập</h1>
        <label>Email:</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          required
        />
        <label>
          <p>Mật Khẩu:</p>
          <div className="password-container">
            <input
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              name="password"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="toggle-password-btn"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </label>

        <button type="submit" className="login-btn">
          Đăng Nhập
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
}

export default LoginAdmin;
