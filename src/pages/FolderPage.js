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
} from "@chakra-ui/core";
import { FileCard } from "../components/FileCard";
import { items, folders } from "../mockData";
import { Link } from "react-router-dom";

const Folder = ({ match }) => {
  const [folder, setFolder] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    let currentFolderId = match.params.id;
    let findFolder = folders.find((folder) => folder.id == currentFolderId);
    setFolder(findFolder);
    let findItems = items.filter((item) => item.folder === currentFolderId);
    console.log(findItems);
    setFilteredItems(findItems);
  }, []);
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
        <Button>Upload new file</Button>
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
