// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import ChatbotPage from "./components/Chatbot.jsx";
import AppTS from "./App.tsx"; 

import { AuthProvider } from "./auth/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        {/* Global Header */}
        <Header />

        {/* Routes */}
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
              </>
            }
          />

          {/* Trip Planner page */}
          <Route path="/chatbot" element={<ChatbotPage />} />

          {/* Map + AI Chatbot page */}
          <Route path="/app" element={<AppTS />} />
        </Routes>

        {/* Global Footer */}
        <Footer />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
