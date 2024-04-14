import { useState } from 'react'
import './App.css'


// Square component that will be used to render each square of the board
const Square = ({ children, updateBoard, index }) => {
  return (
    <div className='square'>
      {children}
    </div>
  )
}

function App() {

  // Create a state variable to hold the board state
  const [board, setBoard] = useState(['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x']);

  return (
    <>
      <main className='board'>
        <h1>Tic-Tac-Toe</h1>
        <section className='game'>
          {
            // Loop through the board state and render a Square component for each square
            board.map((a, index) => {
              return (
                <Square key={index} index={index}>
                  {board[index]}
                </Square>
              )

            })
          }
        </section>
      </main>
    </>
  )
}

export default App
