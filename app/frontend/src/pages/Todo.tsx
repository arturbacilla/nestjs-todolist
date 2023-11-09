/// <reference types="vite-plugin-svgr/client" />
import React, { useCallback, useContext, useEffect } from "react";
import NotebookSVG from "../assets/notebook.svg?react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import TasksTabs from "../components/Tabs/TasksTabs";
import TasksContext from "../context/TasksContext";
import { ITasksContext } from "../types/context";
import NewTask from "../components/Popover/NewTask";
import FocusLock from "react-focus-lock";
import { requestGet } from "../services/api";

const Todo: React.FC = () => {
  const { loadingHandlers, tasksHandlers, newTaskInput } =
    useContext<ITasksContext | null>(TasksContext) || {};

  const [tasks, setTasks] = tasksHandlers || [];
  const [taskInput, setTaskInput] = newTaskInput || [];
  const [isLoading, setIsLoading] = loadingHandlers || [];
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  const fetchAllTasks = useCallback(() => {
    if (!setTasks || !setIsLoading) return;
    const endpoint = "/tasks";
    return requestGet(endpoint)
      .then((result) => setTasks(result.data.message))
      .catch((reject) => console.error(reject))
      .finally(() => setIsLoading(false));
  }, [setTasks, setIsLoading]);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  if (!loadingHandlers || !tasksHandlers || !setTaskInput) return;

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
        backgroundColor="white"
        p={8}
        alignItems="stretch"
        overflowY="hidden"
      >
        <Box
          id="add-header"
          w="100%"
          pb={2}
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
          gap="2rem"
        >
          <Popover
            isOpen={isOpen}
            initialFocusRef={firstFieldRef}
            onOpen={onOpen}
            onClose={onClose}
            placement="right"
            closeOnBlur={false}
          >
            <InputGroup>
              <InputLeftElement
                color="gray.300"
                fontSize="0.6em"
                maxH="0.6em"
                maxW="0.6em"
                p={4}
              >
                <PopoverTrigger>
                  <Button size="xs">
                    <AddIcon color="orange.500" />
                  </Button>
                </PopoverTrigger>
              </InputLeftElement>
              <Input
                onChange={(e) => setTaskInput(e.target.value)}
                type="text"
                size="sm"
                borderColor="gray.400"
                borderRadius={4}
                placeholder="New task"
                _placeholder={{ opacity: 0.2, color: "inherit" }}
              />
            </InputGroup>
            <PopoverContent
              backgroundColor="white"
              border="1px solid"
              borderColor="gray.300"
              zIndex={100}
              p={5}
            >
              <FocusLock returnFocus persistentFocus={false}>
                <PopoverArrow />
                <NewTask
                  firstFieldRef={firstFieldRef}
                  onCancel={onClose}
                  defaultName={taskInput || ""}
                />
              </FocusLock>
            </PopoverContent>
          </Popover>
          <Box
            h="100px"
            w="100px"
            position="absolute"
            float="right"
            top="8px"
            right="8px"
          >
            <NotebookSVG />
          </Box>
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
