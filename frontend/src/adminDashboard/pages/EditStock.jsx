import React, { useState, useEffect } from "react";
import { useUpdateStockMutation } from "../../features/stocksApi";
import "./EditStock.css"; // Custom CSS file
import { toast } from "react-toastify";

const EditStock = ({ stock, onCancel }) => {
  const [editedStock, setEditedStock] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    category: "",
  });

  const [updateStock, { isLoading }] = useUpdateStockMutation();

  useEffect(() => {
    if (stock) {
      setEditedStock({
        title: stock.title,
        description: stock.stockDescription,
        image: stock.stockImageUrl,
        price: stock.price,
        category: stock.category || "",
      });
    }
  }, [stock]);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Sports",
    "Books",
    "Health & Beauty",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStock((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedStock((prev) => ({
      ...prev,
      image: file || prev.image,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !editedStock.title ||
      !editedStock.description ||
      !editedStock.image ||
      !editedStock.category
    ) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", editedStock.title);
    formData.append("stockDescription", editedStock.description);
    formData.append("price", editedStock.price.toString());
    formData.append("category", editedStock.category);

    if (editedStock.image instanceof File) {
      formData.append("file", editedStock.image);
    }

    try {
      await updateStock({ id: stock._id, formData }).unwrap();
      toast.success("Stock Updated Succesfully");
      onCancel();
    } catch (error) {
      toast.success("Stock failed to Update");
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h3 className="edit-title">Edit Stock</h3>
        <form className="edit-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={editedStock.title}
            onChange={handleChange}
            className="edit-stock-inputs"
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={editedStock.description}
            onChange={handleChange}
            className="edit-stock-inputs"
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={editedStock.category}
            onChange={handleChange}
            className="edit-stock-inputs"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label>Price</label>
          <input
            type="number"
            name="price"
            required
            value={editedStock.price}
            onChange={handleChange}
            className="edit-stock-inputs"
          />

          <label>Current File</label>
          {editedStock.image && !(editedStock.image instanceof File) && (
            <div className="preview-container">
              {/\.(mp4|webm|ogg)$/i.test(editedStock.image) ? (
                <video
                  src={editedStock.image}
                  muted
                  loop
                  className="preview-media"
                />
              ) : (
                <img
                  src={editedStock.image}
                  alt="Current stock"
                  className="preview-media"
                />
              )}
            </div>
          )}

          <label>Upload New Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="edit-stock-inputs"
            accept="image/*"
          />

          <div className="edit-buttons">
            <button type="submit" className="save-btn" disabled={isLoading}>
              {isLoading ? "Saving..." : "💾 Save"}
            </button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStock;
