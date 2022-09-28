import { NextComponentType } from "next"
import { useEffect, useState } from "react"
import getWinnerIndexes from "../lib/game/get-winner-indexes"
import { database } from "../firebase.config"
import { ref, update, onValue, DataSnapshot, remove, } from "firebase/database"

const Game: NextComponentType<any, any, { room: string }> = ({ room }) => {
  const [snapshot, setSnapshot] = useState<DataSnapshot>()
  const [squares, setSquares] = useState<{ [key: number]: boolean }>({})
  const [isPlayer1Next, setIsPlayer1Next] = useState(true)
  const [isPlayerNext, setIsPlayerNext] = useState(true)
  const [isPlayer1, setIsPlayer1] = useState<boolean>()
  const [winner, setWinner] = useState<string>()

  const handleClick = (i: number) => {
    if (isPlayer1 === undefined) {
      update(ref(database, `/${room}`), {
        player1_assigned: true,
        player1_squares_state: { ...squares, [i]: true },
        is_player1_next: !isPlayer1Next
      })
        .then(() => setIsPlayer1(true))
        .catch((error) => console.error(error))
    } else {
      update(ref(database, `/${room}`), {
        player1_squares_state: { ...squares, [i]: isPlayer1 },
        is_player1_next: !isPlayer1Next
      }).catch((error) => console.error(error))
    }
  }

  useEffect(() => {
    onValue(ref(database, `/${room}`), setSnapshot)
  }, [room])

  useEffect(() => {
    const data = snapshot?.val()
    if (!data) return

    const { player1_squares_state, is_player1_next } = data

    if (Object.keys(player1_squares_state).length === 1 && isPlayer1 === undefined) {
      setIsPlayer1(false)
    }

    setSquares(player1_squares_state)
    const wins = getWinnerIndexes(player1_squares_state)

    if (typeof wins?.at(0) === "number") {
      setWinner(player1_squares_state[wins[0]])
    } else {
      setIsPlayer1Next(is_player1_next)
    }
  }, [snapshot, isPlayer1])

  useEffect(() => {
    const cal = isPlayer1 === undefined || winner === undefined && Object.keys(squares).length % 2 === (isPlayer1 ? 0 : 1)
    setIsPlayerNext(Boolean(cal))
  }, [winner, squares, isPlayer1])

  useEffect(() => {
    if (!isPlayer1) return

    return () => {
      remove(ref(database, `/${room}`)).catch((error) => console.error(error))
    }
  }, [room, isPlayer1])

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <span className="absolute left-2 top-4">Room Id: {room}</span>
      <div className="w-[75vw] h-[75vw] max-w-[400px] max-h-[400px] mx-auto bg-gray-800">
        <div className="h-full grid grid-rows-3 grid-cols-3 gap-2">
          {Array.from({ length: 9 }, (x, i) => (
            <button key={i} onClick={() => !Object.hasOwn(squares, i) && isPlayerNext && handleClick(i)}
              about={isPlayer1 === undefined || isPlayer1 ? "X" : "O"} className="text-7xl font-normal bg-white 
                empty:before:content-[attr(about)] before:text-gray-400 
                empty:before:opacity-0 hover:before:opacity-100 empty:before:transition-opacity">
              {!Object.hasOwn(squares, i) ? "" : squares[i] ? "X" : "O"}
            </button>
          ))}
        </div>
      </div>
      <span className="text-4xl">
        {isPlayer1Next ? "X" : "O"} {winner ? "Won" : "Next"}
      </span>
    </div>
  )
}

export default Game