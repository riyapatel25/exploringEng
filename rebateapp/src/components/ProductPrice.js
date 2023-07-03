import React, { useState } from 'react';

const ProductPrice = () => {
  const [price, setPrice] = useState('');

  const handleProductPriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div className="form-container">
    <label htmlFor="price-input">Enter Product Price:</label>
    <input
      type="text"
      id="price-input"
      className="form-control"
      value={price}
      onChange={handleProductPriceChange}
    />
  </div>
  );
};

export default ProductPrice;
