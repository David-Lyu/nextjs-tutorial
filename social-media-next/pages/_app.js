import { useReducer } from 'react';
import '../styles/globals.css';
import Layout from '../components/Layout/Layout';
import {
  StateContext,
  DispatchContext,
  initialState,
  reducer
} from '../state-store/user-storage';

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Layout>
          <Component {...pageProps} />{' '}
        </Layout>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default MyApp;
