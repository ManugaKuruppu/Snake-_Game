
import React, { useState } from "react";
import PlayerForm from "../components/PlayerForm";
import Instructions from "../components/Instructions";
import LoadingScreen from "../components/LoadingScreen";
import "../styles/PlayerForm.css";

const PlayerFormPage = ({ onSubmit, level }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (name) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(name);
    }, 1200); // 1.2s loading effect
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="landing-hero">
      <div className="hero-content">
        <div className="hero-logo-title">
          <div className="snake-emoji">🐍</div>
          <h1 className="hero-title">Snake Game</h1>
        </div>
        <div className="hero-subtitle">A modern, fun, and challenging twist on the classic arcade game.</div>
        <div className="hero-author">by <span>ManugaKuruppu</span></div>
        <div className="hero-divider" />
        <div className="form-instructions-row">
          <PlayerForm onSubmit={handleSubmit} />
          <div className="hero-instructions">
            <Instructions level={level || 1} />
          </div>
        </div>
      </div>
      <div className="hero-bg-graphic" />
    </div>
  );
};

export default PlayerFormPage;
