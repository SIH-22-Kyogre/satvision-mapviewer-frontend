import React from "react";
import { Link } from "react-router-dom";
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
        <h2 className="text-3xl font-bold p-2">Welcome to Satvision!</h2>
        <Link to="/map_interface">
          <p className="bg-slate-100 p-2 rounded-xl hover:bg-slate-200">
            Goto App
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
