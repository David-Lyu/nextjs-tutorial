import { getSession } from 'next-auth/client';
import { useRef } from 'react';
import Dashboard from '../../components/modules/user-page/Dashboard';

export default function GetMyUserPage(props) {
  const postTextRef = useRef('');
  const postImageRef = useRef(null);
  //probably use grid to style this places
  // console.log(props.id);
  const onPostSubmit = (e) => {
    e.preventDefault();
    const postTextValue = postTextRef.current.value;
    const postImageValue = postImageRef.current.value;

    //gets the file typeof
    const ImageSplit = postImageValue.split('.');
    const fileType = ImageSplit[ImageSplit.length - 1];
    console.log(fileType);

    return null;
  };
  return (
    <div className="container">
      <form onSubmit={onPostSubmit}>
        <label htmlFor="post-input">Text</label>
        <input type="text" id="post-input" ref={postTextRef}></input>
        <label htmlFor="post-image">Image</label>
        <input type="file" id="post-image" ref={postImageRef}></input>
        <button>Submit</button>
      </form>
      <div>Portfolio</div>
      <Dashboard user={props.session.user} />
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
  return {
    props: { session }
  };
}
