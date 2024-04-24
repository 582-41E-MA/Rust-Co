import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import './Carousel.css';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function CarouselF() {
  return (
    <Carousel 
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={5000}
      draggable={false}
      showDots={true}
      infinite={true}
      keyBoardControl={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      <div class="cover"><img src="/img/cover1.png" alt="Cover 1"></img></div>
      <div class="cover"><img src="/img/cover2.png" alt="Cover 2"></img></div>
      <div class="cover"><img src="/img/cover3.png" alt="Cover 3"></img></div>

    </Carousel> 

  );
}


export default CarouselF;