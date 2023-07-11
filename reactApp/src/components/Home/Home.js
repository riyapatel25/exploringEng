import React from 'react';
import './Home.css';
import logo from '../../assets/wie_logo.png';
const Home = () => {
  return (
    <div className="home-content">
      <div className="logo-container">
      </div>
      <h2 className="welcome-text">Welcome to the Software Room!</h2>
      <img src={logo} className="img"/>
      </div>
  );
};
export default Home;
