import GradientLayout from '@components/GradientLayout'
import prisma from '@lib/prisma'
import { Artist } from '@prisma/client'
import Head from 'next/head'

type Props = {
  artists: Artist[]
}
const Home = ({ artists }: Props) => {
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
        <div>
          {artists.map((artist) => (
            <div key={artist.id}>{artist.name}</div>
          ))}
        </div>
      </GradientLayout>
    </>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({ select: { id: true, name: true } })
  console.log('artists:', artists)

  return {
    props: {
      artists,
    },
  }
}

export default Home
