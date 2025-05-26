import React, { useEffect, useState } from "react";
import axios from "axios";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../context/AuthContext";

const SavedReligiousSites = () => {
  const { user } = useAuth();
  const [savedSites, setSavedSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchSavedSites = async () => {
      try {
        const userRes = await axios.get("http://localhost:8000/get-user-id", {
          params: { email: user.email },
        });
        const userId = userRes.data.userId;
        if (!userId) return;

        const siteRes = await axios.get(
          `http://localhost:8000/saved-sites/${userId}`
        );
        setSavedSites(siteRes.data);
      } catch (err) {
        console.error("Error fetching saved religious sites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedSites();
  }, [user]);

  const navigateToGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, "_blank");
  };

  const shareSite = (site) => {
    const shareText = `🙏 Explore "${site.name}" located at "${site.address}"
🗺 Google Maps: https://www.google.com/maps/search/?api=1&query=${site.latitude},${site.longitude}`;
    const shareData = { title: site.name, text: shareText };
    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error("Share error:", err));
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  const unsaveSite = async (siteId) => {
    try {
      const userRes = await axios.get("http://localhost:8000/get-user-id", {
        params: { email: user.email },
      });

      await axios.post("http://localhost:8000/delete-site", {
        userId: userRes.data.userId,
        siteId,
      });

      setSavedSites((prev) =>
        prev.filter((site) => site.site_id !== siteId)
      );
    } catch (err) {
      console.error("Error unsaving religious site:", err);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>Saved Religious Sites</h2>
      {loading ? (
        <p style={{ textAlign: "center", color: "gray" }}>Loading...</p>
      ) : savedSites.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No saved religious sites.</p>
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
          {savedSites.map((site) => (
            <div
              key={site.site_id}
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
              onClick={() => navigateToGoogleMaps(site.latitude, site.longitude)}
            >
              <img
                src={
                  site.photo ||
                  "https://via.placeholder.com/250x150.png?text=No+Image"
                }
                alt={site.name}
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
              <h3 style={{ margin: "10px 0 5px" }}>{site.name}</h3>
              <p style={{ color: "#666", fontSize: "14px" }}>{site.address}</p>

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
                    navigateToGoogleMaps(site.latitude, site.longitude);
                  }}
                >
                  Directions
                </button>
                <button
                  style={buttonStyle("#28a745")}
                  onClick={(e) => {
                    e.stopPropagation();
                    shareSite(site);
                  }}
                >
                  <ShareIcon />
                </button>
                <button
                  style={buttonStyle("#6c757d")}
                  onClick={(e) => {
                    e.stopPropagation();
                    unsaveSite(site.site_id);
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

export default SavedReligiousSites;