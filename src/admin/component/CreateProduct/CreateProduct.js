import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../store/productSlice";
import "./CreateProduct.css";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, images: [e.target.result] });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createProduct({ ...formData }));
    navigation("/admin/dashboard/product");
  };

  return (
    <form className="create-product" onSubmit={handleSubmit} autocomplete="off">
      <label>
        Tên:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Miêu tả:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Giá:
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Ảnh:
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
        />
        {formData.images && formData.images.length > 0 && (
          <img src={formData.images[0]} alt="Product" />
        )}
      </label>
      <input type="submit" value="Tạo" />
    </form>
  );
};

export default CreateProduct;
