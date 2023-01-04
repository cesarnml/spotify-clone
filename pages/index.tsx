import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import GradientLayout from '@components/GradientLayout'
import prisma from '@lib/prisma'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import jwt from 'jsonwebtoken'
import { Artist, Playlist, User } from '@prisma/client'

type Props = {
  user: Partial<User> & { playlists: Partial<Playlist>[] }
  artists: Partial<Artist>[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.TRAX_ACCESS_TOKEN
  const { id } = jwt.verify(token, process.env.JWT_SECRET) as User

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      playlists: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  const artists = await prisma.artist.findMany({ select: { id: true, name: true } })

  return {
    props: {
      artists,
      user,
    },
  }
}

const Home = ({ artists, user }: Props) => {
  const { firstName, lastName, playlists } = user
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
        title={`${firstName} ${lastName}`}
        description={`${playlists.length} public playlist`}
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

export default Home
