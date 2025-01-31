import React, { useState, useEffect } from "react";
import "./EditStock.css"; // Custom CSS file

const EditStock = ({ stock, onSave, onCancel }) => {
  const [editedStock, setEditedStock] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Update state when stock is available
  useEffect(() => {
    if (stock) {
      setEditedStock(stock);
    }
  }, [stock]);

  // Handle input changes
  const handleChange = (e) => {
    setEditedStock({ ...editedStock, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editedStock.title || !editedStock.description || !editedStock.image) {
      alert("All fields are required!");
      return;
    }
    onSave(editedStock);
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h3 className="edit-title">Edit Stock</h3>
        <form onSubmit={handleSubmit} className="edit-form">
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

          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={editedStock.image}
            onChange={handleChange}
            className="edit-stock-inputs"
            required
          />

          <div className="edit-buttons">
            <button type="submit" className="save-btn">
              💾 Save
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
