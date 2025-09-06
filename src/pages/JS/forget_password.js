import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase"; // Ensure correct import
import { sendPasswordResetEmail } from "firebase/auth";
import "../CSS/Auth.css";
import forgotPasswordImage from "../../images/bloodlogo.png"; 

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your email.");
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={forgotPasswordImage} alt="Reset Password" className="signup-image" />

        <form onSubmit={handleResetPassword} className="auth-form">
          <div className="auth-field">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          {message && <p className="success-text">{message}</p>}
          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="auth-button">Reset Password</button>
        </form>

        <p className="auth-text">
          Remember your password? <Link to="/Login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
