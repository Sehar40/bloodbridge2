import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.css";
import logo from "../../../images/bloodlogo.png";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDonor, setIsDonor] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setActivePath(window.location.pathname);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid);
        try {
          // Fetch user info directly from Firestore
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists() && userSnap.data().isDonor) {
            setIsDonor(true);
          } else {
            setIsDonor(false);
          }
        } catch (error) {
          console.error("Error fetching user info from Firestore:", error);
          setIsDonor(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsDonor(false);
        setUserId(null);
      }
    });

    return () => unsubscribe();
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

  const handleProtectedNavigation = (path, requiresDonor = false) => {
    if (!isLoggedIn) {
      alert("Please signup or login first!");
      navigate("/SignUp");
      return;
    }
    if (requiresDonor && !isDonor) {
      alert("You need to become a donor first!");
      navigate("/register_donor");
      return;
    }
    navigate(path);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="/" className="logo">
        <img src={logo} alt="bloodbridge" className="logo-image" />
      </a>

      {/* Menu Toggle */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        {isLoggedIn ? (
          <>
            <div className="nav-main-links">
              <a
                href="/Home"
                className={`nav-link ${activePath === "/Home" ? "active" : ""}`}
              >
                Home
              </a>
            </div>

            <div className="nav-actions">
              <a
                href="/Contact_Us"
                className={`nav-link ${activePath === "/Contact_Us" ? "active" : ""}`}
              >
                Contact Us
              </a>

              <a
                href="/About_us"
                className={`nav-link ${activePath === "/About_us" ? "active" : ""}`}
              >
                About Us
              </a>

              {!isDonor && (
                <button
                  className="nav-link"
                  onClick={() => handleProtectedNavigation("/register_donor")}
                >
                  Become Donor
                </button>
              )}

              <button
                className="nav-link"
                onClick={() => handleProtectedNavigation("/see_donor")}
              >
                Recipients
              </button>

              {/* Profile Icon at the far right */}
              <button
                className="nav-link profile-icon-btn"
                onClick={() => handleProtectedNavigation("/view_profile")}
                title="Profile / Dashboard"
                style={{ background: "none", border: "none", padding: "0 10px", cursor: "pointer", marginLeft: "auto" }}
              >
                <i className="fas fa-user-circle" style={{ fontSize: "1.7em", color: activePath === "/view_profile" ? "#d32f2f" : "#333" }}></i>
              </button>
            </div>
          </>
        ) : (
          <div className="nav-actions">
            <button
              className="nav-link signup-btn"
              onClick={() => navigate("/SignUp")}
            >
              Signup / Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
