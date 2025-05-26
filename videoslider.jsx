import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nv1 from "../../Assests/videos/nv1.mp4";
import hv1 from "../../Assests/videos/hv1.mp4";
import nv2 from "../../Assests/videos/nv2.mp4";
import nv3 from "../../Assests/videos/nv3.mp4";
import "./videoslider.css";
import nv33 from "../../Assests/videos/nv33.mp4";

// Custom Arrow Components
const CustomPrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow prev-arrow`}
    style={{ ...style }}
    onClick={onClick}
  >
    ❮
  </div>
);

const CustomNextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow next-arrow`}
    style={{ ...style }}
    onClick={onClick}
  >
    ❯
  </div>
);

const VideoSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    fade: true,
    adaptiveHeight: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const slides = [
    {
      videoSrc: nv1,
    },
    {
      videoSrc: nv33,
   
    },
    
    {
      videoSrc: nv3,
    }
  ];

  return (
    <div className="video-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <video
              src={slide.videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="slider-video"
            />
            <div className="overlay">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoSlider;
