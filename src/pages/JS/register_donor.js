import { auth, db } from "../../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import React, { useState, useEffect, useRef } from "react";
import "../CSS/register_donor.css";

// Fix leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

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

const LocationSelector = ({ setCoordinates }) => {
  useMapEvents({
    click(e) {
      setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const MapWithSearch = ({ setCoordinates, coordinates }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const geocoderControl = L.Control.geocoder({
      defaultMarkGeocode: false,
      placeholder: "Search for a city or place...",
      lang: "en",
    })
      .on("markgeocode", function (e) {
        const center = e.geocode.center;
        map.setView(center, 13);
        setCoordinates({ lat: center.lat, lng: center.lng });
      })
      .addTo(map);

    return () => {
      geocoderControl.remove();
    };
  }, [setCoordinates]);

  return (
    <MapContainer
      center={[30.3753, 69.3451]}
      zoom={6}
      style={{ height: "400px", width: "100%" }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationSelector setCoordinates={setCoordinates} />
      {coordinates && <Marker position={[coordinates.lat, coordinates.lng]} />}
    </MapContainer>
  );
};

const BecomeDonor = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    location: "",
    lastDonation: "",
    medicalConditions: "",
  });

  // Removed map selection logic
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });





  const handleSubmit = async () => {
    // Age validation (must be 18+)
    if (parseInt(formData.age, 10) < 18) {
      alert("You must be at least 18 years old to register as a donor.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to register as a donor.");
      setIsSubmitting(false);
      return;
    }



    try {
      // Save donor info in "donors" collection
      await addDoc(collection(db, "donors"), {
        ...formData,
        uid: user.uid,
        timestamp: new Date(),
        available: true,          // Make donor visible in list
        donationsCount: 0,        // Initialize donations count
      });

      // Update the user document to set isDonor = true
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { isDonor: true });

      alert(`Thank you, ${formData.name}, for registering as a donor!`);
      window.location.href = "/"; // Redirect as needed
    } catch (error) {
      console.error("Error saving donor data:", error);
      setSubmitError("Failed to register. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="become-donor-page">
      <div className="become-donor-card">
        <h2>Become a Donor</h2>
        <form
          className="become-donor-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input className="auth-field-input" type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
          <input className="auth-field-input" type="number" name="age" placeholder="Age (must be 18+)" min="18" required onChange={handleChange} />
          <select className="auth-field-input" name="gender" required onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select className="auth-field-input" name="bloodGroup" required onChange={handleChange}>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <input className="auth-field-input" type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
          <input className="auth-field-input" type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
          <select className="auth-field-input" name="location" required onChange={handleChange} value={formData.location}>
            <option value="">Select City & Area</option>
            {locationsInPakistan.map((loc) => (
              <optgroup key={loc.city} label={loc.city}>
                {loc.areas.map((area) => (
                  <option key={loc.city + '-' + area} value={`${loc.city} - ${area}`}>{loc.city} - {area}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <input className="auth-field-input" type="date" name="lastDonation" onChange={handleChange} />
          <textarea className="auth-field-input" name="medicalConditions" placeholder="Any Medical Conditions (if any)" rows="3" onChange={handleChange}></textarea>



          {submitError && (
            <div style={{ color: "red", marginBottom: "10px" }}>{submitError}</div>
          )}

          <button type="submit" className="become-donor-button" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register as Donor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeDonor;
