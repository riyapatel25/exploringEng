import React, { useState } from 'react';

const ZipCodeInput = () => {
  const [zipCode, setZipCode] = useState('');

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  return (
    <div className="form-container">
    <label htmlFor="zipcode-input">Enter Zip Code:</label>
    <input
      type="text"
      id="zipcode-input"
      className="form-control"
      value={zipCode}
      onChange={handleZipCodeChange}
    />
  </div>
  );
};

export default ZipCodeInput;
