import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPromptModal.css";

const LoginPromptModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  const handleLoginRedirect = () => {
    onClose();
    navigate("/signin");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Please Log In</h3>
        <p>You must be logged in to save this restaurant.</p>
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
          <button className="modal-button" onClick={onClose}>Close</button>
          <button className="modal-button primary" onClick={handleLoginRedirect}>Go to Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
