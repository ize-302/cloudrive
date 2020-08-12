import React from "react";
import {
  Text,
  Box,
  Divider,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";
import Logo from "../components/images/Logo";
import { AuthContext } from "../contexts/AuthContext";

const DashboardLayout = (props) => {
  return (
    <Flex>
      <Box w="100%" pt={3} px={[3, 5, 10, 20]}>
        <Flex
          bg="#0066F5"
          p={[3, 5]}
          borderRadius={10}
          justifyContent="space-between"
          alignItems="center"
        >
          <Logo width="80px" color="#fff" />
          <Menu>
            <MenuButton
              bg="transparent"
              _hover={{ bg: "transparent" }}
              as={Button}
              rightIcon="chevron-down"
              color="white"
              _expanded={{ bg: "transparent" }}
              _focus={{ bg: "transparent", outline: 0, boxShadow: "none" }}
            >
              <Text fontSize={"lg"} fontWeight="bold">
                Adavize
              </Text>
            </MenuButton>
            <MenuList minW="200px">
              <MenuItem as="a" href="/">
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Divider my={5} />
        <Flex h={["100%", "100%", "100%", "80vh"]}>
          <Box w="100%" p={3} style={{ overflowY: "scroll" }}>
            {props.children}
          </Box>
        </Flex>
        <Text p={3} color="#000" textAlign="right" fontSize="14px">
          Built with ❤️ by <a href="">Ozorku</a>
        </Text>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
