import GradientLayout from '@components/GradientLayout'
import SongsTable from '@components/SongsTable'
import { validateToken } from '@lib/auth'
import prisma from '@lib/prisma'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const token = req.cookies.TRAX_ACCESS_TOKEN
  let userId

  try {
    const user = validateToken(token)
    userId = user.id
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    }
  }

  const playlist = await prisma.playlist.findFirst({
    where: { userId, id: Number(query.id) },
    include: {
      songs: {
        include: {
          artists: true,
        },
      },
    },
  })

  return {
    props: {
      playlist,
    },
  }
}
const getBgColor = (id: number) => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple', 'gray', 'teal', 'yellow']
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const PlaylistPage = ({ playlist }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const color = getBgColor(playlist.id)

  return (
    <GradientLayout
      color={color}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length ?? 0} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  )
}
export default PlaylistPage
