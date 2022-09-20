import { NextPage } from "next"
import { useEffect, useState } from "react"
import getWinnerIndexes from "../lib/game/get-winner-indexes"
import { database } from "../firebase.config"
import { ref, set, update, onValue, DataSnapshot } from "firebase/database"

const Game: NextPage<{ room: string }> = ({ room }) => {
  const [snapshot, setSnapshot] = useState<DataSnapshot>()
  const [squares, setSquares] = useState<{ [key: number]: boolean }>({})
  const [XIsNext, setXIsNext] = useState(true)
  const [isPlayer1, setIsPlayer1] = useState<boolean>()
  const [winner, setWinner] = useState<string>()

  const handleClick = (i: number) => {
    if (isPlayer1 === undefined) {
      update(ref(database, `/${room}`), {
        player1_assigned: true,
        player1_squares_state: { ...squares, [i]: true },
        x_is_next: !XIsNext
      })
        .then(() => setIsPlayer1(true))
        .catch((error) => console.error(error))
    } else {
      update(ref(database, `/${room}`), {
        player1_squares_state: { ...squares, [i]: isPlayer1 },
        x_is_next: !XIsNext
      }).catch((error) => console.error(error))
    }
  }

  useEffect(() => {
    onValue(ref(database, `/${room}`), setSnapshot)
  }, [room])

  useEffect(() => {
    const data = snapshot?.val()
    if (!data) return

    const { player1_squares_state, x_is_next } = data

    if (Object.keys(player1_squares_state).length === 1 && isPlayer1 === undefined) {
      setIsPlayer1(false)
    }

    setSquares(player1_squares_state)
    const wins = getWinnerIndexes(player1_squares_state)

    if (typeof wins?.at(0) === "number") {
      setWinner(player1_squares_state[wins[0]])
    } else {
      setXIsNext(x_is_next)
    }
  }, [snapshot, isPlayer1])

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-[75vw] h-[75vw] mx-auto bg-gray-800">
        <div className="h-full grid grid-rows-3 grid-cols-3 gap-2">
          {Array.from({ length: 9 }, (x, i) => (
            <button key={i} onClick={() => Object.hasOwn(squares, i) || winner || (Object.keys(squares).length % 2 === (isPlayer1 ? 0 : 1) || isPlayer1 === undefined) && handleClick(i)}
              about={isPlayer1 === undefined || isPlayer1 ? "X" : "O"} className="text-7xl font-normal bg-white 
                empty:before:content-[attr(about)] before:text-gray-400 
                empty:before:opacity-0 hover:before:opacity-100 empty:before:transition-opacity">
              {!Object.hasOwn(squares, i) ? "" : squares[i] ? "X" : "O"}
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