import React, { useState, useEffect } from 'react';
import './Esp.css';

const LEDControl = () => {
  const [currentState, setCurrentState] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('wss://sand-inexpensive-dirt.glitch.me');  // Update URL here
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCurrentState(data.state);
    };

    return () => {
      ws.close();
    };
  }, []);

  const updateState = async (newState) => {
    try {
      const response = await fetch('https://sand-inexpensive-dirt.glitch.me/api/state', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 1, state: newState }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error updating state:', data.message);
      }
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="led-state">LED State: {currentState !== null ? currentState : 'Loading...'}</h1>
      <button className="on-button" onClick={() => updateState(1)}>ON</button>
      <button className="off-button" onClick={() => updateState(0)}>OFF</button>
    </div>
  );
};

export default LEDControl;
