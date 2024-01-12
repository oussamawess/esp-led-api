// LEDControl.jsx

import React, { useState, useEffect } from 'react';
import './Esp.css'; // Import the CSS file

const LEDControl = () => {
  const [currentState, setCurrentState] = useState(null);

  const fetchState = async () => {
    try {
      const response = await fetch('/.netlify/functions/ledControl');  // Update URL here
      console.log('Response:', response);
      const data = await response.json();

      if (response.ok) {
        setCurrentState(data.state);
      } else {
        console.error('Error fetching state:', data.message);
      }
    } catch (error) {
      console.error('Error fetching state:', error);
    }
  };

  const updateState = async (newState) => {
    try {
      const response = await fetch('/.netlify/functions/ledControl', {  // Update URL here
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 1, state: newState }),
      });
      console.log('POST Response:', response);

      const data = await response.json();

      if (response.ok) {
        console.log('State updated successfully:', data.message);
        fetchState();
      } else {
        console.error('Error updating state:', data.message);
      }
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  useEffect(() => {
    fetchState();
    const intervalId = setInterval(fetchState, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      <h1 className="led-state">LED State: {currentState !== null ? currentState : 'Loading...'}</h1>
      <button className="on-button" onClick={() => updateState(1)}>ON</button>
      <button className="off-button" onClick={() => updateState(0)}>OFF</button>
    </div>
  );
};

export default LEDControl;
