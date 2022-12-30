import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import MusicPlayerLayout from '@components/MusicPlayerLayout'
import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import 'reset-css'

const theme = extendTheme({
  colors: {
    gray: {
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#EOEOEO',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
})

const isAuthPage = (router: Router) => router.pathname.includes('/auth')

const App = ({ Component, pageProps, router }: AppProps) => (
  <ChakraProvider theme={theme}>
    {/* //TODO: Is this kosher? */}
    {isAuthPage(router) ? (
      <Component {...pageProps} />
    ) : (
      <MusicPlayerLayout>
        <Component {...pageProps} />
      </MusicPlayerLayout>
    )}
  </ChakraProvider>
)

export default App
