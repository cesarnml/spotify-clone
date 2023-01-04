import { validateToken } from '@lib/auth'
import prisma from '@lib/prisma'
import { Playlist } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

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

type Props = {
  playlist: Playlist
}

const PlaylistPage = ({ playlist }: Props) => {
  const router = useRouter()
  return <div>{playlist.name}</div>
}
export default PlaylistPage
