import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "../CSS/registered_ticket.css"; // Create this CSS file for styling

const AdminTicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketRef = collection(db, "tickets");
        const querySnapshot = await getDocs(ticketRef);
        const ticketList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTickets(ticketList);
      } catch (error) {
        console.error("Error fetching tickets: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="admin-ticket-page">
      <h2>🎟️ All Registered Tickets</h2>
      {loading ? (
        <p className="loading">Loading tickets...</p>
      ) : (
        <div className="ticket-table-container">
          <table className="ticket-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Movie</th>
                <th>Seat</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.userName}</td>
                  <td>{ticket.email || "N/A"}</td>
                  <td>{ticket.movie}</td>
                  <td>{ticket.seat}</td>
                  <td>{ticket.date}</td>
                  <td>{ticket.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminTicketPage;
