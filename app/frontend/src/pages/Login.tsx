import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import NotebookSVG from "../assets/notebook.svg?react";
import { AtSignIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { requestPostPut } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleClick = () => setShowPassword(!showPassword);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    setIsLoading(true);
    const endpoint = "/auth/login";
    return requestPostPut(endpoint, { email, password }, "", "post")
      .then(() => navigate("/"))
      .catch(() => {
        setIsLoading(false);
        return toast({
          id: "error-login",
          title: `Invalid credentials`,
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Flex
        alignSelf="center"
        justifySelf="center"
        alignItems="center"
        justifyContent="stretch"
      >
        <Card
          w="75vw"
          h="75vh"
          backgroundColor="white"
          p={8}
          alignItems="stretch"
          overflowY="hidden"
        >
          <Flex
            alignItems="center"
            h="100%"
            w="100%"
            gap="16px"
            justifyContent="stretch"
          >
            <Flex h="100%" w="50%" alignItems="center" justifyContent="center">
              <Box h="100%" w="70%">
                <NotebookSVG />
              </Box>
            </Flex>
            <Divider orientation="vertical" />
            <Flex
              id="input-box"
              direction="column"
              w="50%"
              h="100%"
              alignItems="center"
              justifyContent="space-between"
              p={8}
            >
              <Flex
                backgroundColor="#014EFF"
                h="70px"
                w="70px"
                alignItems="center"
                justifyContent="center"
                borderRadius={5}
              >
                <Text fontFamily="arial" fontWeight="extrabold" color="white">
                  NoBuzz
                </Text>
              </Flex>
              {(isLoading && (
                <CircularProgress
                  isIndeterminate
                  color="orange.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  h="100%"
                />
              )) || (
                <>
                  <InputGroup>
                    <InputLeftElement
                      color="gray.300"
                      fontSize="0.6em"
                      maxH="0.6em"
                      maxW="0.6em"
                      p={4}
                    >
                      <AtSignIcon />
                    </InputLeftElement>
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      size="sm"
                      borderColor="gray.400"
                      borderRadius={4}
                      placeholder="Email"
                      pl={8}
                      _placeholder={{ opacity: 0.2, color: "inherit" }}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement color="gray.300" maxH="100%" maxW="32px">
                      <Button
                        size="xs"
                        onClick={handleClick}
                        variant="unstyled"
                        p={0}
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputLeftElement>
                    <Input
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      size="sm"
                      borderColor="gray.400"
                      borderRadius={4}
                      placeholder="Password"
                      pl={8}
                      _placeholder={{ opacity: 0.2, color: "inherit" }}
                    />
                  </InputGroup>
                  <ButtonGroup display="flex" justifyContent="flex-end">
                    <Button variant="outline" size="xs">
                      Register
                    </Button>
                    <Button
                      size="xs"
                      backgroundColor="#014EFF"
                      color="white"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </ButtonGroup>
                </>
              )}
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};

export default Login;
