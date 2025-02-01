import React, { useState, useEffect } from "react";
import { useUpdateStockMutation } from "../../features/stocksApi";
import "./EditStock.css"; // Custom CSS file

const EditStock = ({ stock, onCancel }) => {
  const [editedStock, setEditedStock] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [updateStock, { isLoading }] = useUpdateStockMutation();

  useEffect(() => {
    if (stock) {
      setEditedStock({
        title: stock.title,
        description: stock.stockDescription,
        image: stock.stockImageUrl,
      });
    }
  }, [stock]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStock((prev) => ({ ...prev, [name]: value }));
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
    if (!editedStock.title || !editedStock.description || !editedStock.image) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", editedStock.title);
    formData.append("stockDescription", editedStock.description);

    if (editedStock.image instanceof File) {
      formData.append("file", editedStock.image);
    }

    try {
      await updateStock({ id: stock._id, formData }).unwrap();
      alert("Stock updated successfully!");
      onCancel();
    } catch (error) {
      alert("Failed to update stock: " + error.message);
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

          <label>Current Image</label>
          {editedStock.image && !(editedStock.image instanceof File) && (
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid #ddd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
                overflow: "hidden",
                borderRadius: "5px",
              }}
            >
              <img
                src={editedStock.image}
                alt="Current stock"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
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
