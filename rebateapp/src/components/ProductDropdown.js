import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDropdown = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    // Make an API call to fetch the product names
    axios.get('http://localhost:3000/api/productNames')
      .then(response => {
        setProductOptions(response.data);
      })
      .catch(error => {
        console.error('API Error:', error);
      });
  }, []);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <div className="form-container">
      <label htmlFor="product-select">Select a Product:</label>
      <select
        id="product-select"
        className="form-control"
        value={selectedProduct}
        onChange={handleProductChange}
      >
        <option value="">-- Select Product --</option>
        {productOptions.map((product, index) => (
          <option key={index} value={product}>{product}</option>
        ))}
      </select>
    </div>
  );
};

export default ProductDropdown;
