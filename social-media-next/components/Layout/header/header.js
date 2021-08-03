// import styles from '../../styles/Home.module.css';
import { useSession, logOut, logIn } from 'next-auth/client';
import styles from './header.module.css';

export default function Header(props) {
  const [session, loading] = useSession();

  return (
    <nav className={`row ${styles.nav}`}>
      <h3 className={styles.name}> HEADER</h3>
      <div className={styles.links}>
        <p>LINKS</p>
        <p>LINKS</p>
        {session && <button onClick={logOut}>Logout</button>}
        {!session && <button onClick={logIn}>Login</button>}
      </div>
    </nav>
  );
}

// export async function getServerSideProps(context) {
//   const session = getSession();
//   return {
//     prop: {
//       session
//     }
//   };
// }
