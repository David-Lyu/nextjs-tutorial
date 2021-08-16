import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  getSession,
  getCsrfToken
} from 'next-auth/client';
import { useRef } from 'react';
import { AiFillGithub, AiOutlineMail } from 'react-icons/ai';

import styles from '../styles/Home.module.css';
import Form from '../components/modules/Form/form';

export default function Home(props) {
  const router = useRouter();
  const [session, loading] = useSession();
  const signUpEle = useRef(null);
  const signInEle = useRef(null);

  let id = session?.user.urlPath || session?.user.id;
  //can change callback from nextjs will work on this later
  if (session) {
    router.push('/profile/' + id);
    // router.push('/profile/' + id, '/profile/' + session.user.name);
  }

  //Form components
  const LOGIN_CONFIG = Object.freeze({
    url: '/api/custom-sign/login',
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
    url: '/api/custom-sign/create-new-user',
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
          <div className={styles.register} ref={signUpEle}>
            <h3> New? Please register</h3>
            <Form
              inputs={SIGNUP_INPUTS}
              formName={'signup'}
              config={SIGNUP_CONFIG}
              submitFunc={signupFunc}
            />
            {/* This is hidden till <600px */}
            <div className={styles['show-login-click']}>
              <p>To sign-in click on the link below</p>
              <a
                onClick={() => {
                  showSignUpOrIn(signInEle, signUpEle, 'signup');
                }}>
                Click here to login
              </a>
            </div>
          </div>

          <div className={styles.login} ref={signInEle}>
            <h3>Welcome back please login</h3>
            <Form
              inputs={LOGIN_INPUTS}
              formName="Login"
              csrfToken={props.csrfToken}
              onSubmit={(e) => {
                loginOnSubmit(e, signIn);
              }}></Form>
            <div>
              <p>Or signin/signup with these:</p>
              <div className={styles['svg-icons']}>
                <AiFillGithub
                  role="link"
                  tabIndex="0"
                  onClick={() => signIn('github')}
                  onKeyUp={(e) => handleClickOrPress(e, () => signIn('github'))}
                  aria-label="GitHub"
                />
                <AiOutlineMail
                  role="link"
                  tabIndex="0"
                  onClick={() => signIn()}
                  aria-label="email"
                  onKeyUp={(e) => handleClickOrPress(e, () => signIn())}
                />
              </div>
              {/* This is hidden till <600px */}
              <div className={styles['show-register-click']}>
                <p>To sign-up click on the link below</p>
                <a
                  onClick={() => {
                    showSignUpOrIn(signInEle, signUpEle, 'signin');
                  }}>
                  Click here to register
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const csrfToken = await getCsrfToken({ req });
  return {
    props: {
      csrfToken: csrfToken
    }
  };
}

//helper functions
//need to get error handling
function loginOnSubmit(e, signIn) {
  e.preventDefault();
  const email = e.currentTarget.children[1].children[0].children[0].value;
  const password = e.currentTarget.children[2].children[0].children[0].value;
  signIn('credentials', { username: email, password, callback: '/' });
}

function showSignUpOrIn(signInElement, signUpElement, from) {
  if (from === 'signup') {
    //want to show sign in
    signInElement.current.classList.remove('hide');
    signUpElement.current.classList.remove('show');
    signInElement.current.classList.add('show');
    signUpElement.current.classList.add('hide');
  }

  if (from === 'signin') {
    //want to show sign up
    signInElement.current.classList.remove('show');
    signUpElement.current.classList.remove('hide');
    signInElement.current.classList.add('hide');
    signUpElement.current.classList.add('show');
  }
}

function handleClickOrPress(e, ...functions) {
  // console.log(functions);
  if ((e.type === 'keyup' && e.key === 'Enter') || e.type === 'click') {
    for (const callable of functions) {
      callable();
    }
  }
}
