import React, { useContext } from "react";
import "./Hero.css";
import heroBg from "../assets/Serene.jpeg"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChatClick = () => {
    if (user) {
      navigate("/chatbot"); 
    } else {
      alert("Please sign in first using the button on the header!");
    }
  };

  return (
    <section
      className="hero"
      id="hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="overlay"></div>
      <div className="hero-content">
        <h1>Never Stop Exploring the World.</h1>
        <p>
          Discover stunning destinations and plan smarter trips with AI-powered
          travel assistance.
        </p>

        <div className="ai-chat-button">
          <input
            type="button"
            value="💬 Use AI Chatbot to Plan Your Trip"
            onClick={handleChatClick}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
