import { NextPage } from "next"
import { useEffect, useState } from "react"
import getWinnerIndexes from "../lib/game/get-winner-indexes"
import { database } from "../firebase.config"
import { ref, set, onValue, DataSnapshot } from "firebase/database"

const Game: NextPage = () => {
  const [snapshot, setSnapshot] = useState<DataSnapshot>()
  const [squares, setSquares] = useState<(string | undefined)[]>(Array(9))
  const [XIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState<string>()

  const handleClick = (i: number) => {
    set(ref(database, "/test"), {
      game_squares: { ...squares, [i]: XIsNext ? "X" : "O" },
      x_is_next: !XIsNext
    }).catch((error) => console.error(error))
  }

  useEffect(() => {
    onValue(ref(database, "/test"), setSnapshot)
  }, [])

  useEffect(() => {
    const data = snapshot?.val()
    if (!data) return
    const { game_squares, x_is_next } = data

    setSquares(game_squares)
    const wins = getWinnerIndexes(game_squares)

    if (typeof wins?.at(0) === "number") {
      setWinner(game_squares[wins[0]])
    } else {
      setXIsNext(x_is_next)
    }
  }, [snapshot])

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