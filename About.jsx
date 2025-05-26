import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling
import "../pages css/About.css";

// Corrected image imports (fixed folder name and file extensions)
import visionImg from "../Assests/images/about/vision.jpg";
import motiveImg from "../Assests/images/about/motive.jpg";
import whyUsImg from "../Assests/images/about/whyus.jpg";
import planningImg from "../Assests/images/about/planning.jpg";
import weatherImg from "../Assests/images/about/weather.jpeg.jpg";
import healthImg from "../Assests/images/about/health.jpeg.jpg";
import eventsImg from "../Assests/images/about/events.jpeg.jpg";


function App() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Travel Companion</h1>
        <p>Your all-in-one solution for seamless travel experiences!</p>
      </div>

      {/* First Row: Vision, Mission & Why Choose Us */}
      <div className="about-cards">
        <div className="card">
          <img src={visionImg} alt="Vision" className="card-img" />
          <div className="card-body">
            <h2 className="card-title">🚀 Our Vision</h2>
            <p className="card-text">
              We aim to revolutionize travel by integrating real-time planning,
              local insights, and essential services into one easy-to-use platform.
            </p>
          </div>
        </div>

        <div className="card">
          <img src={motiveImg} alt="Motive" className="card-img" />
          <div className="card-body">
            <h2 className="card-title">🎯 Our Motive</h2>
            <p className="card-text">
              Our goal is to simplify travel by providing a one-stop solution that 
              enhances your journey with real-time navigation, local recommendations, 
              emergency assistance, and personalized travel experiences.
            </p>
          </div>
        </div>

        <div className="card">
          <img src={whyUsImg} alt="Why Choose Us" className="card-img" />
          <div className="card-body">
            <h2 className="card-title">💡 Why Choose Us?</h2>
            <p className="card-text">
              Unlike other travel platforms, Travel Companion seamlessly
              integrates essential travel features in one place, reducing the
              need to switch between multiple apps.
            </p>
          </div>
        </div>
      </div>

      {/* Second Row: Services Offered */}
      <h2 className="services-heading">🌍 What We Offer</h2>
      <div className="about-cards">
        <div className="card">
          <img src={planningImg} alt="Smart Travel Planning" className="card-img" />
          <div className="card-body">
            <h2 className="card-title">🗺 Smart Travel Planning</h2>
            <p className="card-text">
              Plan your trip effortlessly with route suggestions and real-time navigation support.
            </p>
          </div>
        </div>

        <div className="card">
          <img 
            src="https://thumbs.dreamstime.com/b/vibrant-composition-global-tourist-attractions-hot-air-balloons-planes-symbolizing-adventure-exploration-343297638.jpg" 
            alt="Local Attractions & Dining" className="card-img" />
          <div className="card-body">
            <h2 className="card-title">📍 Local Attractions & Dining</h2>
            <p className="card-text">
              Discover top-rated tourist spots, local eateries, and hidden gems to make your trip memorable.
            </p>
          </div>
        </div>

        <div className="card">
          <img src={weatherImg} alt="Weather & Geolocation" className="card-img" />
          <div className="card-body">
            <h2 className="card-title">🌦 Weather & Geolocation</h2>
            <p className="card-text">
              Get real-time weather updates and geolocation-based recommendations for your trip.
            </p>
          </div>
        </div>
      </div>

      {/* Third Row: Last 2 Cards */}
      <div className="about-cards">
        <div className="card">
          <img src={healthImg} alt="Health Facility Locator" className="card-img" />
          <div className="card-body">
            <h2 className="card-title">🛑 Health Facility Locator</h2>
            <p className="card-text">
              Find nearby hospitals, clinics, and pharmacies with emergency contact details.
            </p>
          </div>
        </div>

        <div className="card">
          <img src={eventsImg} alt="Live Local Events" className="card-img" />
          <div className="card-body">
            <h2 className="card-title">🎭 Live Local Events</h2>
            <p className="card-text">
              Stay updated with concerts, festivals, and cultural events happening around you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
