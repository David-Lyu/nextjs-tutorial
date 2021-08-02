import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from '../styles/Home.module.css';
import Form from '../components/modules/Form/form';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) router.push('/secret');
  }, [session]);

  //Form components
  const LOGIN_CONFIG = Object.freeze({
    url: '/api/login',
    method: 'POST'
  });
  const LOGIN_INPUTS = Object.freeze([
    { label: 'Email', type: 'email' },
    { label: 'Password', type: 'password' }
  ]);
  function loginFunc(data) {
    console.log(data);
  }

  const SIGNUP_CONFIG = Object.freeze({
    url: '/api/create-new-user',
    method: 'POST'
  });
  const SIGNUP_INPUTS = Object.freeze([
    { label: 'Email', type: 'email' },
    { label: 'First Name', type: 'text' },
    { label: 'Last Name', type: 'text' },
    { label: 'Phone Number', type: 'tel' },
    { label: 'Password', type: 'password' },
    { label: 'Confirm Password', type: 'password' }
  ]);
  function signupFunc(data) {}

  //RETURN
  return (
    <div>
      <Head>
        <title>Social Media App</title>
        <meta
          name="NextJS Social media app"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main + ' row'}>
        <h1>Welcome to Social Media</h1>
        <section className={styles['signup-section']}>
          <div className={styles.register}>
            <h3> New? Please register</h3>
            <Form
              inputs={SIGNUP_INPUTS}
              formName={'signup'}
              config={SIGNUP_CONFIG}
              submitFunc={signupFunc}
            />
          </div>
          <div className={styles.login}>
            <h3>Welcome back please login</h3>
            <Form
              inputs={LOGIN_INPUTS}
              formName="Login"
              config={LOGIN_CONFIG}
              submitFunc={loginFunc}></Form>
            <div>
              Or signin with GitHub{' '}
              <button onClick={signIn}>Github Sign in</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
