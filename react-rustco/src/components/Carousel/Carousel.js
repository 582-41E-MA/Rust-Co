import React, { useState, useEffect } from 'react';
import './Carousel.css';

function CarouselC() {
  const [slide, setSlide] = useState(0);
  const images = ['/img/cover1.png', '/img/cover2.png', '/img/cover3.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
      </div>
    </div>
  );
}

export default CarouselC;
