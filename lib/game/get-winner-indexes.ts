const getWinnerIndexes = (squares: (boolean | undefined)[]) => {
  const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  return winCases.find(([a, b, c]) => typeof squares[a] === "boolean"
    && squares[a] === squares[b] && squares[a] === squares[c])
}

export default getWinnerIndexes