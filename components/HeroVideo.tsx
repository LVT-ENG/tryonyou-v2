import React from 'react';

const HeroVideo: React.FC = () => (
  <div className="hero-container">
    <video autoPlay muted loop playsInline id="heroVideo">
      <source src="/video_portada.mp4" type="video/mp4" />
      Tu navegador no admite el vídeo.
    </video>
    <div className="hero-text">
      <h1>Don't let them tell you.</h1>
      <a href="#coleccion" className="hero-button">Explore the Collection</a>
    </div>
  </div>
);

export default HeroVideo;
