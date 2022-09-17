import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from "next/router"
import { FormEventHandler, MouseEventHandler } from "react"
import getRandomCharacter from "../lib/get-random-character"

const Home: NextPage = () => {
  const { push } = useRouter()

  const handleCreateClick: MouseEventHandler<HTMLButtonElement> = () => {
    const room = Array.from({ length: 6 }, () => getRandomCharacter()).join("")
    push(room)
  }

  const handleJoinSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.stopPropagation()
    event.preventDefault()

    const { room } = Object.fromEntries((new FormData(event.currentTarget)).entries())

    push(room as string)
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <Head>
        <title>Tic Tac Toe online</title>
        <meta name="description" content="Play the classic game Tic Tac Toe online!" />
      </Head>
      <header className="min-h-[10vh]">
        <h1 className="text-4xl">Tic Tac toe</h1>
      </header>
      <button onClick={handleCreateClick} className="px-4 py-2 text-xl font-medium text-white rounded-md
      bg-blue-600 hover:bg-blue-700">Create</button>
      <form onSubmit={handleJoinSubmit} className="flex flex-col gap-2">
        <input type="text" name="room" maxLength={6} minLength={6} required
          className="px-4 py-2 border-2 rounded-lg" />
        <button type="submit" className="px-4 py-2 self-center text-xl font-medium text-white 
          rounded-md bg-blue-600 hover:bg-blue-700">Join</button>
      </form>
    </div>
  )
}

export default Home
