import React, { useState } from "react";
import { Button } from "@mui/material";
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const ImageUpload = () => {
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
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesnt have permission to access the object!");
            break;
          case "storage/canceled":
            console.log("User canceled the upload!");
            break;
          case "storage/unknown":
            console.log("Unknown error occurred, inspect error.serverResponse");
            break;
          default:
            console.log("Unknown error occured!");
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
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

  image && console.log(image.name);

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
