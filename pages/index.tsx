import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
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
        color="purple"
        subtitle="profile"
        title="Cesar Mejia"
        description="15 public playlist"
        image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
      >
        <Box color="white" paddingX="40px">
          <Box marginBottom="40px">
            <Text fontSize="2xl" fontWeight="bold">
              Top artist this month
            </Text>
            <Text fontSize="md">only visible to you</Text>
          </Box>
          <Flex gap="20px">
            {artists.map((artist) => (
              <Box key={artist.id} bg="gray.800" borderRadius="4px" padding="15px" width="20%">
                <Image src="https://placekitten.com/300/300" borderRadius="100%" alt="artist" />
                <Box marginTop="20px">
                  <Text fontSize="xl">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </GradientLayout>
    </>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({ select: { id: true, name: true } })

  return {
    props: {
      artists,
    },
  }
}

export default Home
