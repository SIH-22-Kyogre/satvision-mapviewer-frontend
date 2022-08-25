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
  const [isHamOpen, setHamOpen] = useState(false);
  const [corners, setCorners] = useState({});
  const [toggle, setToggle] = useState(false);

  // Presets
  const initialValues = { name: "", coords: [], deleted: false };
  const [formValues, setFormValues] = useState(initialValues);
  const [presets, setPresets] = useState([
    { name: "Preset 1", coords: [30.7294719, 76.663792], deleted: false },
  ]);

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
    map.current.on("load", function () {
      map.current.resize();
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
            <div className="w-2/6">
              <div className="h-screen grid place-items-center bg-zinc-100">
                <div className="flex bg-white rounded-xl p-3 gap-2">
                  <div
                    onClick={() => setToggle(false)}
                    className={
                      !toggle
                        ? "p-2 bg-black text-white rounded-xl"
                        : "p-2 hover:bg-slate-400 rounded-xl"
                    }
                  >
                    Cities
                  </div>
                  <div
                    onClick={() => setToggle(true)}
                    className={
                      toggle
                        ? "p-2 bg-black text-white rounded-xl"
                        : "p-2 hover:bg-slate-400 hover:text-white rounded-xl"
                    }
                  >
                    Presets
                  </div>
                </div>
                {!toggle ? (
                  <div className="bg-white rounded-xl gap-1 p-2 m-2">
                    <h1 className="font-bold text-2xl p-1 grid place-items-center text-center">
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
                                ? "rounded-xl p-1 bg-violet-600 text-white flex flex-col items-center"
                                : "rounded-xl p-1 hover:bg-violet-100 flex flex-col items-center"
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
                        className="p-1 bg-violet-400 hover:bg-violet-600 rounded-xl font-semibold text-white"
                      >
                        Annotate
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl gap-1 p-2 m-2">
                    <form>
                      <div>
                        <label>Name</label>
                        <input
                          className="border-2 rounded-lg p-2"
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={formValues.username}
                        />
                      </div>
                      <div>
                        <label>Longitude</label>
                        <input
                          className="border-2 rounded-lg p-2"
                          type="number"
                          step="any"
                          name="longitude"
                          placeholder="Longitude"
                          value={formValues.longitude}
                        />
                      </div>
                      <div>
                        <label>Latitude</label>
                        <input
                          className="border-2 rounded-lg p-2"
                          type="number"
                          step="any"
                          name="latitude"
                          placeholder="Latitude"
                          value={formValues.latitude}
                        />
                      </div>
                      <button>
                        <i class="fa-solid fa-plus"></i>Add
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div />
          )}
          <Hamburger
            direction="right"
            toggled={isHamOpen}
            toggle={setHamOpen}
            className="p-1 h-8"
          />
        </div>
      </main>
    </>
  );
}

export default MapInterface;
