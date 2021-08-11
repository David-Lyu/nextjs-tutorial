// import styles from '../../styles/Home.module.css';
import { useSession, signOut, signIn } from 'next-auth/client';
import Link from 'next/link';
import SearchBar from '../../modules/Header/SearchBar/SearchBar';
import styles from './header.module.css';

export default function Header(props) {
  const [session, loading] = useSession();

  const homePage = session ? `/profile/${session.user.id}` : '/';
  const onSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className={`row ${styles.nav}`}>
      <Link href={homePage} passHref>
        <h3 className={styles.name}>
          <a>Header</a>
        </h3>
      </Link>
      <div className={styles.links}>
        <SearchBar />
        <p>LINKS</p>
        {session && <button onClick={onSignOut}>Logout</button>}
        {!session && <button onClick={signIn}>Login</button>}
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
