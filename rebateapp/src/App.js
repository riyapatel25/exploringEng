import React, { useState } from 'react';
import './styles.css';
import Navbar from './components/NavBar';
import ProductDropdown from './components/ProductDropdown';
import ZipCodeInput from './components/ZipCodeInput';
import ProductPrice from './components/ProductPrice';
import GetRebatesButton from './components/GetRebatesButton';
import Home from './components/Home/Home';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    if (activeTab === 'home') {
      return <Home />;
    } else if (activeTab === 'rebates') {
      return (
        <div className="rebates-content">
          <h1 className="title">Rebate Program Finder</h1>
          <ProductDropdown />
          <ZipCodeInput />
          <ProductPrice />
          <GetRebatesButton />
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