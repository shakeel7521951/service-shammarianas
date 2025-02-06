import React from "react";
import { ToastContainer } from "react-toastify";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#1e1e2f",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#e0e0e0",
        position: "sticky",
        top: 0,
        width: "93%",
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          fontWeight: "600",
          fontFamily: "Poppins, sans-serif",
          color: "#ff9800",
        }}
      >
        Admin Pannel
      </div>
      <ToastContainer />
      <nav>
        <ul
          style={{
            display: "flex",
            gap: "30px",
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <a
              href="/"
              style={{
                color: "#e0e0e0",
                fontSize: "16px",
                fontWeight: "500",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#ff9800")}
              onMouseOut={(e) => (e.target.style.color = "#e0e0e0")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/admin/dashboard"
              style={{
                color: "#e0e0e0",
                fontSize: "16px",
                fontWeight: "500",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#ff9800")}
              onMouseOut={(e) => (e.target.style.color = "#e0e0e0")}
            >
              Dashboard
            </a>
          </li>
          {/* <li>
            <a
              href="#services"
              style={{
                color: "#e0e0e0",
                fontSize: "16px",
                fontWeight: "500",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#ff9800")}
              onMouseOut={(e) => (e.target.style.color = "#e0e0e0")}
            >
              LogIn
            </a>
          </li>
          <li>
            <a
              href="#contact"
              style={{
                color: "#e0e0e0",
                fontSize: "16px",
                fontWeight: "500",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.color = "#ff9800")}
              onMouseOut={(e) => (e.target.style.color = "#e0e0e0")}
            >
              Logout
            </a>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
