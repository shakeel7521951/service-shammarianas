import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditStock from "./EditStock";
import "./AdminStocks.css"; // Custom CSS file

const AdminStocks = () => {
  const [stocks, setStocks] = useState([
    {
      id: 1,
      title: "Laptop",
      description: "High-end gaming laptop",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2JdsfVOkQCKZhYFr4ezx7DQ7tttjX7AM9pg&s",
    },
    {
      id: 2,
      title: "Smartphone",
      description:
        "Latest smartphone model. Latest smartphone model. Latest smartphone model. Latest smartphone model. Latest smartphone model. Latest smartphone model. Latest smartphone model. Latest smartphone model. Latest smartphone model. Latest smartphone model. Latest smartphone model.",
      image:
        "https://media.gettyimages.com/id/1317587887/photo/trading-charts-on-a-display.jpg?s=612x612&w=gi&k=20&c=-1OWpoM21zE_Rn0c-MZpnyZTJt-C6Y489wefF1jh_Vw=",
    },
    {
      id: 3,
      title: "Headphones",
      description: "Noise-canceling headphones",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOkHxtXooPM4pCji4EfIjeAYBdHCjTvBAsbOYEIAmiR9L7qhWYUN6nbTwqsJIUKiCuW2o&usqp=CAU",
    },
    {
      id: 4,
      title: "Headphones",
      description: "Noise-canceling headphones",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOkHxtXooPM4pCji4EfIjeAYBdHCjTvBAsbOYEIAmiR9L7qhWYUN6nbTwqsJIUKiCuW2o&usqp=CAU",
    },
    {
      id: 5,
      title: "Headphones",
      description: "Noise-canceling headphones",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOkHxtXooPM4pCji4EfIjeAYBdHCjTvBAsbOYEIAmiR9L7qhWYUN6nbTwqsJIUKiCuW2o&usqp=CAU",
    },
    {
      id: 6,
      title: "Headphones",
      description: "Noise-canceling headphones",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOkHxtXooPM4pCji4EfIjeAYBdHCjTvBAsbOYEIAmiR9L7qhWYUN6nbTwqsJIUKiCuW2o&usqp=CAU",
    },
  ]);

  const [editStock, setEditStock] = useState(null);
  const navigate = useNavigate();

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

  // Function to limit description to 30 words
  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 30
      ? words.slice(0, 30).join(" ") + "..."
      : description;
  };
  return (
    <div className="stock-container">
      <h2 className="stock-heading-title">📦 Stock Management</h2>
      {/* Button to redirect to AddStock page */}
      <button
        className="add-stocks-btn"
        onClick={() => navigate("/admin/add-stock")}
      >
        ➕ Add New Stock
      </button>

      <div className="stock-grid">
        {stocks.map((stock) => (
          <div key={stock.id} className="stock-card">
            <img src={stock.image} alt={stock.title} className="stock-image" />
            <h3 className="stock-title">{stock.title}</h3>
            <p className="stock-description">
              {truncateDescription(stock.description)}
            </p>

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

export default AdminStocks;
