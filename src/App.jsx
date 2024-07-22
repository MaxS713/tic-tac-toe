import { useState } from "react";

import "./App.scss";

export default function App() {
  const [gridInputs, setGridInputs] = useState([...Array(9)].map((_, i) => ({ id: i, value: "" })));
  const [playerTurn, setPlayerTurn] = useState("X");
  const [winner, setWinner] = useState("");
  const [isTie, setIsTie] = useState(false);

  const rowIndexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const columnIndexes = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const diagonalIndexes = [
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winningIndexCombinations = [...rowIndexes, ...columnIndexes, ...diagonalIndexes];

  function handleInput(id) {
    // Handle input change
    const newInputs = [...gridInputs];
    newInputs[id].value = playerTurn;
    setGridInputs(newInputs);

    // Check for winning combination
    let winner = "";
    winningIndexCombinations.forEach((winningIndexCombination) => {
      const firstInput = newInputs[winningIndexCombination[0]].value;
      const secondInput = newInputs[winningIndexCombination[1]].value;
      const thirdInput = newInputs[winningIndexCombination[2]].value;
      if (
        firstInput &&
        secondInput &&
        thirdInput &&
        firstInput === secondInput &&
        secondInput === thirdInput
      ) {
        winner = playerTurn;
      }
    });

    // Determine winner or tied game outcome
    if (winner) setWinner(winner);
    if (gridInputs.every((gridInput) => gridInput.value) && !winner) setIsTie(true);

    // Switch player turn
    setPlayerTurn(playerTurn === "X" ? "O" : "X");
  }

  function handleRestart() {
    // Reset all to initial values
    setGridInputs([...Array(9)].map((_, i) => ({ id: i, value: "" })));
    setPlayerTurn("X");
    setWinner("");
    setIsTie(false);
  }

  return (
    <main className="App">
      <h1>Tic - Tac - Toe</h1>

      <p>Player {playerTurn} turn</p>

      <div className="game-grid">
        <div className="columns">
          <div className="column" />
          <div className="column" />
          <div className="column" />
        </div>
        <div className="rows">
          <div className="row" />
          <div className="row" />
          <div className="row" />
        </div>

        <div className="grid-inputs">
          {gridInputs.map(({ id, value }) => (
            <div key={id} className="grid-input">
              <button
                className="grid-btn"
                disabled={!!value || !!winner}
                onClick={() => handleInput(id)}
              >
                {value}
              </button>
            </div>
          ))}
        </div>
      </div>

      {(winner || isTie) && (
        <>
          {isTie ? <p>Tied game</p> : <p>{winner} wins!</p>}
          <button className="restart-btn" onClick={handleRestart}>
            Restart
          </button>
        </>
      )}
    </main>
  );
}
