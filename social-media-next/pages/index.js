import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Headers from '../components/header/header';
import { useState } from 'react';

export default function Home() {
  const [isLoginShown, setIsLoginShown] = useState(false);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Headers></Headers>
      <main className={styles.main + ' row'}>
        <h1>Welcome to Social Media</h1>
        <section>
          <div className={styles.register}>
            <h3> New please register</h3>
            <form className={styles.form}>
              <label>
                Email
                <input />
              </label>
              <label>
                First Name
                <input />
              </label>
              <label>
                Last name
                <input />
              </label>
              <label>
                Phone number
                <input />
              </label>
              <label>
                Password
                <input />
              </label>
              <label>
                Confirm Password
                <input />
              </label>
            </form>
          </div>
          <div className={styles.login}>
            <h3>Welcome back please login</h3>
            <form className={styles.form}>
              <label>
                Email:
                <input />
              </label>
              <label>
                Password
                <input />
              </label>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

//  <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className={styles.card}
//           >
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer>
