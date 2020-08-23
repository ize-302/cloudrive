import React, { useState, useEffect } from "react";
import { ShowFolders } from "../components/Folders";
import { db } from "../firebase";

const HomePage = () => {
  let userData = JSON.parse(window.localStorage.getItem("userData"));
  let docRef = db.collection("users").doc(userData.email);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    docRef.get().then(function (doc) {
      if (doc.exists) {
        let docData = doc.data();
        setFiles(docData.files);
      }
    });
  }, [files]);

  return (
    <>
      <ShowFolders />
    </>
  );
};

export default HomePage;
