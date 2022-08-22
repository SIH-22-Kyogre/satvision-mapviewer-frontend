import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MapInterface from "./MapInterface";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map_interface" element={<MapInterface />} />
      </Routes>
    </div>
  );
}

export default App;
