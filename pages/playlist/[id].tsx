import GradientLayout from '@components/GradientLayout'
import { validateToken } from '@lib/auth'
import prisma from '@lib/prisma'
import { Artist, Playlist, Song } from '@prisma/client'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps<Playlist> = async ({ query, req }) => {
  const token = req.cookies.TRAX_ACCESS_TOKEN
  const { id: userId } = validateToken(token)

  const playlist = await prisma.playlist.findFirst({
    where: { userId, id: Number(query.id) },
    select: {
      id: true,
      name: true,
      songs: {
        select: {
          id: true,
          name: true,
          url: true,
          artists: {
            select: {
              id: true,
              name: true,
            },
          },
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
type Props = {
  playlist: Pick<Playlist, 'id' | 'name'> & {
    songs: Pick<Song, 'id' | 'name' | 'url'>[] & { artists: Pick<Artist, 'id' | 'name'>[] }
  }
}

const PlaylistPage = ({ playlist }: Props) => {
  const color = getBgColor(playlist.id)

  return (
    <GradientLayout
      color={color}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length ?? 0} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <div>Hello</div>
    </GradientLayout>
  )
}
export default PlaylistPage
