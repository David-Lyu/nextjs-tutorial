import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default function handler(req, res) {
  const data = req.body;
  const postTextValue = data.postMessage;
  const postImageValue = data.postFile;
  let imageURL = '';

  const imageFile = getFileType(data.postFile);

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
        //add the fetch method to go to post db in mongo
      });
    }
  );
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
