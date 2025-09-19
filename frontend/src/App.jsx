import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot"; 
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <About />
              <Footer />
            </>
          }
        />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
