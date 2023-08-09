import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { getProductId, updateProduct } from "../../../store/productSlice";
import "./EditProduct.css";

const EditProduct = () => {
  const navigation = useNavigate();
  const { name: idProduct } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductId(idProduct));
  }, [dispatch, idProduct]);

  const product = useSelector((state) => state.product.productEdit);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        images: product.images || [],
      });
    }
  }, [product]);

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
    dispatch(updateProduct({ ...formData, id: idProduct }));
    navigation("/admin/dashboard/product");
  };

  return (
    <form className="edit-product" onSubmit={handleSubmit} autocomplete="off">
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
        Tiêu đề:
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
        {formData.images &&
          formData.images?.map(
            (image, index) =>
              image.startsWith("data:image") && (
                <img key={index} src={image} alt="Product" />
              )
          )}
      </label>
      <input type="submit" value="Lưu" />
    </form>
  );
};

export default EditProduct;
