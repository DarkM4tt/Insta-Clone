import React, { useState } from "react";
import { Button } from "@mui/material";
import { db, storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const ImageUpload = ({ username }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const imagesRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await setDoc(doc(db, "posts", `${Math.random()}`), {
            timestamp: serverTimestamp(),
            caption: caption,
            imageUrl: downloadURL,
            username: username,
          });
          setProgress(0);
          setCaption("");
          setImage(null);
        });
      }
    );
  };

  //   const handleUpload1 = () => {
  //     uploadTask = storage.ref(`images/${image.name}`).put(image);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress = Math.round(
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //         );
  //         setProgress(progress);
  //       },
  //       (error) => {
  //         console.log(error);
  //         alert(error.message);
  //       },
  //       () => {
  //         storage
  //           .ref("images")
  //           .child(image.name)
  //           .getDownloadURL()
  //           .then((url) => {
  //             db.collections("posts").add({
  //               timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //               caption: caption,
  //               imageUrl: url,
  //               username: username,
  //             });
  //           });
  //       }
  //     );
  //   };

  return (
    <div>
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
