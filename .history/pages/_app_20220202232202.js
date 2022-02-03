import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvide backgroundColor={gray}>
         <Component {...pageProps} />
    </ChakraProvider>
  )
 
}

export default MyApp
