import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import TasksTabs from "../components/Tabs/TasksTabs";
import TasksContext from "../context/TasksContext";
import { ITasksContext } from "../types/context";

const Todo: React.FC = () => {
  const { loadingHandlers, tasksHandlers } =
    useContext<ITasksContext | null>(TasksContext) || {};

  const [tasks] = tasksHandlers || [];
  const [isLoading, setIsLoading] = loadingHandlers || [];

  useEffect(() => {
    setTimeout(() => setIsLoading && setIsLoading(false), 1000);
  }, [setIsLoading]);

  if (!loadingHandlers || !tasksHandlers) return;

  return (
    <Flex
      alignSelf="center"
      justifySelf="center"
      alignItems="center"
      justifyContent="stretch"
    >
      <Card
        w="75vw"
        h="75vh"
        backgroundColor="gray.100"
        p={8}
        alignItems="stretch"
        overflowY="hidden"
      >
        <Box id="add-header" w="100%" pb={2}>
          <InputGroup>
            <InputLeftElement
              color="gray.300"
              fontSize="0.6em"
              maxH="0.6em"
              maxW="0.6em"
              p={4}
            >
              <Button size="xs">
                <AddIcon color="orange.500" />
              </Button>
            </InputLeftElement>
            <Input
              type="text"
              size="sm"
              borderColor="gray.400"
              borderRadius={4}
              placeholder="New task"
              _placeholder={{ opacity: 0.2, color: "inherit" }}
            />
          </InputGroup>
        </Box>
        {!isLoading ? (
          <TasksTabs tasks={tasks || []} />
        ) : (
          <CircularProgress
            isIndeterminate
            color="orange.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="100%"
          />
        )}
      </Card>
    </Flex>
  );
};

export default Todo;
