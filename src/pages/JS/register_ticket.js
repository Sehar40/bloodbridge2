import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "../CSS/register_ticket.css";

const RegisterTicket = () => {
  const [movie, setMovie] = useState("");
  const [seat, setSeat] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!movie || !seat || !date || !time || !userName) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "tickets"), {
        movie,
        seat,
        date,
        time,
        userName,
        createdAt: Timestamp.now(),
      });

      setConfirmation("🎟️ Ticket registered successfully!");
      setError("");
      setMovie("");
      setSeat("");
      setDate("");
      setTime("");
      setUserName("");
    } catch (err) {
      setError("Error registering ticket: " + err.message);
    }
  };

  return (
    <div className="register-ticket-container">
      <h2>Register Your Ticket</h2>
      <form className="ticket-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Movie Name"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />
        <input
          type="text"
          placeholder="Seat No. (e.g. A1)"
          value={seat}
          onChange={(e) => setSeat(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button type="submit">Register Ticket</button>

        {confirmation && <p className="success-text">{confirmation}</p>}
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterTicket;
