import React, { useRef, useEffect, useState } from "react";
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
  const [toggleFilter, setToggleFilter] = useState(false);
  const [builtup, setBuiltup] = useState(false);
  const [residential, setResidential] = useState(false);

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
          <div ref={mapContainer} className="h-screen w-5/6" />
          <div className="w-1/6">
            <div className="h-screen grid place-items-center bg-zinc-100">
              <div className="p-2 bg-white rounded-xl">
                <div className="flex gap-4">
                  <div
                    className={
                      toggleFilter
                        ? "hover:bg-black hover:text-white rounded-xl p-2"
                        : "bg-black text-white rounded-xl p-2"
                    }
                    onClick={() => {
                      setToggleFilter(false);
                    }}
                  >
                    Cities
                  </div>
                  <div
                    className={
                      !toggleFilter
                        ? "hover:bg-black hover:text-white rounded-xl p-2"
                        : "bg-black text-white rounded-xl p-2"
                    }
                    onClick={() => {
                      setToggleFilter(true);
                    }}
                  >
                    Filters
                  </div>
                </div>
              </div>
              {!toggleFilter ? (
                <div className="bg-white rounded-xl gap-2 p-2 m-2">
                  <h1 className="font-bold text-2xl p-2 grid place-items-center text-center">
                    Select a city <br />
                    to visit
                  </h1>
                  <div className="flex flex-col">
                    {cities.map((city, index) => {
                      return (
                        <div
                          key={index}
                          className="rounded-xl p-2 hover:bg-gray-100 flex flex-col items-center"
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
              ) : (
                <div className="bg-white rounded-xl gap-2 p-2 m-2">
                  <div class="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text pr-4">Residential</span>
                      <input
                        type="checkbox"
                        class="toggle toggle-primary"
                        checked={residential}
                        onClick={() => {
                          setResidential(!residential);
                        }}
                      />
                    </label>
                    <label class="label cursor-pointer">
                      <span class="label-text pr-4">Builtup</span>
                      <input
                        type="checkbox"
                        class="toggle toggle-primary"
                        checked={builtup}
                        onClick={() => {
                          setBuiltup(!builtup);
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MapInterface;
