export const turns = {
    X: 'X',
    O: 'O'
  }

const winnerCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
  ]

  // Check if there is a winner
export const checkWinner = ( boardToCkeck ) => {
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
