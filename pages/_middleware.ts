import { NextRequest, NextResponse } from 'next/server'

const signedInPages = ['/', '/playlists', '/library']

const middleware = (req: NextRequest) => {
  console.log('middleware: launched')
  if (signedInPages.find((page) => page === req.url)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN
    console.log('token:', token)

    if (!token) {
      console.log('no token:', token)
      return NextResponse.redirect('/auth/signin', 302)
    }
  }
}

export default middleware
