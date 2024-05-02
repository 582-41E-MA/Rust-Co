import React from "react";
import './Info.css';

function Info() {
  return (
  <div className=" top-0 left-0 w-full h-full flex justify-center items-center">
    <div className="bg-white_1 bg-opacity-10 rounded-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div className="mx-48 w-64 ">
          <img src="/icons/steering.png" alt="" className="object-cover rounded-full" />
          <h1 className="mt-4">Nos Voitures</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>
        <div className="mx-48 w-64">
          <img src="/icons/steering.png" alt="" className="object-cover rounded-full" />
          <h1 className="mt-4">Notre Compagnie</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>
        <div className="mx-48 w-64">
          <img src="/icons/steering.png" alt="" className="object-cover rounded-full" />
          <h1 className="mt-4">Notre Clientèle</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>
        <div className="mx-48 w-64">
          <img src="/icons/steering.png" alt="" className="object-cover rounded-full" />
          <h1 className="mt-4">Garantie</h1>
          <p className="mt-6">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Info;
