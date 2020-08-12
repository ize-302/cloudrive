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

export const FileCard = (props) => {
  const [extension, setExtension] = useState("");
  const [fileName, setFileName] = useState("");

  const { id, file_name, folder_name, date_added } = props;

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
          <Text fontWeight="bold">{fileName}</Text>
          <Text fontWeight="normal" mt={1} fontSize={"xs"}>
            Uploaded: {date_added}
          </Text>
        </Box>
      </MenuButton>
      <MenuList>
        <MenuGroup>
          <MenuItem>Move to</MenuItem>
          <MenuItem>Download</MenuItem>
          <MenuItem>Rename</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};
