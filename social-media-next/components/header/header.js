// import styles from '../../styles/Home.module.css';
import styles from './header.module.css';

export default function Header(props) {
  const isLoggedIn = props.isLoggedIn;

  return (
    <nav className={`row ${styles.nav}`}>
      <h3 className={styles.name}> HEADER</h3>
      <div className={styles.links}>
        <p>LINKS</p>
        <p>LINKS</p>
        <p>LINKS</p>
      </div>
    </nav>
  );
}
