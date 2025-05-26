import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";

const Temples = ({ location, userid }) => {
  const [religiousSites, setReligiousSites] = useState([]);
  const [savedSites, setSavedSites] = useState(new Set());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    setError("");

    axios
      .get("http://localhost:8000/religious-sites", {
        params: { location },
      })
      .then((response) => {
        setReligiousSites(response.data);
        // console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch religious sites. Please try again.");
        console.error("Error fetching religious sites:", error);
        setLoading(false);
      });
  }, [location]);

  useEffect(() => {
    const fetchSavedSites = async () => {
      if (!userid?.userid) return;

      try {
        const response = await axios.get(
          `http://localhost:8000/saved-sites/${userid.userid}`
        );
        const savedIds = new Set(response.data.map((site) => site.site_id));
        setSavedSites(savedIds);
      } catch (error) {
        console.error("Error fetching saved religious sites:", error);
      }
    };

    fetchSavedSites();
  }, [userid?.userid]);

  const toggleSaveSite = async (site) => {
    if (!userid?.userid) {
      alert("Please log in to save sites.");
      navigate("/signin");
      return;
    }

    const siteId = site.id || site.fsq_id;
    if (!siteId) {
      console.error("Site ID is missing. Cannot save site.");
      return;
    }

    try {
      if (savedSites.has(siteId)) {
        await axios.post("http://localhost:8000/delete-site", {
          userId: userid.userid,
          siteId: siteId,
        });
        setSavedSites((prev) => {
          const updated = new Set(prev);
          updated.delete(siteId);
          return updated;
        });
      } else {
        await axios.post("http://localhost:8000/save-site", {
          userId: userid.userid,
          siteId: siteId,
          name: site.name || "Unnamed Site",
          address: site.address || "Address not available",
          photo: site.image || "",
          latitude: site.geocodes?.main?.latitude,
          longitude: site.geocodes?.main?.longitude,
        });
        setSavedSites((prev) => new Set([...prev, siteId]));
      }
    } catch (error) {
      console.error("Error toggling site save state:", error);
    }
  };

  const shareSiteDetails = (site) => {
    const shareData = `
🙏 Check out this religious site: ${site.name}
📍 Address: ${site.address}
🗺 Google Maps: https://www.google.com/maps/search/?api=1&query=${site.geocodes.main.latitude},${site.geocodes.main.longitude}
    `;

    if (navigator.share) {
      navigator
        .share({
          title: "Religious Site Details",
          text: shareData,
        })
        .then(() => console.log("Shared successfully!"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing not supported on this browser. Copying to clipboard...");
      navigator.clipboard.writeText(shareData);
    }
  };

  if (loading) return <p>Loading religious sites...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (religiousSites.length === 0) {
    return (
      <>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Top Religious Places Near {location}
        </h2>
        <p style={{ color: "red" }}>
          No religious sites found for the given location.
        </p>
      </>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Top Religious Places Near {location}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {religiousSites.map((site) => {
          const imageUrl =
            site.image || "https://source.unsplash.com/random/300x300/?temple,church,mosque";

          return (
            <div
              key={site.id || site.fsq_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <img
                  src={imageUrl}
                  alt={site.name || "Religious Site"}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />
                <h3
                  style={{
                    margin: "5px 0",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {site.name}
                </h3>
                <p style={{ margin: "5px 0", color: "#555", fontSize: "14px" }}>
                  {site.address}
                </p>
              </div>

              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  padding: "10px 0",
                  width: "100%",
                }}
              >
                <button
                  style={{
                    padding: "5px 10px",
                    background: "navy",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${site.geocodes.main.latitude},${site.geocodes.main.longitude}`,
                      "_blank"
                    )
                  }
                >
                  Directions
                </button>

                
                <button
                  style={{
                    padding: "5px 10px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                  onClick={() => shareSiteDetails(site)}
                >
                  <ShareIcon />
                </button>
                <button
                  style={{
                    padding: "5px 10px",
                    background: savedSites.has(site.id || site.fsq_id)
                      ? "gray"
                      : "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                  onClick={() => toggleSaveSite(site)}
                >
                  <FavoriteIcon />
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Temples;