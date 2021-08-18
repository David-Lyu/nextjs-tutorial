import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useContext, useEffect } from 'react';

import styles from './[userId].module.css';
import Dashboard from '../../components/modules/user-page/Dashboard/Dashboard';

import { StateContext } from '../../utils/lib/state-store/user-storage';

export default function GetOtherUserPage(props) {
  const router = useRouter();
  const [session, loading] = useSession();
  const { userId, firstName } = router.query;

  const lastName =
    router.query.lastName !== 'undefined' ? router.query.lastName : '';

  const user = { id: userId };
  const url = `/api/user/posts/get/${user.id}`;

  if (!firstName) return <div>Error</div>;

  return (
    <div className={styles['dashboard-parent']}>
      <h3>{firstName + ' ' + lastName + "'s " + 'Profile'}</h3>
      <Dashboard user={user} url={url} />
    </div>
  );
}

// export async function getServerSideProps(context) {}
