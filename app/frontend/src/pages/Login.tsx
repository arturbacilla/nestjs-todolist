import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  Divider,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import NotebookSVG from "../assets/notebook.svg?react";
import { AtSignIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { requestPostPut } from "../services/api";
import { useNavigate } from "react-router-dom";
import NewUser from "../components/Modal/NewUser";
import DefaultInput from "../components/Inputs/DefaultInput";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const toast = useToast();
  const [openNewUser, setOpenNewUser] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    setIsLoading(true);
    const endpoint = "/auth/login";
    return requestPostPut(endpoint, { email, password }, "", "post")
      .then((response) => {
        localStorage.setItem("_auth", response.data["access_token"]);
        localStorage.setItem(
          "_auth_state",
          JSON.stringify({
            id: response.data.userId,
            email,
            userName: response.data.name,
          })
        );

        return navigate("/");
      })
      .catch(() => {
        setIsLoading(false);
        return toast({
          id: "error-login",
          title: `Invalid credentials`,
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => {
        setEmail("");
        setPassword("");
        setIsLoading(false);
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
              justifyContent="center"
              gap={8}
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
                  <DefaultInput<string>
                    type="email"
                    icon={<AtSignIcon />}
                    placeholder="Email"
                    setter={setEmail}
                    value={email}
                  />
                  <DefaultInput<string>
                    type={showPassword ? "text" : "password"}
                    icon={
                      <Button
                        size="xs"
                        onClick={handleClick}
                        variant="unstyled"
                        p={0}
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    }
                    placeholder="Password"
                    setter={setPassword}
                    value={password}
                  />
                  <ButtonGroup display="flex" justifyContent="flex-end">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => setOpenNewUser(true)}
                    >
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
      <NewUser isOpen={openNewUser} onClose={setOpenNewUser} />
    </>
  );
};

export default Login;
