// Square component that will be used to render each square of the board
// eslint-disable-next-line react/prop-types
export const Square = ({ children, isSelected, updateBoard, index }) => {

    const className = `square ${isSelected ? 'is-selected' : ''}`;

    const handleClick = () => {
      updateBoard(index)
    }

    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    )
}
