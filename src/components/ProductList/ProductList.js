import React, { useState } from "react";
import { STATUS } from "../../utils/status";
import "./ProductList.scss";
import { setModalData, setIsModalVisible } from "../../store/modalSlice";
import SingleProduct from "../SingleProduct/SingleProduct";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../utils/helpers";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const ProductList = ({ products, status }) => {
  const dispatch = useDispatch();
  const { isModalVisible } = useSelector((state) => state.modal);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const viewModalHandler = (data) => {
    dispatch(setModalData(data));
    dispatch(setIsModalVisible(true));
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.price - b.price;
      } else if (sortOrder === "highToLow") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (status === STATUS.ERROR) return <Error />;
  if (status === STATUS.LOADING) return <Loader />;

  return (
    <section
      className="product bg-ghost-white"
      style={{ padding: "2rem" }}
      id="products"
    >
      {isModalVisible && <SingleProduct />}
      <div className="container">
        <div className="product-content">
          <div className="section-title">
            <input
              style={{
                padding: "4px",
                fontSize: "1.4rem",
                border: "2px solid",
                width: "60rem",
              }}
              type="text"
              placeholder="Tìm sản phẩm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ marginTop: "1rem" }}>
              <label style={{ fontSize: "1.2rem" }}>
                <input
                  type="radio"
                  name="sortOrder"
                  value="lowToHigh"
                  checked={sortOrder === "lowToHigh"}
                  onChange={(e) => setSortOrder(e.target.value)}
                />{" "}
                Thấp Đến Cao
              </label>
              <label style={{ marginLeft: "3rem" }}>
                <input
                  style={{ fontSize: "1rem" }}
                  type="radio"
                  name="sortOrder"
                  value="highToLow"
                  checked={sortOrder === "highToLow"}
                  onChange={(e) => setSortOrder(e.target.value)}
                />{" "}
                Cao Đến Thấp
              </label>
            </div>
          </div>
          <div className="product-items grid">
            {currentProducts.map((product) => (
              <div
                className="product-item bg-white"
                key={product.id}
                onClick={() => viewModalHandler(product)}
              >
                <div className="product-item-img">
                  <img src={product.images[0]} alt="" />
                  <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6"></div>
                </div>
                <div className="product-item-body">
                  <h6 className="product-item-title text-pine-green fw-4 fs-15">
                    {product.title}
                  </h6>
                  <div className="product-item-price text-regal-blue fw-7 fs-18">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              position: "fixed",
              bottom: "0",
              width: "100%",
              backgroundColor: "#ffffff",
              padding: "10px 0",
            }}
          >
            <ul
              className="pagination"
              style={{
                listStyleType: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0",
                padding: "0",
              }}
            >
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <li key={page} style={{ margin: "0 5px" }}>
                    <button
                      onClick={() => paginate(page)}
                      style={{
                        fontWeight: page === currentPage ? "bold" : "normal",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "1px solid #cccccc",
                        backgroundColor:
                          page === currentPage ? "#007bff" : "#ffffff",
                        color: page === currentPage ? "#ffffff" : "#000000",
                      }}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
