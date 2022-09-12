import type { NextPage } from 'next'
import Head from 'next/head'
import Game from "./game"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tic Tac Toe online</title>
        <meta name="description" content="Play the classic game Tic Tac Toe online!" />
      </Head>
      <Game />
    </div>
  )
}

export default Home
