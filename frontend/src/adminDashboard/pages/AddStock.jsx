import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddStockMutation } from "../../features/stocksApi.js";
import { toast } from "react-toastify";

const AddStock = () => {
  const [newStock, setNewStock] = useState({
    title: "",
    description: "",
    file: null,
    price: "",
    category: "",
  });

  const navigate = useNavigate();
  const [addStock, { isLoading }] = useAddStockMutation();

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
    setNewStock((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    setNewStock((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newStock.title);
    formData.append("stockDescription", newStock.description);
    formData.append("file", newStock.file);
    formData.append("price", newStock.price.toString());
    formData.append("category", newStock.category);

    try {
      await addStock(formData).unwrap();
      toast.success("Stock Added Successfully");
      navigate("/admin/all-stocks");
    } catch (error) {
      console.error("Error adding stock:", error);
      toast.error("Failed to Add Stock");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1e1e2f",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#252537",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.4)",
          width: "400px",
          maxWidth: "100%",
          color: "#e0e0e0",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#ff9800" }}>Add New Stock</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <input
            type="text"
            name="title"
            value={newStock.title}
            onChange={handleChange}
            placeholder="Stock Title"
            required
            style={{
              padding: "12px",
              backgroundColor: "#333",
              border: "1px solid #444",
              borderRadius: "6px",
              color: "#f1f1f1",
              width: "100%",
            }}
          />
          <textarea
            name="description"
            value={newStock.description}
            onChange={handleChange}
            placeholder="Stock Description"
            required
            style={{
              padding: "12px",
              backgroundColor: "#333",
              border: "1px solid #444",
              borderRadius: "6px",
              color: "#f1f1f1",
              width: "100%",
              resize: "none",
            }}
          />

          {/* ✅ Category Dropdown */}
          <select
            name="category"
            value={newStock.category}
            onChange={handleChange}
            required
            style={{
              padding: "12px",
              backgroundColor: "#333",
              border: "1px solid #444",
              borderRadius: "6px",
              color: "#f1f1f1",
              width: "100%",
            }}
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            required
            style={{ color: "#b3b3b3" }}
          />
          <input
            type="number"
            name="price"
            required
            value={newStock.price}
            onChange={handleChange}
            placeholder="Stock Price"
            style={{
              padding: "12px",
              backgroundColor: "#333",
              border: "1px solid #444",
              borderRadius: "6px",
              color: "#f1f1f1",
              width: "100%",
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "6px",
                border: "none",
                background: isLoading
                  ? "#555"
                  : "linear-gradient(135deg, #ff9800, #ff5722)",
                color: "#fff",
                fontSize: "16px",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {isLoading ? "Submitting..." : "Add Stock"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/all-stocks")}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "6px",
                border: "none",
                background: "#ff4444",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStock;
