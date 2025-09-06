import React, { useState, useEffect } from "react";
import "../CSS/adminmesage.css";
import AdminNavbar from "./components/Admin_navbar";
import Footer from "./components/Footer";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query, doc, updateDoc } from "firebase/firestore";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [readIds, setReadIds] = useState([]);

  // Mark as read (local and Firestore)
  const markAsRead = async (msgId) => {
    setReadIds((prev) => [...prev, msgId]);
    try {
      await updateDoc(doc(db, "messages", msgId), { read: true });
    } catch (e) {
      // ignore if field doesn't exist
    }
  };

  // Copy email to clipboard
  const copyEmail = (email) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      alert("Email copied to clipboard!");
    } else {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Email copied to clipboard!");
    }
  };

  useEffect(() => {
    // Query all messages, ordered by timestamp descending
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  // Helper to format timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="admin-messages-page">
      <AdminNavbar />
      <div className="admin-messages-container">
        <h2 className="admin-messages-title"> Admin Inbox</h2>
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet.</p>
        ) : (
          <div className="messages-list">
            {messages.map(msg => (
              <div key={msg.id} className={`message-card${msg.read || readIds.includes(msg.id) ? '' : ' unread'}`}>
                <div className="message-card-header">
                  <div className="message-sender">
                    <span className="sender-name">{msg.name}</span>
                    <span className="sender-email">{msg.email}</span>
                  </div>
                  <div className="message-actions">
                    <button className="copy-email-btn" onClick={() => copyEmail(msg.email)} type="button">Copy Email</button>
                    {!msg.read && !readIds.includes(msg.id) && (
                      <button className="mark-read-btn" onClick={() => markAsRead(msg.id)} type="button">Mark as Read</button>
                    )}
                  </div>
                </div>
                <div className="message-body">{msg.message}</div>
                <div className="message-timestamp">{formatDate(msg.timestamp)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminMessages;
