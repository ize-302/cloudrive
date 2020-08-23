import React, { useState, useEffect } from "react";
import { Text, Box, Button } from "@chakra-ui/core";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/core";
import { db, storage } from "../firebase";

export const FileCard = (props) => {
  const [extension, setExtension] = useState("");
  const [fileName, setFileName] = useState("");
  const { id, file_name, folder_name, date_added } = props;

  let userData = JSON.parse(window.localStorage.getItem("userData"));

  var storageRef = storage.ref();
  var desertRef = storageRef.child(`${userData.email}/${file_name}`);
  let docRef = db.collection("users").doc(userData.email);

  const deleteFile = () => {
    // Delete the file
    desertRef
      .delete()
      .then(function () {
        // File deleted successfully
        // remove file from array
        // fetch files array
        docRef.get().then(function (doc) {
          if (doc.exists) {
            let docData = doc.data();
            // get files
            let filteredFiles = docData.files.filter((item) => item.id !== id);
            console.log(filteredFiles);
            docRef.update({
              files: filteredFiles,
            });
            alert("deleted");
          }
        });
      })

      .catch(function (error) {
        alert("error");
        // Uh-oh, an error occurred!
      });
  };

  const downloadFile = () => {
    desertRef.getDownloadURL().then(function (url) {
      window.open(url, "_blank");
    });
  };

  useEffect(() => {
    var fileExt = file_name.split(".").pop();
    setExtension(fileExt);
    setFileName(file_name.split(".").slice(0, -1).join("."));
  });
  return (
    <Menu>
      <MenuButton
        borderRadius={"md"}
        border="1px solid #ddd"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        h={[56, 48, 48, 48]}
        p={[5]}
        as={Button}
      >
        {"." + extension}
        <Box mt={[32, 20]} textAlign="left">
          <Text fontWeight="bold">{fileName.substring(0, 17) + "..."}</Text>
          <Text fontWeight="normal" mt={1} fontSize={"xs"}>
            Uploaded: {date_added}
          </Text>
        </Box>
      </MenuButton>
      <MenuList>
        <MenuGroup>
          <MenuItem>Move to</MenuItem>
          <MenuItem onClick={downloadFile}>Download</MenuItem>
          <MenuItem>Rename</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={deleteFile}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};
