import { Square } from "./Square";
import PropTypes from 'prop-types';

Winner.propTypes = {
  winner: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  resetGame: PropTypes.func.isRequired,
};

export function Winner ({winner, resetGame}) {
    if (winner === null) return null;

    const winnerText = winner === false ? 'It\'s a tie!' : `Player ${winner} wins!`;

    return (
      <section className='winner'>
      <div className='text'>
        <h2>
          {
            winnerText
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
