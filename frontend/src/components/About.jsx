import React from "react";
import "./About.css";

import img1 from "../assets/t1.jpeg";
import img2 from "../assets/t2.jpeg";
import img3 from "../assets/t3.jpeg";
import img4 from "../assets/t4.jpeg";
import img5 from "../assets/t5.jpeg";

const places = [
  { img: img1, title: "Nusa Penida Island", location: "California, USA" },
  { img: img2, title: "Hidden Coast", location: "Bali, Indonesia" },
  { img: img3, title: "Mountain Retreat", location: "Swiss Alps" },
  { img: img4, title: "City Escape", location: "Tokyo, Japan" },
  { img: img5, title: "Green Valley", location: "New Zealand" },
];

function About() {
  return (
    <>
      <section id="about" className="about">
        <div className="about-container">
          <h2 className="section-title">Popular Places</h2>
          <div className="places-scroll">
            {places.map((place, index) => (
              <div key={index} className="place-card">
                <img src={place.img} alt={place.title} />
                <div className="place-info">
                  <h3>{place.title}</h3>
                  <p>{place.location}</p>
                </div>
                <button className="fav-btn">❤️</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="faqs">
        <div className="faqs-container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>❓ How does the AI trip planner work?</h3>
            <p>
              Our AI uses your travel preferences, trip duration, and budget to
              generate personalized itineraries with recommendations for places,
              activities, and food.
            </p>
          </div>
          <div className="faq-item">
            <h3>❓ Is this service free?</h3>
            <p>
              Yes! You can use the basic trip planning features for free. Premium
              features like advanced itinerary customization are available in our
              paid plan.
            </p>
          </div>
          <div className="faq-item">
            <h3>❓ Can I book flights and hotels through this platform?</h3>
            <p>
              Currently, we provide recommendations with links to trusted booking
              sites. Direct booking integration is coming soon!
            </p>
          </div>
          <div className="faq-item">
            <h3>❓ Do I need an account to use the platform?</h3>
            <p>
              No, you can explore without signing up. But creating an account
              helps save your itineraries and preferences for future trips.
            </p>
          </div>
        </div>
      </section>

      <section className="about-text-section">
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            We help travelers explore the world’s most beautiful places with
            AI-powered recommendations and custom tours. Our mission is to make
            travel planning easier, smarter, and more personalized so you can
            focus on creating unforgettable experiences.
          </p>
        </div>
      </section>

      <section id="reviews" className="reviews">
        <div className="reviews-container">
          <h2>What Our Travelers Say</h2>
          <div className="review-cards">
            <div className="review-card">
              <p>
                "This platform made my Europe trip so smooth! The AI suggestions
                saved me hours of planning."
              </p>
              <h4>- Sarah L.</h4>
            </div>
            <div className="review-card">
              <p>
                "I loved how easy it was to discover hidden gems in the city.
                Highly recommended!"
              </p>
              <h4>- Amit R.</h4>
            </div>
            <div className="review-card">
              <p>
                "Best travel experience ever! Everything was personalized to my
                taste."
              </p>
              <h4>- Emily W.</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
