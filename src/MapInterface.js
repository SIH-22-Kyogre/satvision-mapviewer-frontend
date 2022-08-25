import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Mumbai from "./assets/gateway-of-india-mumbai.svg";
import Delhi from "./assets/india-gate-delhi.svg";
import Kolkata from "./assets/victoria-memorial-kolkata.svg";
import Bengaluru from "./assets/vidhana-soudha-bengaluru.svg";
import Hamburger from "hamburger-react";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJhdmluZGthbm5hbjAxIiwiYSI6ImNsNzJ5dHp4NTExaXkzb3NiYXhraXYwdnQifQ.XHZ07PcTPU6ff2qxg8bcRQ";

function MapInterface() {
  let cities = [
    { name: "Bengaluru", coords: [77.5946, 12.9716], icon: Bengaluru },
    { name: "Delhi", coords: [77.209, 28.6139], icon: Delhi },
    { name: "Kolkata", coords: [88.3639, 22.5726], icon: Kolkata },
    { name: "Mumbai", coords: [72.8777, 19.076], icon: Mumbai },
  ];
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [toggleFilter, setToggleFilter] = useState(false);
  const [builtup, setBuiltup] = useState(false);
  const [residential, setResidential] = useState(false);
  const [isHamOpen, setHamOpen] = useState(false);
  const [corners, setCorners] = useState({});

  // Mockup
  let coord_mapping = {
    Bengaluru: [77.4255, 12.8752, 77.7176, 13.065],
    Delhi: [76.5946, 28.366, 77.616, 28.9635],
    Kolkata: [88.1708, 22.4857, 88.4947, 22.685],
    Mumbai: [72.6015, 18.9002, 73.1554, 19.2492],
  };

  const [currentCity, setCurrentCity] = useState("Delhi");

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: cities[1]["coords"], // Default - Delhi
      // maxZoom: 11,
      // minZoom: 4,
      zoom: 12,
    });
    map.current.on("moveend", () => {
      const ne = map.current.getBounds()["_ne"];
      const sw = map.current.getBounds()["_sw"];
      setCorners({
        nw: [sw["lng"], ne["lat"]],
        ne: [ne["lng"], ne["lat"]],
        se: [ne["lng"], sw["lat"]],
        sw: [sw["lng"], sw["lat"]],
      });
    });
  });

  const addLayer = (coord) => {
    if (typeof map.current.getSource("radar") !== "undefined") {
      map.current.removeLayer("radar-layer");
      map.current.removeSource("radar");
    }

    console.log(coord);
    console.log([
      [coord[0], coord[3]],
      [coord[2], coord[3]],
      [coord[2], coord[1]],
      [coord[0], coord[1]],
    ]);

    map.current.addSource("radar", {
      type: "image",
      url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/[${coord}]/300x200@2x?access_token=pk.eyJ1IjoiYXJhdmluZGthbm5hbjAxIiwiYSI6ImNsNzJ5dHp4NTExaXkzb3NiYXhraXYwdnQifQ.XHZ07PcTPU6ff2qxg8bcRQ`,
      coordinates: [
        [coord[0], coord[3]],
        [coord[2], coord[3]],
        [coord[2], coord[1]],
        [coord[0], coord[1]],
      ],
    });
    map.current.addLayer({
      id: "radar-layer",
      type: "raster",
      source: "radar",
      paint: {
        "raster-fade-duration": 0,
      },
    });
  };

  return (
    <>
      <main className="bg-zinc-100">
        <div className="flex">
          <div ref={mapContainer} className="h-screen w-full"></div>
          {isHamOpen ? (
            <div className="w-1/6">
              <div className="h-screen grid place-items-center bg-zinc-100">
                {
                  <div className="bg-white rounded-xl gap-2 p-2 m-2">
                    <h1 className="font-bold text-2xl p-2 grid place-items-center text-center">
                      Select a city <br />
                      to visit
                    </h1>
                    <div className="flex flex-col gap-1">
                      {cities.map((city, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              city.name === currentCity
                                ? "rounded-xl p-2 bg-violet-600 text-white flex flex-col items-center"
                                : "rounded-xl p-2 hover:bg-violet-100 flex flex-col items-center"
                            }
                            onClick={() => {
                              map.current.flyTo({
                                center: city.coords,
                                essential: true,
                                zoom: 12,
                                duration: 10000,
                              });
                              setCurrentCity(city.name);
                            }}
                          >
                            <img src={city.icon} alt={city.name}></img>
                            <p>{city.name}</p>
                          </div>
                        );
                      })}
                      <button
                        onClick={() => {
                          const ne = map.current.getBounds()["_ne"];
                          const sw = map.current.getBounds()["_sw"];

                          console.log(
                            "South West",
                            sw["lng"],
                            sw["lat"],
                            "North East",
                            ne["lng"],
                            ne["lat"]
                          );

                          addLayer([
                            sw["lng"],
                            sw["lat"],
                            ne["lng"],
                            ne["lat"],
                          ]);
                        }}
                        className="p-2 bg-violet-400 hover:bg-violet-600 rounded-xl font-semibold text-white"
                      >
                        Annotate
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
          ) : (
            <div />
          )}
          <Hamburger
            direction="right"
            toggled={isHamOpen}
            toggle={setHamOpen}
            className="p-2 h-8"
          />
        </div>
      </main>
    </>
  );
}

export default MapInterface;
