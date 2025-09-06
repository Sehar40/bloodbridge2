import React, { useState } from "react";
import "../CSS/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../../images/bloodlogo.png";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check Firestore for user role
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // Redirect based on admin flag
        if (userData.isAdmin) {
          navigate("/Admin");
        } else {
          navigate("/Home");
        }
      } else {
        setError("User record not found in database.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={signupImage} alt="Sign Up" className="signup-image" />

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="auth-button">Login</button>
        </form>

        <p className="auth-text">
          <Link to="/forget_password" className="auth-link">Forgot Password?</Link>
        </p>
        <p className="auth-text">
          Don't have an account? <Link to="/SignUp" className="auth-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
