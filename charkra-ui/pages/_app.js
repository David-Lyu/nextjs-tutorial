import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { Chakra } from '../component/ChakraColorMode/Chakra';
import theme from '../utils/lib/themes/theme';

function MyApp({ Component, pageProps }) {
  return (
    // <Chakra cookies={pageProps.cookies}>
    //   <Component {...pageProps} />
    // </Chakra>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export { getServerSideProps } from '../component/ChakraColorMode/Chakra';

export default MyApp;
