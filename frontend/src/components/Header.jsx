

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { initializeGoogleSignIn } from "../auth/GoogleAuth";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(window.atob(base64));

      const googleUser = {
        name: decodedPayload.name,
        email: decodedPayload.email,
      };

      setUser(googleUser);
      navigate("/chatbot"); // Navigate to chatbot after login
    };

    initializeGoogleSignIn(handleCredentialResponse);
  }, [navigate]);

  return (
    <header className="header">
      <div className="logo">Travel AI</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/reviews">Reviews</Link>
      </nav>

      {user ? (
        <div className="user-info">
          Welcome, {user.name} ({user.email})
        </div>
      ) : (
        <div id="googleSignInButton"></div>
      )}
    </header>
  );
}

export default Header;
