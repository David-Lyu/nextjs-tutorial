import { getSession } from 'next-auth/client';
import { useState, useRef } from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// import storage from '../../utils/lib/firebase/firebase';
import Dashboard from '../../components/modules/user-page/Dashboard';

export default function GetMyUserPage(props) {
  const postTextRef = useRef('');
  const postImageRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isFormDisable, setIsFormDisable] = useState(false);

  const onPostSubmit = (e) => {
    e.preventDefault();
    const postTextValue = postTextRef.current.value;
    console.log(isFormDisable);

    //fetch an api
    const formData = {
      message: postTextValue,
      image: imageUrl
    };

    const config = {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // fetch('/api/user/posts/post', config);
    //move all this to the api directory
    //gets the file typeof

    return null;
  };

  const imageOnChange = () => {
    setIsFormDisable(true);
    const imageFile = getFileType(postImageRef.current.value);
    const fileType = imageFile[0];
    const storage = getStorage();
    const fileRef = ref(storage, 'images/' + imageFile[1]);
    const metadata = {
      contentType: 'image/' + fileType
    };
    const uploadTask = uploadBytes(storageRef, postImageValue, metadata);
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
        //handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('file available at downLoadURL');
          setImageURL(downloadURL);
          setIsFormDisable(false);
        });
      }
    );
  };

  return (
    <div className="container">
      <form onSubmit={onPostSubmit}>
        <label htmlFor="post-input">Text</label>
        <input type="text" id="post-input" ref={postTextRef} required></input>
        <label htmlFor="post-image">Image</label>
        <input
          type="file"
          id="post-image"
          ref={postImageRef}
          onChange={imageOnChange}></input>
        <button disabled={isFormDisable}>Submit</button>
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
