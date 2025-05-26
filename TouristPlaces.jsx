import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
// Removed unused import
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";

const FOURSQUARE_API_KEY = "fsq3bR2ZSdYTD6aJx4cIN64OgWLS1N9ZZQxilWdPfpL+36E=";

// Fallback local images (make sure they exist in public/assets/images/TouristPlaces/)
const fallbackImages = Array.from({ length: 10 }, (_, i) => 
  `/assets/images/TouristPlaces/tourist${i + 1}.jpg`
);

const TouristPlaces = ({ location, userid }) => {
  const userId = userid?.userid;
  // Removed unused variable
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedPlaces, setSavedPlaces] = useState(new Set());
  const navigate = useNavigate();

  const navigateToGoogleMaps = (latitude, longitude) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      "_blank"
    );
  };

  useEffect(() => {
    if (!userId) return;
    const fetchSavedPlaces = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/saved-places/${userId}`
        );
        const savedIds = response.data.map((place) => place.place_id);
        setSavedPlaces(new Set(savedIds));
      } catch (error) {
        console.error("Error fetching saved places:", error);
      }
    };
    fetchSavedPlaces();
  }, [userId]);

  useEffect(() => {
    if (!location) return;

    const fetchHistoricalPlaces = async () => {
      try {
        const geoResponse = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          { params: { q: location, format: "json", limit: 1 } }
        );

        if (geoResponse.data.length === 0) {
          setError("Location not found.");
          return;
        }

        const { lat, lon } = geoResponse.data[0];

        const placesResponse = await axios.get(
          "https://api.foursquare.com/v3/places/search",
          {
            headers: { Authorization: FOURSQUARE_API_KEY },
            params: {
              ll: `${lat},${lon}`,
              categories: "16000",
              sort: "POPULARITY",
              limit: 16,
            },
          }
        );

        if (!placesResponse.data.results || placesResponse.data.results.length === 0) {
          setError("No historical places found nearby.");
          return;
        }

        const usedFallbackIndexes = new Set();

        const placesWithImages = await Promise.all(
          placesResponse.data.results.map(async (place, index) => {
            try {
              const photoResponse = await axios.get(
                `https://api.foursquare.com/v3/places/${place.fsq_id}/photos`,
                { headers: { Authorization: FOURSQUARE_API_KEY } }
              );

              if (photoResponse.data.length > 0) {
                const photo = photoResponse.data[0];
                place.image = `${photo.prefix}300x300${photo.suffix}`;
              } else {
                // Assign unique fallback image
                let fallbackIndex = index % fallbackImages.length;
                while (usedFallbackIndexes.has(fallbackIndex)) {
                  fallbackIndex = (fallbackIndex + 1) % fallbackImages.length;
                }
                usedFallbackIndexes.add(fallbackIndex);
                place.image = fallbackImages[fallbackIndex];
              }
            } catch (err) {
              let fallbackIndex = index % fallbackImages.length;
              while (usedFallbackIndexes.has(fallbackIndex)) {
                fallbackIndex = (fallbackIndex + 1) % fallbackImages.length;
              }
              usedFallbackIndexes.add(fallbackIndex);
              place.image = fallbackImages[fallbackIndex];
            }
            return place;
          })
        );

        setPlaces(placesWithImages);
        setError("");
      } catch (err) {
        console.error("Error fetching historical places:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalPlaces();
  }, [location]);

  const toggleSavePlace = async (place) => {
    if (!userId) {
      alert("Please log in to save Tourist Places.");
      navigate("/signin");
      return;
    }

    const placeId = String(place.fsq_id);

    try {
      if (savedPlaces.has(placeId)) {
        await axios.post("http://localhost:8000/delete-place", {
          userId,
          placeId,
        });
        setSavedPlaces((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.delete(placeId);
          return updatedSet;
        });
      } else {
        await axios.post("http://localhost:8000/save-place", {
          userId,
          placeId,
          name: place.name || "Unknown Place",
          address: place.location?.formatted_address || "Address not available",
          latitude: place.geocodes?.main?.latitude || 0,
          longitude: place.geocodes?.main?.longitude || 0,
          image: place.image || "",
        });
        setSavedPlaces((prev) => new Set([...prev, placeId]));
      }
    } catch (error) {
      console.error("Error toggling save state:", error);
    }
  };

  const sharePlace = async (place) => {
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${place.geocodes?.main?.latitude},${place.geocodes?.main?.longitude}`;
    const shareText = `🏛 Explore this place: ${place.name} 📍 Address: ${place.location?.formatted_address || "Not available"} 📌 Google Maps: ${googleMapsLink}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: place.name, text: shareText });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Sharing is not supported in this browser. Place details copied to clipboard!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Top Historical Places in {location}</h1>
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {places.map((place) => {
          const placeId = String(place.fsq_id);
          return (
            <div
              key={place.fsq_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                width: "280px",
                textAlign: "center",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onClick={() =>
                navigateToGoogleMaps(
                  place.geocodes.main.latitude,
                  place.geocodes.main.longitude
                )
              }
            >
              <img
                src={place.image}
                alt={place.name}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  height: "150px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src = "/assets/images/hospitals/default.jpg";
                }}
              />
              <h3 style={{ margin: "10px 0" }}>{place.name}</h3>
              <p style={{ marginBottom: "10px" }}>
                {place.location?.formatted_address || "Address not available"}
              </p>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  paddingTop: "10px",
                }}
              >
                <button
                  style={{
                    padding: "6px 12px",
                    background: "navy",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigateToGoogleMaps(
                      place.geocodes.main.latitude,
                      place.geocodes.main.longitude
                    )
                  }
                >
                  Directions
                </button>
                <button
                  style={{
                    padding: "6px 12px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    sharePlace(place);
                  }}
                >
                  <ShareIcon />
                </button>
                <button
                  style={{
                    padding: "6px 12px",
                    background: savedPlaces.has(placeId)
                      ? "gray"
                      : "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSavePlace(place);
                  }}
                >
                  <FavoriteIcon
                    style={{ color: savedPlaces.has(placeId) ? "red" : "white" }}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TouristPlaces;