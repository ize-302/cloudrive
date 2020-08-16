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
import { Link } from "react-router-dom";
import { db } from "../firebase";

const Folder = ({ match }) => {
  let userData = JSON.parse(window.localStorage.getItem("userData"));
  let docRef = db.collection("users").doc(userData.email);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");

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

  const handleRenameFolder = () => {
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
    console.log(getFolders);
    docRef
      .update({
        folders: getFolders,
      })
      .then(() => {
        window.location.replace("/");
      });
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
          <Button>Upload new file</Button>
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
              <Input
                placeholder="Folder name"
                defaultValue={folder.name}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              <Button
                bg="#0066F5"
                color="white"
                w={"100%"}
                mt={5}
                onClick={handleRenameFolder}
              >
                Submit
              </Button>
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
