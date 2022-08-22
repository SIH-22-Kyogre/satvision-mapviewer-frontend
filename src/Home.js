import React from "react";
import Mumbai from "./assets/gateway-of-india-mumbai.svg";
import Delhi from "./assets/india-gate-delhi.svg";
import Kolkata from "./assets/victoria-memorial-kolkata.svg";
import Bengaluru from "./assets/vidhana-soudha-bengaluru.svg";

function Home() {
  // Note that coords: [longitude, latitude]
  let cities = [
    { name: "Bengaluru", coords: [77.5946, 12.9716], icon: Bengaluru },
    { name: "Delhi", coords: [77.1025, 28.7041], icon: Delhi },
    { name: "Kolkata", coords: [88.3639, 22.5726], icon: Kolkata },
    { name: "Mumbai", coords: [72.8777, 19.076], icon: Mumbai },
  ];
  return (
    <div className="h-screen grid place-items-center bg-gray-300 text-center">
      <div className="bg-white p-4 rounded-xl gap-2">
        <h1 className="font-bold text-2xl p-2">Select a city to visit</h1>
        <div className="flex">
          {cities.map((city) => {
            return (
              <div className="rounded-xl p-2 hover:bg-gray-100">
                <img src={city.icon} alt={city.name}></img>
                <p>{city.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
