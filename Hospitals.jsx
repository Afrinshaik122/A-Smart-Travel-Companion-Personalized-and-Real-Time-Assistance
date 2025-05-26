import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from "react-router-dom";

const Hospitals = ({ location, type, userid }) => {
  const [services, setServices] = useState([]);
  const [savedHospitals, setSavedHospitals] = useState(new Set());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const budget = 2;
  const serviceType = type || "hospitals";
  const navigate = useNavigate();

  useEffect(() => {
    if (!location) return;

    setLoading(true);
    axios
      .get(`http://localhost:8000/${serviceType}`, {
        params: { location, budget },
      })
      .then((response) => {
        setServices(response.data);
        setError("");
      })
      .catch((error) => {
        console.error(`Error fetching ${serviceType}:`, error);
        setError(`Failed to fetch ${serviceType} data. Please try again later.`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location, budget, serviceType]);

  useEffect(() => {
    const fetchSavedHospitals = async () => {
      if (!userid?.userid) return;

      try {
        const response = await axios.get(
          `http://localhost:8000/saved-hospitals/${userid.userid}`
        );
        const savedIds = new Set(response.data.map((h) => String(h.hospital_id)));
        setSavedHospitals(savedIds);
      } catch (error) {
        console.error("Error fetching saved hospitals:", error);
      }
    };

    fetchSavedHospitals();
  }, [userid?.userid]);

  const navigateToGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  const shareHospital = (hospital) => {
    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${hospital.geocodes.main.latitude},${hospital.geocodes.main.longitude}`;
    let shareText = `🏥 *Check out this hospital:* ${hospital.name}`;
    if (hospital.location?.formatted_address) {
      shareText += `\n🏠 *Address:* ${hospital.location.formatted_address}`;
    }
    shareText += `\n📍 *Google Maps:* ${googleMapsLink}`;

    const shareData = {
      title: hospital.name,
      text: shareText,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(shareText)
        .then(() => alert("Details copied to clipboard!"))
        .catch((error) => console.error("Error copying to clipboard:", error));
    }
  };

  const toggleSaveHospital = async (hospital) => {
    if (!userid?.userid) {
      alert("Please log in to save hospitals.");
      navigate("/signin");
      return;
    }

    const hospitalId = String(hospital.id);

    try {
      if (savedHospitals.has(hospitalId)) {
        await axios.post("http://localhost:8000/delete-hospital", {
          userId: userid.userid,
          hospitalId,
        });
        setSavedHospitals((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.delete(hospitalId);
          return updatedSet;
        });
      } else {
        await axios.post("http://localhost:8000/save-hospital", {
          userId: userid.userid,
          hospitalId,
          name: hospital.name,
          address: hospital.location.formatted_address,
          photo: hospital.photo,
          latitude: hospital.geocodes.main.latitude,
          longitude: hospital.geocodes.main.longitude,
        });
        setSavedHospitals((prev) => new Set([...prev, hospitalId]));
      }
    } catch (error) {
      console.error("Error toggling hospital save state:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>
        Top {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} in {location}
      </h1>
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!loading && services.length === 0 && !error && (
        <p style={{ textAlign: "center", fontSize: "16px", color: "gray" }}>
          No hospitals available for the selected location.
        </p>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {services.map((hospital, index) => {
          const hospitalId = String(hospital.id);
          const isSaved = savedHospitals.has(hospitalId);

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
                  hospital.geocodes.main.latitude,
                  hospital.geocodes.main.longitude
                )
              }
            >
              <img
                src={
                  hospital.photo ||
                  "https://via.placeholder.com/250x150.png?text=No+Image"
                }
                alt={hospital.name}
                style={{ width: "100%", borderRadius: "10px", height: "150px" }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/250x150.png?text=No+Image";
                }}
              />
              <h3>{hospital.name}</h3>
              <p>{hospital.location?.formatted_address || "No address available"}</p>

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
                      hospital.geocodes.main.latitude,
                      hospital.geocodes.main.longitude
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
                    shareHospital(hospital);
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
                    toggleSaveHospital(hospital);
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

export default Hospitals;