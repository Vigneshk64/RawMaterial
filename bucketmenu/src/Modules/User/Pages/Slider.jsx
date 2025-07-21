import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Slider.css";
import { Link } from "react-router-dom";
// Importing Different Slide Images
import Banner1 from "../Images/Banner.jpeg";
import Banner2 from "../Images/Idli.jpeg";
import Banner3 from "../Images/Banner.jpeg";

export default function Slider() {
  return (
    <div className="slider-container">
      <Carousel fade interval={4000} pause="hover">
        {/* Slide 1 */}
        <Carousel.Item>
          <div className="image-overlay">
            <img className="slider-image" src={Banner1} alt="Trending Dish 1" />
          </div>
          <Carousel.Caption className="slider-caption">
            <h2 className="slider-title">🔥 Trending Now</h2>
            <p className="slider-desc">Try our famous <strong>Grilled Steak</strong> with special sauce! 🥩</p>
            <Link to='/singleview/67cec299778b55a054d88ed5'>
            <button className="slider-button">Order Now</button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 2 */}
        <Carousel.Item>
          <div className="image-overlay">
            <img className="slider-image" src={Banner2} alt="Trending Dish 2" />
          </div>
          <Carousel.Caption className="slider-caption">
            <h2 className="slider-title">🍝 Special Pasta</h2>
            <p className="slider-desc">Delicious <strong>creamy Alfredo pasta</strong> just for you! 🍽</p>
            <button className="slider-button">Order Now</button>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Slide 3 */}
        <Carousel.Item>
          <div className="image-overlay">
            <img className="slider-image" src={Banner3} alt="Trending Dish 3" />
          </div>
          <Carousel.Caption className="slider-caption">
            <h2 className="slider-title">🍰 Sweet Delights</h2>
            <p className="slider-desc">Indulge in our heavenly <strong>Chocolate Lava Cake</strong> 🍫</p>
            <button className="slider-button">Order Now</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
