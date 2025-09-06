import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path based on your structure
import "../CSS/donor_managment.css";

const DonorManagement = () => {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "donors"));
        const donorList = [];
        querySnapshot.forEach((docSnap) => {
          donorList.push({ id: docSnap.id, ...docSnap.data() });
        });
        setDonors(donorList);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "donors", id));
      setDonors((prev) => prev.filter((donor) => donor.id !== id));
    } catch (error) {
      console.error("Error deleting donor:", error);
    }
  };

  const filteredDonors = donors.filter((donor) =>
    donor.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="donor-management">
      <h2>Donor Management</h2>

      <input
        type="text"
        placeholder="Search by name..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="donor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Type</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Last Donated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.map((donor) => (
            <tr key={donor.id}>
              <td>{donor.name || "N/A"}</td>
              <td>{donor.bloodType || donor.bloodGroup || "N/A"}</td>
              <td>{donor.location || "N/A"}</td>
              <td>{donor.contact || donor.phone || "N/A"}</td>
              <td>{donor.lastDonated || "N/A"}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(donor.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredDonors.length === 0 && (
            <tr>
              <td colSpan="6">No donors found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonorManagement;
