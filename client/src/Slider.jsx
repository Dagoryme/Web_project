// VerticalSlider.js

import React, { useState } from 'react';
import './Slider.css'; // Import the CSS file

const Slider = () => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSliderValue(value);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        id="slider"
        min={0}
        max={10}
        value={sliderValue}
        onChange={handleSliderChange}
        className="slider-input"
      />
      <div className="slider-value">
        <label htmlFor="slider" className="slider-label">
          {sliderValue}Km
        </label>
      </div>
    </div>
  );
};

export default Slider;
