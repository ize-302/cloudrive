import React, { useContext } from "react";
import { Text, Box, Flex } from "@chakra-ui/core";
import Logo from "../components/images/Logo";
import SigininWithGoogleLogo from "../components/SigininWithGoogleLogo";

const AuthPage = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bg="#0066F5"
      p={[5, 5, 10]}
    >
      <Logo width="120px" color="white" />
      <Box
        boxShadow="lg"
        my={10}
        bg="white"
        w="100%"
        maxW="450px"
        borderRadius="20px"
        p={[5, 5, 10]}
        fontSize={["14", "16", "18", "20px"]}
      >
        <Text fontSize="24px" textAlign="center">
          Sign in
        </Text>
        <Box mt="20px" pb="20px">
          <SigininWithGoogleLogo />
        </Box>
      </Box>
      <Text color="white" fontSize="14px">
        Built with ❤️ by <a href="">Ozorku</a>
      </Text>
    </Flex>
  );
};

export default AuthPage;
