import React, { useState } from 'react';
import './styles.css';
import Navbar from './components/NavBar';
import Dropdown from './components/Dropdown';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Home from './components/Home/Home';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    if (activeTab === 'home') {
      return <Home />;
    } else if (activeTab === 'rebates') {
      return (
        <div className="rebates-content">
          <h1 className="title">Create Your WebPage</h1>
          <Dropdown />
          <ImageGallery />
          <Button /> 
        </div>
      );
    }
    return null;
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default App;