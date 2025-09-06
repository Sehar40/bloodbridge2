import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../CSS/Auth.css";
import signupImage from "../../images/bloodlogo.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) {
      setError("Name is required!");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Enter a valid email address!");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // Save user in Firestore with isDonor field
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        isDonor: false, // Initialize as false
        createdAt: new Date(),
      });

      setError("");
      alert("Account created successfully! Please login.");
      navigate("/Login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={signupImage} alt="Sign Up" className="signup-image" />

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="auth-field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="auth-button">Sign Up</button>
        </form>

        <p className="auth-text">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
