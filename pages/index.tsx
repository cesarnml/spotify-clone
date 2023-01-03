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
      <GradientLayout
        isRoundedImage
        color="green"
        subtitle="profile"
        title="Cesar Mejia"
        description="15 public playlist"
        image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
      >
        <div>home page</div>
      </GradientLayout>
    </>
  )
}

export default Home
