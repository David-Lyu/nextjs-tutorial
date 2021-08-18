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
  // console.log(session, !isFriend);

  console.log(session.user.friends);

  const { userId, firstName } = router.query;
  const lastName =
    router.query.lastName !== 'undefined' ? router.query.lastName : '';
  const user = { id: userId };
  const url = `/api/user/posts/get/${user.id}`;

  useEffect(() => {
    if (session?.user?.friends?.includes(userId)) {
      setIsFriend(true);
    }
    if (session.user.id === userId) {
      setIsUser(true);
    }
    /*eslint-disable */
  }, []);

  if (!firstName) return <div>user not exists</div>;

  return (
    <div className={styles['dashboard-parent']}>
      <h3>{firstName + ' ' + lastName + "'s " + 'Profile'}</h3>

      {!isUser && session && !isFriend && (
        <button onClick={() => handleAddFriendClick(userId, session.user.id)}>
          Add Friend
        </button>
      )}

      {!isUser && session && isFriend && (
        <button onClick={() => handleUnFollowClick(userId, session.user.id)}>
          Un-follow
        </button>
      )}

      <Dashboard user={user} url={url} />
    </div>
  );
}

function handleAddFriendClick(friendId, userId) {
  console.log('inside add click');
  const data = { friendId, userId };
  console.log(data);
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ friendId, userId })
  };
  fetch('/api/user/friend', options).then((resp) => console.log(resp));
  //put method url: /api/user/friend
}

function handleUnFollowClick(friendId, userId) {
  console.log('inside un-follow click');
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ friendId, userId })
  };
  fetch('/api/user/friend', options).then((resp) => console.log(resp));
  // a delete method url : /api/user/friend
}

// export async function getServerSideProps({ req, res }) {
//   //put redirect if user is logged in or is csrfToken is truthy

//   console.log(csrfToken);
//   return {
//     props: {
//       csrfToken: csrfToken
//     }
//   };
// }
