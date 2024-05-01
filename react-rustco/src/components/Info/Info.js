import React from "react";
import './Info.css';

function Info() {
  return (
  <div className="info-wrapper top-0 left-0 w-full h-full flex justify-center items-center">
    <div className="info-background bg-white_1 bg-opacity-10 rounded-lg p-8 pb-6 pt-0">
      <div className="info-grid grid grid-cols-1 gap-12 text-center lg:grid-cols-4 xl:gap-16 2xl:gap-32">
        <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
          <img src="/icons/car.png" alt="" className="object-cover rounded-full" />
          <h1 className="text-3xl mt-4">Nos Voitures</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
          <img src="/icons/logo.png" alt="" className="object-cover rounded-full" />
          <h1 className="text-3xl mt-4">Notre Compagnie</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
          <img src="/icons/folk.png" alt="" className="object-cover rounded-full" />
          <h1 className="text-3xl mt-4">Notre Clientèle</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className="info-containers mx-4 w-64 md:w-96 lg:w-56 xl:w-72 2xl:w-80">
          <img src="/icons/warranty.png" alt="" className="object-cover rounded-full" />
          <h1 className="text-3xl mt-4">Garantie</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Info;
