import React, { useState } from 'react';

const Button = () => {
  const [displayText, setDisplayText] = useState('');

  const handleClick = () => {
    setDisplayText('Button Clicked!');
  };

  return (
    <button className="button" onClick={handleClick}>
      {displayText ? displayText : 'Click Me!'}
    </button>
  );
};

export default Button;