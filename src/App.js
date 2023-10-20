import React, { useState } from 'react';
import Board from './components/Board/Board';
import Score from './components/Score';
import './App.css';

function App() {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  function onWin(player) {
    if (player === 'X') {
      setPlayer1Score(score => score + 1);
    } else if (player === 'O') {
      setPlayer2Score(score => score + 1);
    }
  }

  console.log(player1Score, player2Score)
  return (
    <div>
      <Board onWin={onWin} />
      <Score xScore={player1Score} oScore={player2Score} />
    </div>

  );
}

export default App;