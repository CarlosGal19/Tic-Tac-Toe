import { useState } from 'react'
import './App.css'


const turns = {
  X: 'x',
  O: 'o'
}

// Square component that will be used to render each square of the board
const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard()
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

function App() {

  // Create a state variable to hold the board state
  const [board, setBoard] = useState(Array(9).fill(null));

  // Create a state variable to hold the current turn
  const [turn, setTurn] = useState(turns.X);

  const updateBoard = () => {
    const newTurn = turn === turns.X ? turns.O : turns.X;
    setTurn(newTurn);
  }

  return (
    <>
      <main className='board'>
        <h1>Tic-Tac-Toe</h1>
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
      </main>
    </>
  )
}

export default App
