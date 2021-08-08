import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default function handler(req, res) {
  const data = req.body;
  const postTextValue = data.postMessage;
  const postImageValue = data.postFile;
  let imageURL = '';
  console.log(data);

  const ImageSplit = postImageValue.split('.');
  const fileType = ImageSplit[ImageSplit.length - 1];
  console.log(fileType);

  const storage = getStorage();
  const fileRef = ref(storage, 'images/' + imageSplit[0]);
  const metadata = {
    contentType: 'image/' + fileType
  };

  const uploadTask = uploadBytes(storageRef, postImageValue, metadata);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        imageURL = downloadURL;
      });
    }
  );
}
