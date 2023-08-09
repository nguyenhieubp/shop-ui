// Product.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Product.css";
import { fetchProducts, deleteProduct } from "../../../store/productSlice";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      dispatch(deleteProduct(id));
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
      <table className="product-table">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Miêu Tả</th>
            <th>Giá</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <Link to={`/admin/dashboard/product/edit/${product.id}`}>
                  Sửa
                </Link>
                <button
                  style={{ marginLeft: "4rem" }}
                  onClick={() => handleDeleteClick(product.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
