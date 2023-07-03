import React from 'react';
import './Home.css';
import logo from '../../assets/upfrontLogo.png';
import backgroundImage from '../../assets/backgroundImage.jpeg';
const Home = () => {
  return (
    <div className="home-content">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <h2 className="welcome-text">Welcome to the Rebate Program Finder!</h2>
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
    </div>
  );
};
export default Home;
