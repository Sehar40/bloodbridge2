import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import Navbar from "./components/navbar";
import "../CSS/see_donor.css";

// Major cities and their areas in Pakistan
const locationsInPakistan = [
  { city: "Karachi", areas: ["Gulshan-e-Iqbal", "DHA", "Nazimabad", "Clifton", "Korangi", "Malir", "North Karachi", "Gulistan-e-Johar", "Saddar", "Landhi"] },
  { city: "Lahore", areas: ["Model Town", "DHA", "Johar Town", "Gulberg", "Iqbal Town", "Faisal Town", "Shadman", "Wapda Town", "Cantt", "Garden Town"] },
  { city: "Islamabad", areas: ["F-6", "F-7", "F-8", "G-6", "G-7", "G-8", "G-9", "G-10", "I-8", "I-9"] },
  { city: "Rawalpindi", areas: ["Saddar", "Satellite Town", "Bahria Town", "Peshawar Road", "Chaklala", "Westridge", "Gulzar-e-Quaid"] },
  { city: "Faisalabad", areas: ["D Ground", "Peoples Colony", "Jinnah Colony", "Madina Town", "Gulberg", "Samanabad"] },
  { city: "Multan", areas: ["Cantt", "Shah Rukn-e-Alam Colony", "New Multan", "Gulgasht Colony", "Mumtazabad"] },
  { city: "Peshawar", areas: ["University Town", "Hayatabad", "Saddar", "Gulbahar", "Tehkal"] },
  { city: "Quetta", areas: ["Jinnah Town", "Sariab Road", "Satellite Town", "Cantt"] },
  { city: "Hyderabad", areas: ["Latifabad", "Qasimabad", "Cantt", "Gulistan-e-Sajjad"] },
  { city: "Sialkot", areas: ["Cantonment", "Model Town", "Ugoki Road", "Daska Road"] },
  { city: "Bahawalpur", areas: ["Model Town A", "Satellite Town", "Cantt"] },
  { city: "Sargodha", areas: ["Satellite Town", "University Road", "Cantt"] },
  { city: "Sukkur", areas: ["Military Road", "Shahbaz Town", "New Pind"] },
  { city: "Abbottabad", areas: ["Cantt", "Jinnahabad", "Supply Bazaar"] },
  { city: "Mardan", areas: ["Cantt", "Bagh-e-Aram", "Sheikh Maltoon Town"] },
  { city: "Mirpur", areas: ["Allama Iqbal Road", "Sector B-3", "Chakswari"] },
  { city: "Dera Ghazi Khan", areas: ["Block 17", "Pul Daat", "Model Town"] },
  { city: "Rahim Yar Khan", areas: ["Model Town", "Abbasia Town", "Satellite Town"] },
  { city: "Okara", areas: ["Aamer Colony", "Faisal Colony", "Model Town"] },
  { city: "Larkana", areas: ["Nazar Mohalla", "Waleed", "Airport Road"] },
  { city: "Sheikhupura", areas: ["Housing Colony", "Farooqabad", "Sharqpur"] },
  { city: "Jhelum", areas: ["Cantt", "Civil Lines", "Machine Mohalla"] },
  // Add more cities and areas as needed
];

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [filterBloodGroup, setFilterBloodGroup] = useState("");
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [requestsSent, setRequestsSent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "donors"), (snapshot) => {
      const donorList = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setDonors(donorList);
      setFilteredDonors(donorList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = () => {
    const citySearch = searchCity.trim().toLowerCase();
    const bloodGroupFilter = filterBloodGroup;

    let filtered = donors;

    if (citySearch !== "") {
      filtered = filtered.filter((donor) => {
        if (!donor.location) return false;
        return donor.location.trim().toLowerCase() === citySearch;
      });
    }

    if (bloodGroupFilter) {
      filtered = filtered.filter(
        (donor) => donor.bloodGroup === bloodGroupFilter
      );
    }

    setFilteredDonors(filtered);
  };

  const sendRequest = async (donorId) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("You need to be logged in to send requests.");
      return;
    }

    if (requestsSent.includes(donorId)) {
      alert("Request already sent to this donor.");
      return;
    }

    try {
      await addDoc(collection(db, "donationRequests"), {
        fromUserId: currentUser.uid,
        toUserId: donorId,
        timestamp: new Date(),
        status: "pending",
      });
      setRequestsSent([...requestsSent, donorId]);
      alert("Request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  return (
    <div className="donor-list-page">
      <Navbar />
      <h2>Find Donors By City</h2>

      <div style={{ marginBottom: "20px" }}>
        <select
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{ marginRight: "10px", padding: "10px", borderRadius: "6px" }}
        >
          <option value="">All Cities & Areas</option>
          {locationsInPakistan.map((loc) => (
            <optgroup key={loc.city} label={loc.city}>
              {loc.areas.map((area) => (
                <option key={loc.city + '-' + area} value={`${loc.city} - ${area}`}>{loc.city} - {area}</option>
              ))}
            </optgroup>
          ))}
        </select>

        <select
          value={filterBloodGroup}
          onChange={(e) => setFilterBloodGroup(e.target.value)}
          style={{ marginRight: "10px", padding: "10px", borderRadius: "6px" }}
        >
          <option value="">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading donors...</p>
      ) : filteredDonors.length === 0 ? (
        <p>No donors found for the selected filters.</p>
      ) : (
        <div className="donor-list-container">
          {filteredDonors.map((donor) => (
            <div key={donor.id} className="donor-card">
              <h3>{donor.name}</h3>
              <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
              <p><strong>City:</strong> {donor.location}</p>
              <p><strong>Phone:</strong> {donor.phone}</p>
              <p><strong>Donations:</strong> {donor.donationsCount || 0}</p>
              <p><strong>Status:</strong> {donor.available ? "Available" : "Not Available"}</p>
              <button
                className="request-button"
                onClick={() => sendRequest(donor.id)}
                disabled={requestsSent.includes(donor.id)}
              >
                {requestsSent.includes(donor.id)
                  ? "Request Sent"
                  : "Send Request"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorList;
