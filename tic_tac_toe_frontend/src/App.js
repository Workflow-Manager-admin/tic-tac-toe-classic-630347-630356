import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import GameMode from './components/GameMode';

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('2player');
  const [status, setStatus] = useState('');

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getAvailableMoves = (squares) => {
    return squares
      .map((square, index) => square === null ? index : null)
      .filter(square => square !== null);
  };

  const computerMove = (currentSquares) => {
    const availableMoves = getAvailableMoves(currentSquares);
    if (availableMoves.length > 0) {
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      handleClick(randomMove);
    }
  };

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (!squares.includes(null)) {
      setStatus('Draw!');
    } else {
      setStatus(`Next player: ${isXNext ? 'X' : 'O'}`);
    }

    // Computer move
    if (gameMode === 'computer' && !isXNext && !winner && squares.includes(null)) {
      setTimeout(() => computerMove(squares), 500);
    }
  }, [squares, isXNext, gameMode]);

  return (
    <div className="App">
      <div className="game-container">
        <h1 className="game-title">Tic Tac Toe</h1>
        <GameMode 
          currentMode={gameMode} 
          onModeSelect={(mode) => {
            setGameMode(mode);
            resetGame();
          }}
        />
        <div className="status">{status}</div>
        <Board squares={squares} onClick={handleClick} />
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;
