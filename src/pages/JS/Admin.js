import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "../CSS/Admin.css";
import AdminNavbar from "./components/Admin_navbar";
import Footer from "./components/Footer";

const AdminHome = () => {
  const [donorsCount, setDonorsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const donorsSnapshot = await getDocs(collection(db, "donors"));
        setDonorsCount(donorsSnapshot.size);

        const usersSnapshot = await getDocs(collection(db, "users"));
        setUsersCount(usersSnapshot.size);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar">
        <AdminNavbar />
      </nav>

      <div className="background">
        <div className="top-content">
          <div className="text-section">
            <h2>Welcome to the Admin Panel</h2>
            <p>Manage your platform efficiently from this centralized dashboard.</p>
            <p>
              As an administrator, you can add new entries, update details, manage user registrations, and monitor activities.
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-stats">
        <h3>Admin Dashboard Overview</h3>
        <div className="stats-cards">
          <div className="stat-card">
            <i className="fas fa-hand-holding-heart fa-2x"></i>
            <h4>Total Donors</h4>
            <p>{donorsCount}</p>
            <button
              className="view-button"
              onClick={() => navigate("/create_donor_list")}
            >
              View Donors
            </button>
          </div>

          <div className="stat-card">
            <i className="fas fa-users fa-2x"></i>
            <h4>Total Users</h4>
            <p>{usersCount}</p>
            <button
              className="view-button"
              onClick={() => navigate("/donor_managment")}
            >
              View Users
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminHome;
