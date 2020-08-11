import React from "react";
import {
  Text,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";
import { folders } from "../mockData";
import FolderCard from "./FolderCard";

export const ShowFolders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Text fontSize={"2xl"} mb={2} fontWeight="bold">
        Folders
      </Text>
      <SimpleGrid columns={[2, 2, 3, 4, 5]} spacing={3}>
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
          <ModalContent borderRadius="10px">
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Hello</ModalBody>
          </ModalContent>
        </Modal>
      </SimpleGrid>
    </div>
  );
};
