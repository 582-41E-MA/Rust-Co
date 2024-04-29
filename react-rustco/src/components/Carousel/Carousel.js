import React, { useState, useEffect } from 'react';
import './Carousel.css';

const FlecheDroite = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" width="48" height="48">
    <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="6.27" y1="12" x2="17.73" y2="12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="12.96 7.23 17.73 12 12.96 16.77" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FlecheGauche = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" width="48" height="48">
    <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="17.73" y1="12" x2="6.27" y2="12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="11.04 16.77 6.27 12 11.04 7.23" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function CarouselC() {
  const [slide, setSlide] = useState(0);
  const images = ['/img/cover1.png', '/img/cover2.png', '/img/cover3.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setSlide((slide + 1) % images.length);
  };

  const prevSlide = () => {
    setSlide((slide - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel-slides" style={{ transform: `translateX(-${slide * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img className="carousel-image" src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button onClick={prevSlide} className="carousel-button carousel-button-prev">
          <FlecheGauche />
        </button>
        <button onClick={nextSlide} className="carousel-button carousel-button-next">
          <FlecheDroite />
        </button>
      </div>
    </div>
  );
}

export default CarouselC;
