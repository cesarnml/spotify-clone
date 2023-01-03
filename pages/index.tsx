import GradientLayout from '@components/GradientLayout'
import Head from 'next/head'

const Home = () => {
  return (
    <>
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Spotify clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <GradientLayout color="red" isRoundedImage>
          <div>home page</div>
        </GradientLayout>
      </main>
    </>
  )
}

export default Home
