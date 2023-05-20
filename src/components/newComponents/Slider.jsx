import React, { useState, useEffect } from "react";
import "./Slider.css";
import Image from "../../images/1.jpg";
import Image1 from "../../images/2.jpg";
import Image2 from "../../images/3.jpg";
import Image3 from "../../images/5.jpg";
import Image4 from "../../images/6.jpg";

const Slider = () => {
  const [counter, setCounter] = useState(1);

  const nextSlide = () => {
    document.getElementById("radio" + counter).checked = true;
    setCounter((prevCounter) => {
      if (prevCounter === 4) {
        return 1;
      } else {
        return prevCounter + 1;
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
    <div className="slider">
      <div className="slides">
        <input
          type="radio"
          name="radio-btn"
          id="radio1"
          aria-label="Radio Button 1"
        />
        <input
          type="radio"
          name="radio-btn"
          id="radio2"
          aria-label="Radio Button 2"
        />
        <input
          type="radio"
          name="radio-btn"
          id="radio3"
          aria-label="Radio Button 3"
        />
        <input
          type="radio"
          name="radio-btn"
          id="radio4"
          aria-label="Radio Button 4"
        />

        <div className="slide first">
          <img src={Image} alt="" />
        </div>
        <div className="slide">
          <img src={Image1} alt="" />
        </div>
        <div className="slide">
          <img src={Image2} alt="" />
        </div>
        <div className="slide">
          <img src={Image3} />
        </div>

        <div className="navigation-auto">
          <div className="auto-btn1"></div>
          <div className="auto-btn2"></div>
          <div className="auto-btn3"></div>
          <div className="auto-btn4"></div>
        </div>

        <div className="navigation-manual">
          <label htmlFor="radio1" className="manual-btn"></label>
          <label htmlFor="radio2" className="manual-btn"></label>
          <label htmlFor="radio3" className="manual-btn"></label>
          <label htmlFor="radio4" className="manual-btn"></label>
        </div>
      </div>
    </div>
  );
};

export default Slider;
