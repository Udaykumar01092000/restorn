import React from 'react';
import './slider.css';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
  let navigate = useNavigate();
  return (
    <div className="slider" id="slidercontainer">
      <div className="slider-content">
        <h1 className='slider-header'>ENJOY OUR DELICIOUS MEAL</h1>
        <p className='slider-text'>Enjoy a delightful culinary experience with our diverse menu, 
          featuring a wide variety of cuisines and dishes. Whether you're in 
          the mood for a quick snack or a full-course meal, we've got you covered.
          Our delivery service ensures that your food arrives hot and fresh, right
          at your doorstep.</p>
          <button className='menubtn' id="searchbtn"
                  onClick = {()=>{
                    navigate(`/searchDishes/`)
                  }}>
            Search Dishes
          </button>
      </div>
      <div>
        <img
          src="https://themewagon.github.io/restoran/img/hero.png"
          alt="Rotating Food"
          className="rotating-image"
        />
      </div>
    </div>
  );
};

export default Slider;
