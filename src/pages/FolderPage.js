import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Flex,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/core";
import { FileCard } from "../components/FileCard";
import { Link, useHistory } from "react-router-dom";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const Folder = ({ match }) => {
  let history = useHistory();

  let userData = JSON.parse(window.localStorage.getItem("userData"));
  let docRef = db.collection("users").doc(userData.email);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");

  const [upload, setUpload] = useState(null);

  let currentFolderId = match.params.id;

  useEffect(() => {
    // get related files
    docRef.get().then(function (doc) {
      if (doc.exists) {
        let docData = doc.data();
        setFolders(docData.folders);

        // get files
        let findFilteredFiles = docData.files.filter(
          (item) => item.folder === currentFolderId
        );
        setFilteredItems(findFilteredFiles);

        // get folfer
        let findFolder = docData.folders.find(
          (folder) => folder.id === currentFolderId
        );
        setFolder(findFolder);
      }
    });
  }, [filteredItems]);

  const handleRenameFolder = (e) => {
    e.preventDefault();
    folders.map((folder) => {
      if (folder.id === currentFolderId) {
        folder.name = newFolderName;
        return docRef.update({
          folders: folders,
        });
      }
    });
    onClose();
  };

  const handleDeleteFolder = () => {
    let getFolders = folders;
    getFolders = getFolders.filter((folder) => folder.id !== currentFolderId);
    // update folders
    docRef.update({
      folders: getFolders,
    });
    // push to home
    history.push({
      pathname: "/",
    });
  };

  const onChangeUpload = (e) => {
    if (e.target.files[0]) {
      setUpload(e.target.files[0]);
    }
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    const uploadTask = storage
      .ref(`${userData.email}/${upload.name}`)
      .put(upload);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        // store file
        storage
          .ref(`${userData.email}`)
          .child(upload.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            console.log(filteredItems);
            docRef.update({
              files: [
                ...filteredItems,
                {
                  id: uuidv4(),
                  date_added: "7/13/2020",
                  file_name: upload.name,
                  folder: currentFolderId,
                },
              ],
            });
          });
      }
    );
  };

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Breadcrumb
          fontSize={"md"}
          mb={10}
          spacing="8px"
          separator={<Icon color="gray.300" name="chevron-right" />}
        >
          <BreadcrumbItem>
            <Link to="/">Back</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{folder.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex>
          <Button
            mr={2}
            bg="blue.700"
            _hover={{ bg: "blue.400" }}
            color="white"
            mr={2}
            onClick={onOpen}
          >
            Rename folder
          </Button>
          <Button
            mr={2}
            bg="red.300"
            _hover={{ bg: "red.400" }}
            onClick={handleDeleteFolder}
          >
            Delete folder
          </Button>
          <form onSubmit={handleUploadFile}>
            <input type="file" onChange={onChangeUpload} />
            <Button type="submit">Upload</Button>
          </form>
        </Flex>
        {/* modal */}
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent borderRadius="10px" p={5} h={"250px"} w={"350px"}>
            <Flex alignItems="center">
              <ModalHeader p="0">Rename folder</ModalHeader>
              <ModalCloseButton />
            </Flex>
            <ModalBody
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <form onSubmit={handleRenameFolder}>
                <Input
                  placeholder="Folder name"
                  defaultValue={folder.name}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
                <Button
                  type="submit"
                  bg="#0066F5"
                  color="white"
                  w={"100%"}
                  mt={5}
                >
                  Submit
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>

      <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={[3, 5, 10]}>
        {filteredItems.map((item) => {
          return (
            <FileCard
              key={item.id}
              file_name={item.file_name}
              id={item.id}
              date_added={item.date_added}
              folder={item.folder}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Folder;
