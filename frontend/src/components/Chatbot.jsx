import React from "react";
import { useNavigate } from "react-router-dom";
import "./Chatbot.css";

const ChatbotPage = () => {
  const navigate = useNavigate();

  const handleRun = () => {
    navigate("/app"); 
  };

  return (
    <section className="trip-form-section">
      <h2>AI Trip Planner 🌴</h2>
      <p>Plan your dream trip with personalized itineraries.</p>

      <div className="trip-form">
        <input type="number" placeholder="Travel days" />
        <input type="text" placeholder="Destination" />
        <input type="text" placeholder="Travel style" />
        <button onClick={handleRun}>Run</button>
      </div>
    </section>
  );
};

export default ChatbotPage;
