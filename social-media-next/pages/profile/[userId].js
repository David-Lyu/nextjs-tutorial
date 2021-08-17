import { getSession } from 'next-auth/client';
import { useState, useRef } from 'react';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

import styles from './[userId].module.css';

import storage from '../../utils/lib/firebase/firebase';
import Dashboard from '../../components/modules/user-page/Dashboard/Dashboard';

export default function GetMyUserPage(props) {
  const postTextRef = useRef('');
  const postImageRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isFormDisable, setIsFormDisable] = useState(false);
  const [reRender, setReRender] = useState(false);

  const onPostSubmit = (e) => {
    e.preventDefault();
    const postTextValue = postTextRef.current.value;

    //fetch an api
    const formData = {
      userId: props.session.user.id,
      message: postTextValue,
      image: imageUrl
    };

    const config = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/api/user/posts/post/', config)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        postImageRef.current.value = null;
        postTextRef.current.value = null;
        setReRender(!reRender);
      });

    return null;
  };

  //sends the file to firebase
  const imageOnChange = () => {
    setIsFormDisable(true);
    const imageFile = getFileType(postImageRef.current.value);
    const fileType = imageFile[0];
    const storageRef = storage.ref();
    const metadata = {
      contentType: 'image/' + fileType
    };
    const uploadTask = storageRef
      .child('images/test')
      .put(postImageRef.current.files[0], metadata);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('upload is paused');
            break;
          case 'running':
            console.log('upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          default:
            console.log(error);
        }
        setIsFormDisable(false);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(downloadURL);
          setImageUrl(downloadURL);
          setIsFormDisable(false);
        });
      }
    );
  };

  return (
    <div className={styles['profile-container']}>
      <form onSubmit={onPostSubmit}>
        <div className={styles['post-inputs']}>
          <label htmlFor="post-input">Text</label>
          <input type="text" id="post-input" ref={postTextRef} required></input>
          <label htmlFor="post-image">Image</label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="currentColor"
            className="bi bi-file-earmark-arrow-up"
            viewBox="0 0 16 16">
            <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
          </svg>
          <input
            type="file"
            id="post-image"
            ref={postImageRef}
            onChange={imageOnChange}
            disabled={isFormDisable}
          />
        </div>
        <button disabled={isFormDisable}>Submit</button>
      </form>
      <div>Portfolio</div>
      <Dashboard
        user={props.session.user}
        reRender={reRender}
        url={`/api/user/posts/get/get-every/${props.session.user.id}`}
      />
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  //fetch user here
  const session = await getSession({ req });
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

/**
 *
 * @param imageFile - the file name that gets passed down to this place
 * @returns [String,String] with 1st index
 * - that is the format of the image
 * - the name of the file
 */
function getFileType(imageFile) {
  console.log(imageFile);
  const ImageSplit = imageFile.split('.');
  const fileType = ImageSplit[ImageSplit.length - 1];
  return [fileType, ImageSplit[0]];
}
