import { useState, useEffect } from 'react';

import GridOverlay from './GridOverlay';

import './TicTacToe.scss';

import { GridInput, LinesToShow, OverlayToShow, WinningIndex } from './types.ts';

export default function TicTacToe() {
  const [gridInputs, setGridInputs] = useState<GridInput[]>([...Array(9)].map((_, i) => ({ id: i, value: '' })));
  const [playerTurn, setPlayerTurn] = useState<string>('X');
  const [winner, setWinner] = useState<string>('');
  const [isTie, setIsTie] = useState<boolean>(false);

  const [drawingGrid, setDrawingGrid] = useState<boolean>(false);

  const [hoveredTile, setHoveredTile] = useState<number>(-1);

  const [linesToShow, setLinesToShow] = useState<LinesToShow>({
    column1: false,
    column2: false,
    row1: false,
    row2: false,
  });

  const [overlayToShow, setOverlayToShow] = useState<OverlayToShow>({
    overlay1: false,
    overlay2: false,
    overlay3: false,
    overlay4: false,
    overlay5: false,
    overlay6: false,
    overlay7: false,
    overlay8: false,
  });

  const columnIndexes: WinningIndex[] = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const rowIndexes: WinningIndex[] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const diagonalIndexes: WinningIndex[] = [
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winningIndexCombinations: WinningIndex[] = [...columnIndexes, ...rowIndexes, ...diagonalIndexes];

  function openingAnimation(): void {
    setDrawingGrid(true);
    setTimeout(() => {
      setLinesToShow((prevState) => ({ ...prevState, column1: true }));
      setTimeout(() => {
        setLinesToShow((prevState) => ({ ...prevState, column2: true }));
        setTimeout(() => {
          setLinesToShow((prevState) => ({ ...prevState, row1: true }));
          setTimeout(() => {
            setLinesToShow((prevState) => ({ ...prevState, row2: true }));
            setDrawingGrid(false);
          }, 750);
        }, 750);
      }, 750);
    }, 750);
  }

  useEffect(() => {
    openingAnimation();
  }, []);

  function handleInput(id: number): void {
    // Handle input change
    const newInputs = [...gridInputs];
    newInputs[id].value = playerTurn;
    setGridInputs(newInputs);
    setHoveredTile(-1);

    // Check for winning combination
    let winner = '';
    winningIndexCombinations.forEach((winningIndexCombination, combinationIndex) => {
      const firstInput = newInputs[winningIndexCombination[0]].value;
      const secondInput = newInputs[winningIndexCombination[1]].value;
      const thirdInput = newInputs[winningIndexCombination[2]].value;
      if (firstInput && secondInput && thirdInput && firstInput === secondInput && secondInput === thirdInput) {
        winner = playerTurn;
        setOverlayToShow({ ...overlayToShow, [`overlay${combinationIndex + 1}`]: true });
      }
    });

    // Determine winner or tied game outcome
    if (winner) setWinner(winner);
    if (gridInputs.every((gridInput) => gridInput.value) && !winner) setIsTie(true);

    // Switch player turn
    setPlayerTurn(playerTurn === 'X' ? 'O' : 'X');
  }

  function handleRestart() {
    // Reset all to initial values
    setGridInputs([...Array(9)].map((_, i) => ({ id: i, value: '' })));
    setPlayerTurn('X');
    setWinner('');
    setIsTie(false);
    setLinesToShow({
      column1: false,
      column2: false,
      row1: false,
      row2: false,
    });
    setOverlayToShow({
      overlay1: false,
      overlay2: false,
      overlay3: false,
      overlay4: false,
      overlay5: false,
      overlay6: false,
      overlay7: false,
      overlay8: false,
    });
    openingAnimation();
  }

  return (
    <main className="App">
      <h1>Tic - Tac - Toe</h1>

      <p>Player {playerTurn} turn</p>

      <div className="game-grid">
        <GridOverlay linesToShow={linesToShow} overlayToShow={overlayToShow} />

        <div className="grid-inputs">
          {gridInputs.map(({ id, value }) => (
            <button
              key={id}
              className={`grid-input ${!!value || !!winner || drawingGrid ? 'filled' : ''}`}
              disabled={!!value || !!winner}
              onClick={() => handleInput(id)}
              onMouseEnter={() => setHoveredTile(id)}
              onMouseLeave={() => setHoveredTile(-1)}
            >
              {hoveredTile === id ? playerTurn : value}
            </button>
          ))}
        </div>
      </div>

      {(winner || isTie) && (
        <>
          <p className="end-game-text">{isTie ? 'Tied game' : `${winner} wins!`}</p>
          <button className="restart-btn" onClick={handleRestart}>
            Restart
          </button>
        </>
      )}
    </main>
  );
}
