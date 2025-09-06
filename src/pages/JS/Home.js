import React, { useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import bloodbox from "../../images/bloodbox.jpg";

import "../CSS/Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "donationRequests"), where("toUserId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newRequest = change.doc.data();
          alert(`New donation request from: ${newRequest.fromUserName || "Someone"}`);
        }
      });
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="home-container">
      <nav className="navbar">
        <Navbar />
      </nav>

      {/* Hero Section */}
      <div className="background" style={{ backgroundColor: "#2b0000", color: "#fff" }}>
        <div className="top-content">
          <div className="text-section">
            <h2>BloodBridge Connect, Donate, Save Lives</h2>
            <p>
              Welcome to BloodBridge—your trusted platform to connect blood donors with recipients. Discover the power of compassion and community as we bridge the gap between those who want to help and those in need.
            </p>
            <p>
              Join our platform to browse local donors, register your blood request or donation, and contribute to a life-saving network powered by people like you.
            </p>
          </div>
        </div>
      </div>

      {/* Extra Content */}
      <div className="extra-content">
        <div className="extra-text">
          <h2>How BloodBridge Works</h2>
          <p>
            BloodBridge connects people needing blood with those willing to donate in real time. Our platform provides an easy-to-use interface where users can:
            <ul>
              <li> Register as donors or recipients</li>
              <li> Search for donors nearby</li>
              <li> Get alerts when a match is found</li>
              <li>Stay secure with verified users and protected data</li>
            </ul>
            Start saving lives with just a few clicks.
          </p>
          <button
            type="button"
            className="extra-content-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        <div className="extra-image">
          <img src={bloodbox} alt="Reading Journey" className="extra-home-image" />
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section" style={{ backgroundColor: "#191919", color: "#edf2f4", textAlign: "center", padding: "2rem" }}>
        <h2 style={{ color: "#ffffff" }}>Meet Our Team</h2>
        <div className="team-slider" style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
          <div className="team-card" style={{ background: "#292929", padding: "1rem", borderRadius: "16px", width: "200px" }}>
            <strong style={{ color: "#ffffff" }}>Saher Akbar</strong>
            <p style={{ color: "#ffffff" }}>Medical Advisor</p>
          </div>
          <div className="team-card" style={{ background: "#292929", padding: "1rem", borderRadius: "16px", width: "200px" }}>
            <strong style={{ color: "#ffffff" }}>Iqra Khokhar</strong>
            <p style={{ color: "#ffffff" }}>Lead Developer</p>
          </div>
          <div className="team-card" style={{ background: "#292929", padding: "1rem", borderRadius: "16px", width: "200px" }}>
            <strong style={{ color: "#ffffff" }}>Komal Parveen</strong>
            <p style={{ color: "#ffffff" }}>Operations Manager</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
