import { getSession } from 'next-auth/client';

export default function getMyUserPage(props) {
  //probably use grid to style this places
  // console.log(props.id);
  return (
    <div className="container">
      <div>Portfolio</div>
      feed
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  //fetch user here
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/error?error=AccessDenied',
        permanent: false
      }
    };
  }
  const data = 'stuff';
  //if doesn't exist then push back to original pageProps
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  //if does exist logic
  // const id = context.params._id;
  // console.log(id);
  return {
    // props: { id }
    props: { session }
  };
}
