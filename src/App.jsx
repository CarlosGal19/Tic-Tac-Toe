import { useState } from 'react'
import { Square } from './components/Square'
import './App.css'


const turns = {
  X: 'X',
  O: 'O'
}

const winnerCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
  [0, 4, 8], [2, 4, 6] // Diagonal
]

function App() {

  // Create a state variable to hold the board state
  const [board, setBoard] = useState(Array(9).fill(null));

  // Create a state variable to hold the current turn
  const [turn, setTurn] = useState(turns.X);

  // Create a state variable to hold the winner. Null means there is no winner yet. False means it's a tie.
  const [winner, setWinner] = useState(null);

  // Check if there is a winner
  const checkWinner = ( boardToCkeck ) => {
    for (const combo of winnerCombos) {
      const [a, b, c] = combo;
      if (boardToCkeck[a] && boardToCkeck[a] === boardToCkeck[b] && boardToCkeck[a] === boardToCkeck[c]) {
        return boardToCkeck[a];
      }
    }
    if(boardToCkeck.every((square) => square)){
      return false;
    }
    return null;
  }

  const updateBoard = (index) => {
    // Create a new array with the updated value
    if(board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // Check if there is a winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      return;
    }
    if(newWinner === false){
      setWinner(false);
      return;
    }
    // Change the turn
    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);
  }

  // Reset the game to the initial state
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
  }

  return (
    <>
      <main className='board'>
        <h1>Tic-Tac-Toe</h1>
        <button onClick={resetGame}>Reset game</button>
        <section className='game'>
          {
            // Loop through the board state and render a Square component for each square
            board.map((a, index) => {
              return (
                <Square key={index} index={index} updateBoard={updateBoard}>
                  {board[index]}
                </Square>
              )

            })
          }
        </section>
        <section className='turn'>
          <Square isSelected={turn === turns.X}> {turns.X} </Square>
          <Square isSelected={turn === turns.O}> {turns.O} </Square>
        </section>
        {
          winner !== null &&  (
            <section className='winner'>
              <div className='text'>
                <h2>
                  {
                    winner === false ? 'It\'s a tie!' : `Player ${winner} wins!`
                  }
                </h2>
                  <header className='win'>
                    {<Square>{winner ? winner : "Tie"}</Square>}
                  </header>
                  <footer>
                    <button onClick={resetGame}>Restart game</button>
                  </footer>
              </div>
            </section>
          )
        }
      </main>
    </>
  )
}

export default App
