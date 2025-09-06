import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import AdminNavbar from "./components/Admin_navbar";
import Footer from "./components/Footer";
import "../CSS/create_donors_list.css";

const DonorsList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "donors"));
        const donorsArray = [];
        querySnapshot.forEach((doc) => {
          donorsArray.push({ id: doc.id, ...doc.data() });
        });
        setDonors(donorsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donors:", error);
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div className="home-container">
      <AdminNavbar />
      <div className="content-container">
        <h2>All Registered Donors</h2>
        {loading ? (
          <p>Loading donors...</p>
        ) : donors.length === 0 ? (
          <p>No donors found.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id}>
                  <td data-label="Name">{donor.name || "N/A"}</td>
                  <td data-label="Blood Group">{donor.bloodGroup || "N/A"}</td>
                  <td data-label="Gender">{donor.gender || "N/A"}</td>
                  <td data-label="Phone">{donor.phone || "N/A"}</td>
                  <td data-label="Location">{donor.location || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DonorsList;
