import React, { useState } from 'react';
import axios from 'axios';
import ProgramList from './ProgramList';

const GetRebatesButton = () => {
  const [programs, setPrograms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGetRebates = () => {
    const selectedProduct = document.getElementById('product-select').value;
    const zipCode = document.getElementById('zipcode-input').value;
    const price = document.getElementById('price-input').value;

    console.log('Selected Product:', selectedProduct);
    console.log('Zip Code:', zipCode);
    console.log('Price:', price);

    // Make an API call to backend
    axios
      .get(`http://localhost:3000/api/getMatchingPrograms?zipCode=${zipCode}&productName=${selectedProduct}&purchaseAmount=${price}`)
      .then(response => {
        console.log('API Response:', response.data);
        setPrograms(response.data);
        setErrorMessage('');
      })
      .catch(error => {
        if (error.response && error.response.status === 504) {
          console.log('504 Error:', error.response);
          setErrorMessage(error.response.data.error);
        } else {
          console.error('API Error:', error);
        }
      });
  };

  return (
    <div className="form-container">
      <button className="get-rebates-button" onClick={handleGetRebates}>
        Get Rebates
      </button>
      {errorMessage ? (
        <p>Error: {errorMessage}</p>
      ) : (
        programs.length > 0 && <ProgramList programs={programs} />
      )}
    </div>
  );
};

export default GetRebatesButton;
