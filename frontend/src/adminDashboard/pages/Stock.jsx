import React, { useState } from "react";
import EditStock from "./EditStock";
import "./Stock.css"; // Custom CSS file

const Stock = () => {
  const [stocks, setStocks] = useState([
    {
      id: 1,
      title: "Laptop",
      description: "High-end gaming laptop",
      image: "laptop.jpg",
    },
    {
      id: 2,
      title: "Smartphone",
      description: "Latest smartphone model",
      image: "phone.jpg",
    },
    {
      id: 3,
      title: "Headphones",
      description: "Noise-canceling headphones",
      image: "headphones.jpg",
    },
  ]);

  const [editStock, setEditStock] = useState(null);

  // Open Edit Modal
  const handleEdit = (stock) => {
    setEditStock(stock);
  };

  // Save Edited Stock
  const handleSave = (updatedStock) => {
    setStocks(
      stocks.map((stock) =>
        stock.id === updatedStock.id ? updatedStock : stock
      )
    );
    setEditStock(null); // Close modal
  };

  // Handle Delete
  const handleDelete = (id) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  return (
    <div className="stock-container">
      <h2 className="stock-title">📦 Stock Management</h2>

      <div className="stock-grid">
        {stocks.map((stock) => (
          <div key={stock.id} className="stock-card">
            <img src={stock.image} alt={stock.title} className="stock-image" />
            <h3 className="stock-title">{stock.title}</h3>
            <p className="stock-description">{stock.description}</p>

            <div className="stock-actions">
              <button className="edit-btn" onClick={() => handleEdit(stock)}>
                ✏️ Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(stock.id)}
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show Edit Modal */}
      {editStock && (
        <EditStock
          stock={editStock}
          onSave={handleSave}
          onCancel={() => setEditStock(null)}
        />
      )}
    </div>
  );
};

export default Stock;
