import { NextRequest, NextResponse } from 'next/server'

const signedInPages = ['/', '/playlists', '/library']

const middleware = (req: NextRequest) => {
  if (signedInPages.find((page) => page === req.url)) {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (!token) {
      return NextResponse.redirect('/auth/signin', 302)
    }
    return NextResponse.next()
  }
}

export default middleware
