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

const Todo: React.FC = () => {
  const { loadingHandlers, tasksHandlers, newTaskInput } =
    useContext<ITasksContext | null>(TasksContext) || {};

  const [tasks] = tasksHandlers || [];
  const [taskInput, setTaskInput] = newTaskInput || [];
  const [isLoading, setIsLoading] = loadingHandlers || [];
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  useEffect(() => {
    setTimeout(() => setIsLoading && setIsLoading(false), 1000);
  }, [setIsLoading]);

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
        <Box id="add-header" w="100%" pb={2}>
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
