import { useRouter } from 'next/router';
import Dashboard from '../../components/modules/user-page/Dashboard';

export default function GetOtherUserPage(props) {
  const router = useRouter();
  console.log(router);
  const user = { id: router.query.userId };
  const url = `/api/user/posts/get/${user.id}`;

  return (
    <>
      <p>{'Inside' + ' ' + user.id}</p>
      <Dashboard user={user} url={url} />
    </>
  );
}

// export async function getServerSideProps(context) {}
