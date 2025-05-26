import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SavedRestaurants from "../saved items/SavedRestaurants";
import SavedTouristPlaces from "../saved items/SavedTouristPlaces";
import SavedHospitals from "../saved items/SavedHospitals";
import SavedReligiousSites from "../saved items/SavedReligiousSites";
import axios from "axios";

import { Pencil } from "lucide-react"; // Using lucide-react for pencil icon

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const fetchUserDetails = async () => {
    if (!user?.email) return;
    try {
      const response = await axios.get("http://localhost:8000/get-user-details", {
        params: { email: user.email },
      });
      setUserData(response.data);
      setFullName(response.data.full_name || "");
      setPhoneNumber(response.data.phone_number || "");
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:8000/update-user-details", {
        email: user.email,
        full_name: fullName,
        phone_number: phoneNumber,
      });
      setEditingField(null);
      await fetchUserDetails();
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div style={{ backgroundColor: "#f7f9fb", color: "#333", minHeight: "100vh", width: "100vw" }}>
      {/* Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "11px 40px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ fontFamily: "cursive", fontSize: "28px", margin: 0 }}>👤 Profile</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#e63946",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            fontWeight: "bold",
            borderRadius: "6px",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
          }}
        >
          Logout
        </button>
      </div>

      {/* Clean Layout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1000px",
          margin: "60px auto 40px",
          padding: "0 40px",
          flexWrap: "wrap",
        }}
      >
        {/* Left Side - User Info */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          {/* Full Name */}
          <div style={{ marginBottom: "25px", fontSize: "20px", display: "flex", alignItems: "center" }}>
            <strong>👤 Name     :</strong>
            {editingField === "name" ? (
              <>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={handleUpdate}
                  autoFocus
                  style={{
                    padding: "6px",
                    marginLeft: "10px",
                    fontSize: "18px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </>
            ) : (
              <>
                <span style={{ marginLeft: "10px" }}>{userData?.full_name || "Loading..."}</span>
                <Pencil
                  size={18}
                  style={{ marginLeft: "8px", cursor: "pointer", color: "#555" }}
                  onClick={() => setEditingField("name")}
                />
              </>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom: "25px", fontSize: "20px" }}>
            <strong>📧 Email    :</strong>{" "}
            <span style={{ marginLeft: "10px" }}>{user?.email}</span>
          </div>

          {/* Phone */}
          <div style={{ marginBottom: "25px", fontSize: "20px", display: "flex", alignItems: "center" }}>
            <strong>📞 Phone    :</strong>
            {editingField === "phone" ? (
              <>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={handleUpdate}
                  autoFocus
                  style={{
                    padding: "6px",
                    marginLeft: "10px",
                    fontSize: "18px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </>
            ) : (
              <>
                <span style={{ marginLeft: "10px" }}>{userData?.phone_number || "Loading..."}</span>
                <Pencil
                  size={18}
                  style={{ marginLeft: "8px", cursor: "pointer", color: "#555" }}
                  onClick={() => setEditingField("phone")}
                />
              </>
            )}
          </div>

          {/* Created At */}
          <div style={{ marginBottom: "25px", fontSize: "20px" }}>
            <strong>🕒 Created At:</strong>{" "}
            <span style={{ marginLeft: "10px" }}>{formatDate(userData?.created_at)}</span>
          </div>
        </div>

        {/* Right Side - Profile Image */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Profile"
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              objectFit: "cover",
              backgroundColor: "#f0f0f0",
              border: "2px solid #ddd",
            }}
          />
        </div>
      </div>
      <hr/>

      {/* Saved Sections */}
      <SavedRestaurants />
      <SavedTouristPlaces />
      <SavedHospitals />
      <SavedReligiousSites />
    </div>
  );
};

export default Profile;
