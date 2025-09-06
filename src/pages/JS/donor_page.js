import React, { useState } from "react";
import "../CSS/donor_page.css";

const DonorPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    bloodType: "",
    location: "",
    contact: "",
  });

  const [donors, setDonors] = useState([
    {
      id: 1,
      name: "Ahmed Raza",
      bloodType: "B+",
      location: "Karachi",
      contact: "0321-4455667",
    },
    {
      id: 2,
      name: "Zainab Tariq",
      bloodType: "O-",
      location: "Lahore",
      contact: "0300-1234567",
    },
  ]);

  const [searchType, setSearchType] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.name && formData.bloodType && formData.location && formData.contact) {
      const newDonor = { ...formData, id: Date.now() };
      setDonors([...donors, newDonor]);
      setFormData({ name: "", bloodType: "", location: "", contact: "" });
    }
  };

  const filteredDonors = donors.filter(
    (donor) =>
      donor.bloodType.toLowerCase().includes(searchType.toLowerCase()) &&
      donor.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div className="donor-page">
      <h1>BloodBridge - Find a Donor or Become One</h1>

      <section className="search-donor">
        <h2>Find a Donor</h2>
        <input
          type="text"
          placeholder="Blood Type (e.g., A+, O-)"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        />
        <input
          type="text"
          placeholder="City or Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <div className="donor-list">
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <div className="donor-card" key={donor.id}>
                <h3>{donor.name}</h3>
                <p>Blood Type: {donor.bloodType}</p>
                <p>Location: {donor.location}</p>
                <p>Contact: {donor.contact}</p>
              </div>
            ))
          ) : (
            <p>No donors match your criteria.</p>
          )}
        </div>
      </section>

      <section className="register-donor">
        <h2>Become a Donor</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Blood Type (e.g., AB+)"
            value={formData.bloodType}
            onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location (City)"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            required
          />
          <button type="submit">Register as Donor</button>
        </form>
      </section>
    </div>
  );
};

export default DonorPage;
