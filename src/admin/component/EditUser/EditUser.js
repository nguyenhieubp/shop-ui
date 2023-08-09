// EditUser.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./EditUser.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../../store/loginSlice";

const EditUser = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { email: encodedEmail } = useParams();
  const email = decodeURIComponent(encodedEmail);

  useEffect(() => {
    dispatch(getUserById(email));
  }, [dispatch, email]);

  const { userUpdate } = useSelector((state) => state.login);

  const [formData, setFormData] = useState(userUpdate);

  useEffect(() => {
    setFormData(userUpdate);
  }, [userUpdate]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateUser({
        id: email,
        email: formData.email,
        password: formData.password,
      })
    );
    navigation("/admin/dashboard/user");
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="edit-user" onSubmit={handleSubmit} autocomplete="off">
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData?.email || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Mật Khẩu:
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData?.password || ""}
          onChange={handleChange}
        />
        <button type="button" onClick={toggleShowPassword}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </label>
      <input type="submit" value="Đổi" />
    </form>
  );
};

export default EditUser;
