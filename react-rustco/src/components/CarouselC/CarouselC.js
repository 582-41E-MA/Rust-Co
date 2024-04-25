import { Carousel } from "flowbite-react";

function CarouselC() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 ">
      <Carousel
      slideInterval={5000}
      pauseOnHover
      >
        <img src="/img/cover1.png" alt="Cover 1"/>
        <img src="/img/cover2.png" alt="Cover 1"/>
        <img src="/img/cover3.png" alt="Cover 1"/>
      </Carousel>
    </div>
  );
}
export default CarouselC;