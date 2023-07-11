import React, { useState } from 'react';


const Dropdown = () => {
  const [selectedItem, setSelectedItem] = useState('');

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div className="form-container">
      <label >Select Something:</label>
      <select
        className="form-control"
        value={selectedItem}
        onChange={handleItemChange}
      >
        <option value="">-- Select Something --</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select>
      
      {selectedItem && (
        <p>Selected Item: {selectedItem}</p>
      )}
    </div>
  );
};

export default Dropdown;