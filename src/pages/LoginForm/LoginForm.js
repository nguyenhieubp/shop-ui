import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      window.location.reload();
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleLogin} className="login-form" autocomplete="off">
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
        <div>
          <Link className="register-link" to="/register">
            Đăng Ký
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
