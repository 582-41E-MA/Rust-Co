import React from "react";
import './Info.css';

function Info() {
  return (
  <div className="info-wrapper top-0 left-0 w-full h-full flex justify-center items-center">
    <div className="info-background bg-white_1 bg-opacity-10 rounded-lg p-8">
      <div className="info-grid grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div className="info-containers mx-4 w-64 ">
          <img src="/icons/steering.png" alt="" className="object-cover rounded-full" />
          <h1 className="text-3xl mt-4">Nos Voitures</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className="info-containers mx-4 w-64">
          <img src="/icons/steering.png" alt="" className="object-cover rounded-full" />
          <h1 className="text-3xl mt-4">Notre Compagnie</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className="info-containers mx-4 w-64">
          <img src="/icons/steering.png" alt="" className="object-cover rounded-full" />
          <h1 className="text-3xl mt-4">Notre Clientèle</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div className="info-containers mx-4 w-64">
          <img src="/icons/steering.png" alt="" className="object-cover rounded-full" />
          <h1 className="text-3xl mt-4">Garantie</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Info;
