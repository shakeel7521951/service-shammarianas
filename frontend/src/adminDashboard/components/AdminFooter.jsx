import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#1e1e2f", // Dark background for the footer
        color: "#e0e0e0",
        padding: "30px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        bottom: 0,
        width: "93%",
        boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          color: "#e0e0e0",
        }}
      >
        &copy; 2025 My Website. All rights reserved.
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <a
          href="https://www.facebook.com"
          style={{
            color: "#e0e0e0",
            fontSize: "20px",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#ff9800")}
          onMouseOut={(e) => (e.target.style.color = "#e0e0e0")}
        >
          <i className="fa fa-facebook"></i>
        </a>
        <a
          href="https://www.twitter.com"
          style={{
            color: "#e0e0e0",
            fontSize: "20px",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#ff9800")}
          onMouseOut={(e) => (e.target.style.color = "#e0e0e0")}
        >
          <i className="fa fa-twitter"></i>
        </a>
        <a
          href="https://www.instagram.com"
          style={{
            color: "#e0e0e0",
            fontSize: "20px",
            textDecoration: "none",
            transition: "color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#ff9800")}
          onMouseOut={(e) => (e.target.style.color = "#e0e0e0")}
        >
          <i className="fa fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
