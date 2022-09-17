import { NextPage } from "next"
import { useRouter } from "next/router"
import Game from "./game"

const Room: NextPage = () => {
  const { query } = useRouter()

  return (
    <Game room={query?.room as string} />
  )
}

export default Room