import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const TopRestaurants = ({ location, userid }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [savedRestaurants, setSavedRestaurants] = useState(new Set());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const budget = 2;
  const navigate = useNavigate();

  // Fetch nearby restaurants
  useEffect(() => {
    if (!location) return;
    setLoading(true);
    setError("");

    axios
      .get("http://localhost:8000/restaurants", {
        params: { location, budget },
      })
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setError("Failed to load restaurants.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location, budget]);

  // Fetch saved restaurant IDs for the user
  useEffect(() => {
    const fetchSavedRestaurants = async () => {
      if (!userid.userid) return;

      try {
        const response = await axios.get(
          `http://localhost:8000/saved-restaurants/${userid.userid}`
        );
        const savedIds = new Set(
          response.data.map((r) => String(r.restaurant_id))
        );
        setSavedRestaurants(savedIds);
      } catch (error) {
        console.error("Error fetching saved restaurants:", error);
      }
    };

    fetchSavedRestaurants();
  }, [userid.userid]);

  const navigateToGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  const shareRestaurant = (restaurant) => {
    const shareText = `🍽 Check out "${restaurant.name}" in "${restaurant.location.formatted_address}"
🏠 Address: ${restaurant.location.formatted_address}
🗺 Google Maps: https://www.google.com/maps/search/?api=1&query=${restaurant.geocodes.main.latitude},${restaurant.geocodes.main.longitude}`;

    const shareData = {
      title: restaurant.name,
      text: shareText,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) =>
        console.error("Error sharing:", error)
      );
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  const toggleSaveRestaurant = async (restaurant) => {
    if (!userid.userid) {
      alert("Please log in to save restaurants.");
      navigate("/signin");
      return;
    }

    const restaurantIdStr = String(restaurant.id);

    try {
      if (savedRestaurants.has(restaurant.id)) {
        await axios.post("http://localhost:8000/delete-restaurant", {
          user_id:userid.userid,
          restaurantId: restaurant.id,
        });
        setSavedRestaurants((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.delete(restaurant.id);
          return updatedSet;
        });
      } else {
        // Save
        await axios.post("http://localhost:8000/save-restaurant", {
          user_id: userid.userid,
          restaurantId: restaurant.id,
          name: restaurant.name,
          address: restaurant.location.formatted_address,
          photo: restaurant.photo,
          latitude: restaurant.geocodes.main.latitude,
          longitude: restaurant.geocodes.main.longitude,
        });
        setSavedRestaurants((prev) => new Set(prev).add(restaurantIdStr));
      }
    } catch (error) {
      console.error("Error toggling restaurant save state:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Top Restaurants in {location}</h1>
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!loading && restaurants.length === 0 && !error && (
        <p style={{ textAlign: "center", fontSize: "16px", color: "gray" }}>
          No restaurants available for the selected location.
        </p>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {restaurants.map((restaurant, index) => {
          const restaurantIdStr = String(restaurant.id);
          const isSaved = savedRestaurants.has(restaurantIdStr);

          return (
            <div
              key={index}
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
                  restaurant.geocodes.main.latitude,
                  restaurant.geocodes.main.longitude
                )
              }
            >
              <img
                src={
                  restaurant.photo ||
                  "https://via.placeholder.com/250x150.png?text=No+Image"
                }
                alt={restaurant.name}
                style={{ width: "100%", borderRadius: "10px", height: "150px" }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/250x150.png?text=No+Image";
                }}
              />
              <h3>{restaurant.name}</h3>
              <p>{restaurant.location.formatted_address}</p>

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
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToGoogleMaps(
                      restaurant.geocodes.main.latitude,
                      restaurant.geocodes.main.longitude
                    );
                  }}
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
                    shareRestaurant(restaurant);
                  }}
                >
                  <ShareIcon />
                </button>
                <button
                  style={{
                    padding: "6px 12px",
                    background: isSaved ? "gray" : "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveRestaurant(restaurant);
                  }}
                >
                  <FavoriteIcon style={{ color: isSaved ? "red" : "white" }} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopRestaurants;