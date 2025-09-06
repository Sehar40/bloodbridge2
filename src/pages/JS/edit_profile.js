import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import "../CSS/Auth.css";

const EditProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Donor info fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [donationStatus, setDonationStatus] = useState(""); // from donationRequests

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) {
      setError("No authenticated user.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch donor info
        const donorDocRef = doc(db, "donors", currentUser.uid);
        const donorDocSnap = await getDoc(donorDocRef);

        if (donorDocSnap.exists()) {
          const donorData = donorDocSnap.data();
          setName(donorData.name || "");
          setEmail(donorData.email || "");
          setGender(donorData.gender || "");
          setLocation(donorData.location || "");
          setPhone(donorData.phone || "");
        } else {
          setError("Donor profile not found.");
        }

        // Fetch donationRequests for this user (assuming `userId` field links requests)
        const requestsQuery = query(
          collection(db, "donationRequests"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(requestsQuery);

        if (!querySnapshot.empty) {
          // Just get status of first request, or you can handle multiple requests
          const firstRequest = querySnapshot.docs[0].data();
          setDonationStatus(firstRequest.status || "No status");
        } else {
          setDonationStatus("No requests found");
        }
      } catch (err) {
        setError("Error loading profile data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentUser) {
      setError("No authenticated user.");
      return;
    }

    try {
      // Update donor info in Firestore
      const donorDocRef = doc(db, "donors", currentUser.uid);
      await updateDoc(donorDocRef, {
        name,
        email,
        gender,
        location,
        phone,
      });

      // Optionally, update Firebase Auth email if changed
      if (currentUser.email !== email) {
        await currentUser.updateEmail(email);
      }

      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Update failed: " + err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Edit Profile</h2>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <form onSubmit={handleUpdate} className="auth-form">
          <div className="auth-field">
            <label>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="auth-field">
            <label>Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value)}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="auth-field">
            <label>Location</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
          </div>

          <div className="auth-field">
            <label>Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          <div className="auth-field">
            <label>Donation Request Status</label>
            <input type="text" value={donationStatus} readOnly />
          </div>

          <button type="submit" className="auth-button">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
