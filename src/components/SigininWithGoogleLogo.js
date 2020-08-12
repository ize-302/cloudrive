import React, { useState } from "react";
import { Button, Text, Spinner, Flex } from "@chakra-ui/core";
import { auth, googleProvider } from "../firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const SigininWithGoogleLogo = () => {
  const history = useHistory();
  const [loadingStatus, setLoadingStatus] = useState(false);

  const handleSignin = (provider) => {
    setLoadingStatus(true);
    auth.signInWithPopup(provider).then((response) => {
      if (response.user) {
        history.push(`/`);
      }
    });
  };
  return (
    <div>
      {!loadingStatus ? (
        <Button
          onClick={() => handleSignin(googleProvider)}
          w="100%"
          maxW="300px"
          borderRadius="10px"
          py="6"
          m="0 auto"
          display="flex"
          disabled={loadingStatus}
        >
          <svg
            width="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.36 16.3555C31.36 15.04 31.2533 14.08 31.0222 13.0845H16V19.0222H24.8177C24.64 20.4978 23.68 22.72 21.5466 24.2133L21.5167 24.412L26.2665 28.0916L26.5955 28.1245C29.6177 25.3333 31.36 21.2266 31.36 16.3555"
              fill="#4285F4"
            />
            <path
              d="M16 32C20.32 32 23.9466 30.5777 26.5956 28.1245L21.5467 24.2133C20.1956 25.1555 18.3822 25.8133 16 25.8133C11.769 25.8133 8.17787 23.0222 6.89775 19.1645L6.71011 19.1804L1.77125 23.0026L1.70667 23.1822C4.33775 28.4088 9.74221 32 16 32Z"
              fill="#34A853"
            />
            <path
              d="M6.89771 19.1645C6.55994 18.1689 6.36446 17.1022 6.36446 16C6.36446 14.8977 6.55994 13.8311 6.87994 12.8355L6.87099 12.6235L1.87024 8.73989L1.70663 8.81771C0.622229 10.9866 0 13.4222 0 16C0 18.5778 0.622229 21.0133 1.70663 23.1822L6.89771 19.1645"
              fill="#FBBC05"
            />
            <path
              d="M16 6.18663C19.0044 6.18663 21.0311 7.4844 22.1867 8.56892L26.7022 4.16C23.929 1.58223 20.32 0 16 0C9.74221 0 4.33775 3.59108 1.70667 8.81771L6.87998 12.8355C8.17787 8.97777 11.769 6.18663 16 6.18663"
              fill="#EB4335"
            />
          </svg>
          <Text ml="4">Sign in with Google</Text>
        </Button>
      ) : (
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
      )}
    </div>
  );
};

export default SigininWithGoogleLogo;
