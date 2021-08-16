import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useContext, useEffect } from 'react';

import styles from './[userId].module.css';
import Dashboard from '../../components/modules/user-page/Dashboard/Dashboard';

import { StateContext } from '../../utils/lib/state-store/user-storage';

export default function GetOtherUserPage(props) {
  const router = useRouter();
  const [session, loading] = useSession();
  const appState = useContext(StateContext).searchedUser;
  let id = session?.user.urlPath || session?.user.id;

  useEffect(() => {
    if (!appState && !session) router.push('/');
    if (!appState && session) router.push('/profile/' + id);
  }, []);

  const firstName = appState?.firstName;
  const lastName = appState?.lastName ? appState.lastName : '';

  const user = { id: router.query.userId };
  const url = `/api/user/posts/get/${user.id}`;

  if (!appState) return <div>Error</div>;

  return (
    <div className={styles['dashboard-parent']}>
      <h3>{firstName + ' ' + lastName + "'s " + 'Profile'}</h3>
      <Dashboard user={user} url={url} />
    </div>
  );
}

// export async function getServerSideProps(context) {}
