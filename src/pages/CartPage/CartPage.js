import React, { useEffect } from "react";
import "./CartPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import Navbar from "../../components/Navbar/Navbar";
import {
  getCartOfUser,
  removeCartOfUser,
  selectTotalPrice,
  updateQuantityOfCartItem,
} from "../../store/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(getCartOfUser(userId));
  }, [dispatch]);
  const cartProducts = useSelector((state) => state.cart.carts);

  const removeFromUserCart = (id) => {
    dispatch(removeCartOfUser(id));
  };

  const totalPrice = useSelector(selectTotalPrice);

  const emptyCartMsg = <h4 className="text-red fw-6">No items found!</h4>;

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="container">
          <div className="breadcrumb">
            <ul className="breadcrumb-items flex">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="fas fa-home"></i>
                  <span className="breadcrumb-separator">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </Link>
              </li>
              <li>Giỏ Hàng</li>
            </ul>
          </div>
        </div>
        <div className="bg-ghost-white py-5">
          <div className="container">
            <div className="section-title bg-ghost-white">
              <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
                Giỏ Hàng Của Tôi
              </h3>
            </div>
            {cartProducts.length === 0 ? (
              emptyCartMsg
            ) : (
              <div className="cart-content grid">
                <div className="cart-left">
                  <div className="cart-items grid">
                    {cartProducts.map((cartProduct) => (
                      <div key={cartProduct?.id} className="cart-item grid">
                        <div className="cart-item-img flex flex-column bg-white">
                          <img
                            src={cartProduct?.images?.[0]}
                            alt={cartProduct?.title}
                          />
                          <button
                            type="button"
                            className="btn-square rmv-from-cart-btn"
                            onClick={() =>
                              dispatch(removeFromUserCart(cartProduct.id))
                            }
                          >
                            <span className="btn-square-icon">
                              <i className="fas fa-trash"></i>
                            </span>
                          </button>
                        </div>

                        <div className="cart-item-info">
                          <h6 className="fs-16 fw-5 text-light-blue">
                            {cartProduct?.title}
                          </h6>
                          <div className="qty flex">
                            <span className="text-light-blue qty-text">
                              Số Lượng:{" "}
                            </span>
                            <div className="qty-change flex">
                              <button
                                type="button"
                                className="qty-inc fs-14 text-light-blue"
                                onClick={() => {
                                  if (cartProduct.quantity > 1) {
                                    dispatch(
                                      updateQuantityOfCartItem({
                                        cartId: cartProduct.id,
                                        quantity: cartProduct.quantity - 1,
                                      })
                                    );
                                  }
                                }}
                              >
                                <i className="fas fa-minus text-light-blue"></i>
                              </button>

                              <span className="qty-value flex flex-center">
                                {cartProduct?.quantity}
                              </span>
                              <button
                                type="button"
                                className="qty-inc fs-14 text-light-blue"
                                onClick={() =>
                                  dispatch(
                                    updateQuantityOfCartItem({
                                      cartId: cartProduct.id,
                                      quantity: cartProduct.quantity + 1,
                                    })
                                  )
                                }
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-between">
                            <div className="text-pine-green fw-4 fs-15 price">
                              Giá : {formatPrice(cartProduct?.price)}
                            </div>
                            <div className="sub-total fw-6 fs-18 text-regal-blue">
                              <span>
                                Tổng :{" "}
                                {cartProduct?.price * cartProduct?.quantity} $
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cart-right bg-white">
                  <div className="cart-summary text-light-blue">
                    <div className="cart-summary-title">
                      <h6 className="fs-20 fw-5">Tất cả sản phẩm</h6>
                    </div>
                    <ul className="cart-summary-info">
                      <li className="flex flex-between">
                        <span className="fw-4">
                          Có {cartProducts.length} sản phẩm giá
                        </span>
                        <span className="fw-7">{totalPrice} $</span>
                      </li>
                    </ul>
                    <div className="cart-summary-total flex flex-between fs-18">
                      <span className="fw-6">Tổng tiền: </span>
                      <span className="fw-6">{totalPrice} $</span>
                    </div>
                    <Link to="/checkout">
                      <div className="cart-summary-btn">
                        <button type="button" className="btn-secondary">
                          Tiến hành thanh toán
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
