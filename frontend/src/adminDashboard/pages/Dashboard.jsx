import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useGetBlogsQuery } from "../../features/blogsApi";
import { useGetStocksQuery } from "../../features/stocksApi";

const Dashboard = () => {
  const {
    data: blogsData = [],
    isLoading: blogsLoading,
    error: blogsError,
  } = useGetBlogsQuery();

  const {
    data: stocksData = [],
    isLoading: stocksLoading,
    error: stocksError,
  } = useGetStocksQuery();

  const totalBlogs = Array.isArray(blogsData)
    ? blogsData.length
    : blogsData.blogs?.length || 0;
  const totalStocks = Array.isArray(stocksData)
    ? stocksData.length
    : stocksData.stocks?.length || 0;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/admin/dashboard">📊 Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/all-blogs">📝 Manage Blogs</Link>
            </li>
            <li>
              <Link to="/admin/all-stocks">📦 Manage Stocks</Link>
            </li>
            {/* <li>
              <Link to="/admin/settings">⚙️ Settings</Link>
            </li>
            <li>
              <Link to="/logout">🚪 Logout</Link>
            </li> */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Dashboard Overview</h1>
        <div className="stats-container">
          {/* Blogs Count */}
          <div className="stat-card">
            <h3>Total Blogs</h3>
            {blogsLoading ? (
              <p>Loading...</p>
            ) : blogsError ? (
              <p>Error loading blogs</p>
            ) : (
              <p>{totalBlogs}</p>
            )}
          </div>

          {/* Stocks Count */}
          <div className="stat-card">
            <h3>Total Stocks</h3>
            {stocksLoading ? (
              <p>Loading...</p>
            ) : stocksError ? (
              <p>Error loading stocks</p>
            ) : (
              <p>{totalStocks}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
