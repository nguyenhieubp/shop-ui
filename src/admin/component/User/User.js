// User.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUser } from "../../../store/loginSlice";
import "./User.css";

const User = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm xóa người dùng
  const deleteUser = (id) => {
    dispatch(deleteUsers(id));
  };

  // Hàm xử lý sự kiện click của nút Delete
  const handleDeleteClick = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      deleteUser(id);
    }
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Mật Khẩu</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <div className="action-buttons">
                  <Link to={`/admin/dashboard/user/edit/${user.id}`}>Sửa</Link>
                  <button
                    style={{ marginLeft: "4rem" }}
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
