import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditStock from "./EditStock";
import "./AdminStocks.css";

import {
  useGetStocksQuery,
  useDelStockMutation,
} from "../../features/stocksApi";
import { toast } from "react-toastify";

const AdminStocks = () => {
  const { data, isLoading, error } = useGetStocksQuery();
  const [delStock] = useDelStockMutation();
  const navigate = useNavigate();

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    if (data?.stocks) {
      setStocks(data.stocks);
    }
  }, [data]);

  const [editStock, setEditStock] = useState(null);

  const handleEdit = (stock) => {
    setEditStock(stock);
  };

  const handleDelete = async (id) => {
    setStocks((prevStocks) => prevStocks.filter((stock) => stock._id !== id));
    await delStock(id);
    toast.success("Stock Removed Successfully");
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 30
      ? words.slice(0, 30).join(" ") + "..."
      : description;
  };

  if (isLoading) {
    return <p>Loading stocks...</p>;
  }

  if (error) {
    return <p>Error loading stocks. Please try again later.</p>;
  }

  return (
    <div className="stock-container">
      <h2 className="stock-heading-title">📦 Stock Management</h2>

      <button
        className="add-stocks-btn"
        onClick={() => navigate("/admin/add-stock")}
      >
        ➕ Add New Stock
      </button>
      <div className="stock-grid">
        {stocks.length > 0 ? (
          stocks.map((stock) => {
            const isVideo = stock.stockImageUrl?.match(/\.(mp4|mov|avi|mkv)$/i);
            return (
              <div key={stock.id} className="stock-card" style={{maxWidth:'320px'}}>
                {isVideo ? (
                  <video
                    muted
                    loop
                    autoPlay
                    className="stock-video"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "300px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  >
                    <source src={stock.stockImageUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={stock.stockImageUrl}
                    alt={stock.title}
                    className="stock-image"
                  />
                )}
                <h3 className="stock-title">{stock.title}</h3>
                <p className="stock-description">
                  {truncateDescription(stock.stockDescription)}
                </p>
                <p className="stock-price">{stock.price} $</p>
                <div className="stock-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(stock)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(stock._id)}
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No stocks available.</p>
        )}
      </div>

      {editStock && (
        <EditStock stock={editStock} onCancel={() => setEditStock(null)} />
      )}
    </div>
  );
};

export default AdminStocks;
