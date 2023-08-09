// Order.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Order.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrders, getAllOrders } from "../../../store/orderSlice";

const Order = () => {
  const dispatch = useDispatch();
  const { listOrder } = useSelector((state) => state.order);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    setOrders(listOrder);
  }, [listOrder]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredOrders[0]?.detail[0].title);

  // Hàm xóa đơn hàng
  const deleteOrder = (id) => {
    dispatch(deleteOrders(id));
  };

  // Hàm xử lý sự kiện click của nút Delete
  const handleDeleteClick = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
      deleteOrder(id);
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
      <table className="order-table">
        <thead>
          <tr>
            <th>Tên Khác Hàng</th>
            <th>Số Điện Thoại</th>
            <th>Địa chỉ</th>
            <th>Ngày Mua</th>
            <th>Sản Phẩm</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>{order.dateCreated}</td>
              <td>
                {Array.isArray(order.detail) &&
                  order.detail.map((item, index) => (
                    <p key={index}>
                      Sản phẩm: {item.title}, Số Lượng: {item.quantity}, Giá:{" "}
                      {item.price}
                    </p>
                  ))}
              </td>
              <td>
                <button onClick={() => handleDeleteClick(order.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
