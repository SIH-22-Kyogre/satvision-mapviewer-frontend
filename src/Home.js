import React from "react";
import { Link } from "react-router-dom";
import Mumbai from "./assets/gateway-of-india-mumbai.svg";
import Delhi from "./assets/india-gate-delhi.svg";
import Kolkata from "./assets/victoria-memorial-kolkata.svg";
import Bengaluru from "./assets/vidhana-soudha-bengaluru.svg";
import Slideshow from "./Slideshow";
import demo from "./assets/pexels.mp4";

function Home() {
  // Note that coords: [longitude, latitude]
  let cities = [
    { name: "Bengaluru", coords: [77.5946, 12.9716], icon: Bengaluru },
    { name: "Delhi", coords: [77.1025, 28.7041], icon: Delhi },
    { name: "Kolkata", coords: [88.3639, 22.5726], icon: Kolkata },
    { name: "Mumbai", coords: [72.8777, 19.076], icon: Mumbai },
  ];
  return (
    <div className="min-h-screen">
      <video
        style={{
          position: "absolute",
          width: "100%",
          top: "50%",
          height: "100%",
          left: "50%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}
        autoPlay={true}
        loop={true}
        muted={true}
      >
        <source src={demo} type="video/mp4"></source>
      </video>
      <div>
        <header className="bg-black text-white p-4 pl-8 text-3xl font-semibold flex gap-6">
          <img style={{ height: 35 }} src={"./logo512.png"} />
          <h1>Sat Vision</h1>
        </header>
        <div className="flex h-screen">
          <div className=" w-1/2 grid place-items-center text-lg bg-opacity">
            <div
              className="bg-white text-md p-10 rounded-xl flex flex-col gap-8 bg-opacity-40 bg-clip-padding  m-8 flex flex-col items-center font-semibold"
              style={{ "backdrop-filter": "blur(20px)" }}
            >
              Identifying Non Residential built-up cluster detection from latest
              medium resolution satellite images for four highly populated
              Indian cities (Mumbai, Delhi, Bangalore and Kolkata)
              <Link to="/map_interface">
                <button className="border-2 text-black border-black hover:bg-black p-2 rounded-xl hover:text-white font-bold">
                  Go to App
                </button>
              </Link>
            </div>
          </div>
          <Slideshow />
        </div>
      </div>
    </div>
  );
}

export default Home;
