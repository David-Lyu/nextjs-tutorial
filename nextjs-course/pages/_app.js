import '../styles/globals.css';
import Layout from '../components/layout/Layout';

//next js using prop destructuring (Component and pageProps)
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
