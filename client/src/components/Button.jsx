// src/components/Button.jsx
import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} data-testid="custom-button">
      {children}
    </button>
  );
};

export default Button;
