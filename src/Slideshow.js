import React from "react";
import "./Slideshow.css";

const photos = [
  {
    src: "Landsat8.png",
    desc: "LandSat-8 (NASA)- Spatial Resolution 30m",
  },
  {
    src: "Sentinel2.png",
    desc: "Sentinel-2 (ESA)- Spatial Resolution 10m",
  },
  {
    src: "gt.png",
    desc: "Ground Truth",
  },
  {
    src: "Patching.png",
    desc: "Patchify the image into small patches of size (64,64)",
  },
  {
    src: "Reconstructed.png",
    desc: "Reconstructed patches of non residential areas",
  },
];
const delay = 2500;

export default function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === photos.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="self-center w-1/2 slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {photos.map((photo, index) => (
          <div className="slide" key={index}>
            <img width="400" height="400" src={photo.src}></img>
            <p className="bg-white rounded-xl absolute bottom-0 p-2">
              {photo.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {photos.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
