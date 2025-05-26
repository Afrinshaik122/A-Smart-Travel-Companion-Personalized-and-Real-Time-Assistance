import React, { useEffect, useState } from "react";
import axios from "axios";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../context/AuthContext";

const SavedHospitals = () => {
  const { user } = useAuth();
  const [savedHospitals, setSavedHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchSavedHospitals = async () => {
      try {
        const userRes = await axios.get("http://localhost:8000/get-user-id", {
          params: { email: user.email },
        });

        const userId = userRes.data.userId;
        if (!userId) return;

        const hospitalRes = await axios.get(
          `http://localhost:8000/saved-hospitals/${userId}`
        );
        setSavedHospitals(hospitalRes.data);
      } catch (err) {
        console.error("Error fetching saved hospitals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedHospitals();
  }, [user]);

  const navigateToGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  const shareHospital = (hospital) => {
    const shareText = `🏥 Check out "${hospital.name}" at "${hospital.address}"
🗺 Google Maps: https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`;
    const shareData = { title: hospital.name, text: shareText };
    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error("Share error:", err));
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  const unsaveHospital = async (hospitalId) => {
    try {
      const userRes = await axios.get("http://localhost:8000/get-user-id", {
        params: { email: user.email },
      });
      const userId = userRes.data.userId;

      console.log("Unsave Request:", { userId, hospitalId });

      await axios.post("http://localhost:8000/delete-hospital", {
        userId: userId,
        hospitalId: hospitalId,
      });

      setSavedHospitals((prev) =>
        prev.filter((hospital) => hospital.hospital_id !== hospitalId)
      );
    } catch (err) {
      console.error("Error unsaving hospital:", err);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>Saved Hospitals</h2>
      {loading ? (
        <p style={{ textAlign: "center", color: "gray" }}>Loading...</p>
      ) : savedHospitals.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No saved hospitals.</p>
      ) : (
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            padding: "10px",
            marginTop: "20px",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {savedHospitals.map((hospital) => (
            <div
              key={hospital.hospital_id}
              style={{
                flex: "0 0 auto",
                scrollSnapAlign: "start",
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "345px",
                padding: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() =>
                navigateToGoogleMaps(hospital.latitude, hospital.longitude)
              }
            >
              <img
                src={
                  hospital.photo ||
                  "https://via.placeholder.com/250x150.png?text=No+Image"
                }
                alt={hospital.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/250x150.png?text=No+Image")
                }
              />
              <h3 style={{ margin: "10px 0 5px" }}>{hospital.name}</h3>
              <p style={{ color: "#666", fontSize: "14px" }}>{hospital.address}</p>

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
                  style={buttonStyle("navy")}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToGoogleMaps(hospital.latitude, hospital.longitude);
                  }}
                >
                  Directions
                </button>
                <button
                  style={buttonStyle("#28a745")}
                  onClick={(e) => {
                    e.stopPropagation();
                    shareHospital(hospital);
                  }}
                >
                  <ShareIcon />
                </button>
                <button
                  style={buttonStyle("#6c757d")}
                  onClick={(e) => {
                    e.stopPropagation();
                    unsaveHospital(hospital.hospital_id);
                  }}
                >
                  <FavoriteIcon style={{ color: "red" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const buttonStyle = (bgColor) => ({
  padding: "6px 12px",
  backgroundColor: bgColor,
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
});

export default SavedHospitals;