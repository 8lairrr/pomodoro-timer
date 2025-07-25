import React, { useState } from 'react';
import Timer from './Timer'
import './App.css'

function App() {
  const [selectedDurations, setSelectedDurations] = useState(null);

  const handleSelectMode = (work, breakTime) => {
    setSelectedDurations({ work, break: breakTime });
  };

  //helper function for greeting title
  function getTimeGreeting() {
    const now = new Date();
    const hour = now.getHours();
  
    if (hour < 12) return "MORNING";
    if (hour < 18) return "AFTERNOON";
    return "NIGHT";
  }

  const handleExit = () => {
    if (window.electronAPI) {
      window.electronAPI.closeWindow();
    }
  };


  return (
    <div className='app'>
      {selectedDurations ? (
        // show Timer
        <Timer 
          workDuration={selectedDurations.work} 
          breakDuration={selectedDurations.break}
          onHome={() => setSelectedDurations(null)}
        />
      ) : (
        // landing page with buttons
        <div className="landing">
          <h1>GOOD <span className='time-greeting'>{getTimeGreeting()}</span>.</h1>
          <h2>choose a pomodoro setting:</h2>
          <div className='time-options'>
            <button onClick={() => handleSelectMode(25 * 60 * 1000, 5 * 60 * 1000)}>
              SHORT STUDY
            </button>
            <button onClick={() => handleSelectMode(45 * 60 * 1000, 15 * 60 * 1000)}>
              FINISH WORK
            </button>
            <button onClick={() => handleSelectMode(52 * 60 * 1000, 17 * 60 * 1000)}>
              DEEP FOCUS
            </button>
          </div>
          <button className='exit-button' onClick={handleExit}>
              exit
          </button>
          </div>
      )}
    </div>
  );
}

export default App
