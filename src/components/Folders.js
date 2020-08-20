import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  SimpleGrid,
  Modal,
  Flex,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/core";
// import { folders } from "../mockData";
import FolderCard from "./FolderCard";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export const ShowFolders = () => {
  let userData = JSON.parse(window.localStorage.getItem("userData"));
  let docRef = db.collection("users").doc(userData.email);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");

  const handleAddFolder = () => {
    onClose();
    return docRef.update({
      folders: [...folders, { id: uuidv4(), name: newFolder }],
    });
  };
  useEffect(() => {
    docRef.get().then(function (doc) {
      if (doc.exists) {
        let docData = doc.data();
        setFolders(docData.folders);
      }
    });
  }, [folders]);
  return (
    <div>
      <Text fontSize={"2xl"} mb={2} fontWeight="bold">
        Folders
      </Text>
      <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={3}>
        {folders.map((folder) => {
          return (
            <FolderCard
              key={folder.id}
              bg="gray.200"
              borderColor="#ccc"
              icon="folder"
              id={folder.id}
              name={folder.name}
            />
          );
        })}
        <Button p={8} border="1px solid #ddd" bg="#eee" onClick={onOpen}>
          Add folder
        </Button>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent borderRadius="10px" p={5} h={"250px"} w={"350px"}>
            <Flex alignItems="center">
              <ModalHeader p="0">Add folder</ModalHeader>
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
                onChange={(e) => setNewFolder(e.target.value)}
              />
              <Button
                bg="#0066F5"
                color="white"
                onClick={handleAddFolder}
                w={"100%"}
                mt={5}
              >
                Create folder
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </SimpleGrid>
    </div>
  );
};
