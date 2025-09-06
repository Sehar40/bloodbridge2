import React, { useState } from "react";
import "../CSS/Contact_Us.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { db, auth } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitMessage, setSubmitMessage] = useState("");

  const scrollToContactForm = () => {
    const contactForm = document.getElementById("contact-form-container");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage("");

    const adminEmail = "admin@gmail.com"; // hardcoded single admin
    const currentUser = auth.currentUser; // get current logged-in user

    if (!currentUser) {
      setSubmitMessage("You must be logged in to send a message.");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        timestamp: serverTimestamp(),
        status: "unread",
        adminEmail,        // assign admin
        userId: currentUser.uid, // store current user's UID
      });

      setSubmitMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <Navbar />
      </nav>

      <div className="background">
        <div className="top-content">
          <div className="text-section">
            <h2>Contact Us</h2>
            <p>We'd love to hear from you</p>
            <p>
              Whether you have a question, feedback, or just want to say hello — feel free to reach out!
              <br />
              <button type="button" className="content-button" onClick={scrollToContactForm}>
                Get in Touch
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="contact-container" id="contact-form-container">
        <h2 className="contact-heading">Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Enter your message" required value={formData.message} onChange={handleChange}></textarea>
          </div>

          {submitMessage && <p className="submit-message">{submitMessage}</p>}

          <button type="submit" className="contact-button">Send Message</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
