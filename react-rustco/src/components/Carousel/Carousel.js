import React, { useState, useEffect } from 'react';
import './Carousel.css';

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
        <button onClick={prevSlide} className="carousel-button carousel-button-prev custom-shadow_2 bg-black_1 opacity-90 ">
          Prev
        </button>
        <button onClick={nextSlide} className="carousel-button carousel-button-next custom-shadow_2 bg-black_1 opacity-90 ">
          Next
        </button>
      </div>
    </div>
  );
}

export default CarouselC;
