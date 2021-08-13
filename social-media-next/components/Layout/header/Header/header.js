// import styles from '../../styles/Home.module.css';
import { useSession, signOut, signIn } from 'next-auth/client';
import Link from 'next/link';
import ProfileButton from '../ProfileButton/ProfileButton';
import SearchBar from '../SearchBar/SearchBar';
import styles from './header.module.css';

export default function Header(props) {
  const [session, loading] = useSession();

  const homePage = session ? `/profile/${session.user.id}` : '/';

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
        {session && <ProfileButton userId={session.user.id} />}
        {!session && <button onClick={signIn}>Login</button>}
      </div>
    </nav>
  );
}
