import React from 'react';

const BugList = ({ bugs = [] }) => {
  return (
    <ul>
      {bugs.map((bug, index) => (
        <li key={index}>{bug.title}</li>
      ))}
    </ul>
  );
};

export default BugList;
