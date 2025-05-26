import React, { useState } from "react";
import VideoSlider from "../components/videoslider/videoSlider";
import Middle from "../components/Middle/Middle";
import Destinations from "../components/Destinations/Destinations";
import TabSection from "../components/TabSection/TabSection";
import ContactCTA from "../components/ContactCTA/ContactCTA";


const Home = (userid) => {
  const defaultLocation = "Delhi"; // Default location
  const defaultDate = new Date().toISOString().split("T")[0]; // Default to today's date

  const [location, setLocation] = useState("");
  const [date, setDate] = useState(""); // Initialize with default date

  const handleLocationSubmit = (selectedLocation, selectedDate, selectedDistance) => {
    setLocation(selectedLocation);
    setDate(selectedDate || defaultDate);
  };

  return (
    <div>
      <VideoSlider />
      <Middle />
      <Destinations onLocationSubmit={handleLocationSubmit} />
      <TabSection location={location || defaultLocation} date={date || defaultDate} userid={userid}/>
      <ContactCTA />
    </div>
  );
};

export default Home;