import React from 'react';
import '../../src/styles.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="logo">Upfront</h1>
      </div>
      <ul className="nav-links">
        <li
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleTabClick('home')}
        >
          <a href="#" className="nav-link">
            Home
          </a>
        </li>
        <li
          className={`nav-item ${activeTab === 'rebates' ? 'active' : ''}`}
          onClick={() => handleTabClick('rebates')}
        >
          <a href="#" className="nav-link">
            Rebates
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
