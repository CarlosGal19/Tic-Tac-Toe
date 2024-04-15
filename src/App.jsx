import { useState } from 'react'
import { Square } from './components/Square'
import { Winner } from './components/Winner'
import './App.css'
import confetti from 'canvas-confetti'
import { turns, checkWinner } from './utils'

function App() {

  // Create a state variable to hold the board state
  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem('board');
    if(savedBoard){
      return JSON.parse(savedBoard);
    }
    return Array(9).fill(null);
  });

  // Create a state variable to hold the current turn
  const [turn, setTurn] = useState(() => {
    const savedTurn = localStorage.getItem('turn');
    if(savedTurn){
      return savedTurn;
    }
    return turns.X;

  });

  // Create a state variable to hold the winner. Null means there is no winner yet. False means it's a tie.
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    // Create a new array with the updated value
    if(board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // Save player's move in local storage
    localStorage.setItem('board', JSON.stringify(newBoard));
    // Check if there is a winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      localStorage.removeItem('board');
      localStorage.removeItem('turn');
      confetti();
      setWinner(newWinner);
      return;
    }
    if(newWinner === false){
      localStorage.removeItem('board');
      localStorage.removeItem('turn');
      setWinner(false);
      return;
    }
    // Change the turn
    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);
    localStorage.setItem('turn', newTurn);
  }

  // Reset the game to the initial state and clear the local storage
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
    localStorage.removeItem('board');
    localStorage.removeItem('turn');
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
        <Winner winner={winner} resetGame={resetGame} />
      </main>
    </>
  )
}

export default App
