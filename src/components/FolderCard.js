import React from "react";
import { Button } from "@chakra-ui/core";
import FolderIcon from "./images/FolderIcon";
import { useHistory } from "react-router-dom";

const FolderCard = (props) => {
  const history = useHistory();
  const { bg, borderColor, icon, name, id } = props;
  const handleClick = () => {
    history.push(`/folder/${id}`);
  };
  return (
    <Button
      justifyContent="flex-start"
      bg={bg}
      borderRadius={"md"}
      border="1px solid"
      borderColor={borderColor}
      alignItems="center"
      p={[8]}
      onClick={handleClick}
    >
      {icon === "folder" && <FolderIcon />}
      {name}
    </Button>
  );
};

export default FolderCard;
