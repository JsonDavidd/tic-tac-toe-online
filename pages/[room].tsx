import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Game from "../components/game"

const Room: NextPage = () => {
  const { query, push } = useRouter()
  const [isRoomValid, setIsRoomValid] = useState<boolean>()

  useEffect(() => {
    setIsRoomValid(typeof query?.room === "string"
      && query.room.length === 6
      && query.room.toLowerCase() === query.room)
  }, [query])

  useEffect(() => {
    if (isRoomValid === false) {
      push("/")
    }
  }, [isRoomValid, push])

  if (!isRoomValid) {
    return (
      <span>redirecting...</span>
    )
  }

  return (
    <Game room={query?.room as string} />
  )
}

export default Room