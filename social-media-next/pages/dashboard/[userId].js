import Router, { useRouter } from 'next/router';
import { getCsrfToken, useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

import styles from './[userId].module.css';
import Dashboard from '../../components/modules/user-page/Dashboard/Dashboard';

export default function GetOtherUserPage(props) {
  const router = useRouter();
  const [session, loading] = useSession();
  const [isFriend, setIsFriend] = useState(false);
  const [isUser, setIsUser] = useState(false);
  console.log(session, !isFriend);

  console.log(isFriend);

  const { userId, firstName } = router.query;
  const lastName =
    router.query.lastName !== 'undefined' ? router.query.lastName : '';
  const user = { id: userId };
  const url = `/api/user/posts/get/${user.id}`;

  useEffect(() => {
    if (session?.user?.friends?.contains(userId)) {
      isFriend(true);
    }
    if (session.user.id === userId) {
      setIsUser(true);
    }
  }, []);

  if (!firstName) return <div>Error</div>;

  return (
    <div className={styles['dashboard-parent']}>
      <h3>{firstName + ' ' + lastName + "'s " + 'Profile'}</h3>
      {!isUser && session && !isFriend && <button>Add Friend</button>}
      {!isUser && session && isFriend && <button>Un-follow</button>}
      <Dashboard user={user} url={url} />
    </div>
  );
}

// export async function getServerSideProps({ req, res }) {
//   const csrfToken = await getCsrfToken({ req });
//   //put redirect if user is logged in or is csrfToken is truthy

//   console.log(csrfToken);
//   return {
//     props: {
//       csrfToken: csrfToken
//     }
//   };
// }
