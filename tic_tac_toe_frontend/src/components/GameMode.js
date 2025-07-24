import React from 'react';

const GameMode = ({ currentMode, onModeSelect }) => {
  return (
    <div className="game-mode">
      <button 
        className={`mode-button ${currentMode === '2player' ? 'active' : ''}`}
        onClick={() => onModeSelect('2player')}
      >
        2 Players
      </button>
      <button 
        className={`mode-button ${currentMode === 'computer' ? 'active' : ''}`}
        onClick={() => onModeSelect('computer')}
      >
        vs Computer
      </button>
    </div>
  );
};

export default GameMode;
