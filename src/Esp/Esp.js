// LEDControl.jsx

import React, { useState, useEffect } from 'react';
import { FaLightbulb  } from "react-icons/fa";
import './Esp.css';

const LEDControl = () => {
  const [currentState, setCurrentState] = useState(null);
  const [isOn, setIsOn] = useState(false); // Add state for toggle switch

  useEffect(() => {
    const ws = new WebSocket('wss://sand-inexpensive-dirt.glitch.me');  // Update URL here
  
    const handlePing = () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send('ping');
      }
    };
  
    const pingInterval = setInterval(handlePing, 5000); // Send a ping every 5 seconds
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCurrentState(data.state);
      setIsOn(data.state === 1); // Update toggle switch state
    };
  
    return () => {
      clearInterval(pingInterval);
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
     <div className={`lamp-icon ${isOn ? 'on' : 'off'}`} onClick={() => updateState(isOn ? 0 : 1)}>
        <FaLightbulb  style={{ fontSize: '50px', color: isOn? '#F9D949' : '#B0A695' }} />
      </div>
      <h1 className="led-state">LED State: {currentState !== null ? currentState : 'Loading...'}</h1>
      <div className="toggle-switch-container">
        <div className="text-off">OFF</div>
        <div className={`toggle-switch ${isOn ? 'on' : 'off'}`} onClick={() => updateState(isOn ? 0 : 1)}>
          <div className="switch"></div>
        </div>
        <div className="text-on">ON</div>
      </div>
    </div>
  );
};

export default LEDControl;
