import React, { useContext, useState, useEffect } from "react";
import { Text, Box, SimpleGrid } from "@chakra-ui/core";
import { ShowFolders } from "../components/Folders";
import { items } from "../mockData";
import { FileCard } from "../components/FileCard";
import { AuthContext } from "../contexts/AuthContext";

const HomePage = () => {
  return (
    <AuthContext.Consumer>
      {(context) => (
        <>
          <ShowFolders />
          <Box mt={10}>
            <Text fontSize={"2xl"} mb={5} fontWeight="bold">
              Recent uploads
            </Text>
          </Box>
          <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={[3, 5, 10]}>
            {items.map((item) => {
              return (
                <FileCard
                  key={item.id}
                  file_name={item.file_name}
                  id={item.id}
                  date_added={item.date_added}
                  folder_name={item.folder_name}
                />
              );
            })}
          </SimpleGrid>
        </>
      )}
    </AuthContext.Consumer>
  );
};

export default HomePage;
