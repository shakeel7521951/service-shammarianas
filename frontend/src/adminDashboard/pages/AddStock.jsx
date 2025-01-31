import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddStock.css";

const AddStock = () => {
  const [newStock, setNewStock] = useState({
    title: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Stock Added:", newStock);
    navigate("/admin/all-stock");
  };

  return (
    <div className="add-stock-container">
      <h2 className="add-stock-title">Add New Stock</h2>
      <form onSubmit={handleSubmit} className="add-stock-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={newStock.title}
            onChange={handleChange}
            placeholder="Stock Title"
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={newStock.description}
            onChange={handleChange}
            placeholder="Stock Description"
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="image"
            value={newStock.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default AddStock;
