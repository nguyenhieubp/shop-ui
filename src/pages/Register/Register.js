import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const styles = {
  container: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    margin: "auto",
    height: "40rem",
    borderRadius: "1rem",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "80%",
    border: "1px solid",
    padding: "0.5rem",
    margin: "0.5rem",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "10%",
  },
  button: {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "0.5rem 2rem",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "0.5rem",
    cursor: "pointer",
  },
};

function RegisterForm() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users", {
        id: Date.now().toString(),
        email: email,
        password: password,
      });
      navigation("/login");
    } catch (error) {
      console.error("Failed to register user", error);
      throw error;
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={registerUser} style={styles.form} autocomplete="off">
        <h1>Đăng Ký</h1>
        <label style={styles.label}>Email:</label>
        <input
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          type="email"
          name="email"
          required
        />
        <label style={styles.label}>Mật Khẩu:</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          type="password"
          name="password"
          required
        />
        <label style={styles.label}>
          <input type="checkbox" defaultChecked name="remember" /> Remember me
        </label>
        <button type="submit" style={styles.button}>
          Đăng Ký
        </button>
        <div style={styles.label}>
          <Link style={{ color: "blue" }} to="/login">
            Đăng Nhập
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
