import { NextPage } from "next";
import { useState } from "react";
import getWinnerIndexes from "../lib/game/get-winner-indexes";

const Game: NextPage = () => {
  const [squares, setSquares] = useState(Array(9))
  const [XIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState<string>()

  const handleClick = (i: number) => {
    const s = squares.slice()
    s[i] = XIsNext ? "X" : "O"
    setSquares(s)

    const winnerIndexes = getWinnerIndexes(s)
    if (typeof winnerIndexes?.at(0) === "number") {
      setWinner(s[winnerIndexes[0]])
    } else {
      setXIsNext(!XIsNext)
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-[75vw] h-[75vw] mx-auto bg-gray-800">
        <div className="h-full grid grid-rows-3 grid-cols-3 gap-2">
          {Array.from({ length: 9 }, (x, i) => (
            <button key={i} onClick={() => winner || squares[i] || handleClick(i)}
              className="text-7xl font-normal bg-white hover:bg-gray-100 transition-colors">
              {squares[i]}
            </button>
          ))}
        </div>
      </div>
      <span className="text-4xl">
        {XIsNext ? "X" : "O"} {winner ? "Won" : "Next"}
      </span>
    </div>
  )
}

export default Game