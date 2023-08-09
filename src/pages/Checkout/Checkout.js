// src/components/Checkout.js
import React, { useEffect, useState } from "react";
import "./Checkout.css";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyCartOfUser,
  getCartOfUser,
  selectTotalPrice,
  setCartEmpty,
} from "../../store/cartSlice";
import { postOrder } from "../../store/orderSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getCartOfUser(userId));
  }, [dispatch]);
  const cartProducts = useSelector((state) => state.cart.carts);
  console.log(cartProducts);
  const totalPrice = useSelector(selectTotalPrice);

  const [order, setOrder] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (event) => {
    setOrder({
      ...order,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newOrder = {
      id: Date.now().toString(),
      customerName: order.name,
      phone: order.phone,
      address: order.address,
      dateCreated: new Date().toISOString(),
      detail: cartProducts,
    };

    try {
      dispatch(postOrder(newOrder));
      dispatch(emptyCartOfUser(localStorage.getItem("userId")));
      navigation("/");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout">
        <div className="products">
          <h2>Danh sách sản phẩm</h2>
          <ul>
            {cartProducts.map((product) => (
              <li key={product.id} className="product">
                {product.title} - ${product.price} X {product.quantity}
              </li>
            ))}
          </ul>
          <p className="total">Tổng tiền: ${totalPrice}</p>
        </div>

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2>Thanh toán</h2>
          <label>
            Tên:
            <input
              autocomplete="off"
              type="text"
              name="name"
              onChange={handleInputChange}
            />
          </label>
          <label>
            Số điện thoại:
            <input
              autocomplete="off"
              type="tel"
              name="phone"
              onChange={handleInputChange}
            />
          </label>
          <label>
            Địa chỉ:
            <input
              autocomplete="off"
              type="text"
              name="address"
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Mua</button>
        </form>
      </div>
    </>
  );
}

export default Checkout;
