import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import AdminNavbar from "./components/Admin_navbar";
import "../CSS/see_donor.css";

const DonorListt = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for donors collection
    const unsubscribe = onSnapshot(collection(db, "donors"), (snapshot) => {
      const donorList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDonors(donorList);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) return <p>Loading donors...</p>;

  if (donors.length === 0)
    return <p>No donors found yet. Be the first one to register!</p>;

  return (
    <div className="donor-list-page">
      <AdminNavbar />
      <h2>Registered Donors</h2>
      <div className="donor-list-container">
        {donors.map((donor) => (
          <div key={donor.id} className="donor-card">
            <h3>{donor.name}</h3>
            <p><strong>Age:</strong> {donor.age}</p>
            <p><strong>Gender:</strong> {donor.gender}</p>
            <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
            <p><strong>Phone:</strong> {donor.phone}</p>
            <p><strong>Email:</strong> {donor.email}</p>
            <p><strong>City:</strong> {donor.location}</p>
            <p><strong>Last Donation:</strong> {donor.lastDonation || "N/A"}</p>
            <p><strong>Medical Conditions:</strong> {donor.medicalConditions || "None"}</p>
            <p><strong>Donations Count:</strong> {donor.donationsCount || 0}</p>
            <p><strong>Status:</strong> {donor.available ? "Available" : "Not Available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorListt;
