import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Admin_Navbar.css";
import logo from "../../../images/bloodlogo.png";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("You have been logged out.");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <nav className="admin-navbar">
      <a href="/Admin" className="admin-logo">
        <img src={logo} alt="Admin Dashboard" className="admin-logo-image" />
      </a>
      <div className="admin-menu-toggle" onClick={toggleMenu}>
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>
      <div className={`admin-nav-links ${isOpen ? "open" : ""}`}>
        <a
          href="/Admin"
          className={`admin-nav-link ${activePath === "/Admin" ? "active" : ""}`}
        >
          Dashboard
        </a>
        <a
          href="/adminmesage"
          className={`admin-nav-link ${activePath === "/adminmesage" ? "active" : ""}`}
        >
          Messages
        </a>
        <a
          href="/donorlist"
          className={`admin-nav-link ${activePath === "/donorlist" ? "active" : ""}`}
        >
          Donors
        </a>
        {/* Profile Icon at far right with dropdown */}
        <div className="admin-profile-menu" style={{ position: "relative", display: "inline-block", marginLeft: "auto" }}>
          <button
            className="admin-nav-link profile-icon-btn"
            style={{ background: "none", border: "none", padding: "0 10px", cursor: "pointer" }}
            onClick={() => setIsOpen(!isOpen)}
            title="Admin Profile"
          >
            <i className="fas fa-user-circle" style={{ fontSize: "1.7em", color: "#333" }}></i>
          </button>
          {isOpen && (
            <div className="admin-profile-dropdown" style={{ position: "absolute", right: 0, top: "2.5em", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", borderRadius: "8px", minWidth: "180px", zIndex: 100 }}>
              <div style={{ padding: "16px", borderBottom: "1px solid #eee" }}>
                <strong>Admin</strong>
                <div style={{ fontSize: "0.95em", color: "#666" }}>admin@yourdomain.com</div>
              </div>
              <button
                style={{ width: "100%", padding: "10px", background: "#d32f2f", color: "white", border: "none", borderRadius: "0 0 8px 8px", cursor: "pointer" }}
                onClick={handleLogout}
              >Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
