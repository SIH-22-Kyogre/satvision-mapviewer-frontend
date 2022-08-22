import React, { useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Mumbai from "./assets/gateway-of-india-mumbai.svg";
import Delhi from "./assets/india-gate-delhi.svg";
import Kolkata from "./assets/victoria-memorial-kolkata.svg";
import Bengaluru from "./assets/vidhana-soudha-bengaluru.svg";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJhdmluZGthbm5hbjAxIiwiYSI6ImNsNzJ5dHp4NTExaXkzb3NiYXhraXYwdnQifQ.XHZ07PcTPU6ff2qxg8bcRQ";

function MapInterface() {
  let cities = [
    { name: "Bengaluru", coords: [77.5946, 12.9716], icon: Bengaluru },
    { name: "Delhi", coords: [77.1025, 28.7041], icon: Delhi },
    { name: "Kolkata", coords: [88.3639, 22.5726], icon: Kolkata },
    { name: "Mumbai", coords: [72.8777, 19.076], icon: Mumbai },
  ];
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.1025, 28.7041],
      zoom: 10,
    });
  });

  return (
    <>
      <main>
        <div className="flex">
          <div ref={mapContainer} className="h-screen w-4/6" />
          <div className="w-2/6">
            <div className="h-screen grid place-items-center bg-zinc-100 text-center">
              <div className="bg-white rounded-xl gap-2 p-2 m-2">
                <h1 className="font-bold text-2xl p-2">
                  Select a city to visit
                </h1>
                <div className="flex">
                  {cities.map((city, index) => {
                    return (
                      <div
                        key={index}
                        className="rounded-xl p-2 hover:bg-gray-100"
                        onClick={() => {
                          map.current.flyTo({
                            center: city.coords,
                            essential: true,
                            zoom: 10,
                            duration: 10000,
                          });
                        }}
                      >
                        <img src={city.icon} alt={city.name}></img>
                        <p>{city.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MapInterface;
