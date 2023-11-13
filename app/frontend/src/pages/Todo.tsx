/// <reference types="vite-plugin-svgr/client" />
import React, { useCallback, useContext, useEffect, useState } from "react";
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
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import TasksTabs from "../components/Tabs/TasksTabs";
import TasksContext from "../context/TasksContext";
import { ITasksContext } from "../types/context";
import AddTask from "../components/TaskBox";
import EditTask from "../components/TaskBox/EditTask";
import FocusLock from "react-focus-lock";
import { requestGet, requestPostPut } from "../services/api";
import { AxiosError } from "axios";
import useVerifyToken from "../hooks/useVerifyToken";

const Todo: React.FC = () => {
  const tokenValid = useVerifyToken();
  const toast = useToast();
  const addTask = useDisclosure();

  const firstFieldRef = React.useRef(null);
  const {
    loadingHandlers,
    tasksHandlers,
    newTaskInput,
    updatingHandlers,
    editHandlers,
    errorHandlers,
  } = useContext<ITasksContext | null>(TasksContext) || {};

  const [tasks, setTasks] = tasksHandlers || [];
  const [taskInput, setTaskInput] = newTaskInput || [];
  const [isLoading, setIsLoading] = loadingHandlers || [];
  const [, setIsUpdating] = updatingHandlers || [];
  const [isEditing, setIsEditing] = editHandlers || [];
  const [, setHasError] = errorHandlers || [];

  const fetchAllTasks = useCallback(() => {
    if (
      !setTasks ||
      !setIsLoading ||
      !setIsUpdating ||
      !setTaskInput ||
      !setHasError
    )
      return;

    const token = localStorage.getItem("_auth") || "";

    const endpoint = "/tasks";
    return requestGet(endpoint, token)
      .then((result) => setTasks(result.data.message))
      .catch(() => {
        setHasError(true);
        return toast({
          id: `error-load`,
          title: "Error loading tasks",
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsUpdating(null);
        setTaskInput("");
      });
  }, [setTasks, setIsLoading, setIsUpdating, setTaskInput, setHasError, toast]);

  const fastSubmit = async () => {
    if (!setIsLoading || !taskInput || taskInput === "") return;
    setIsLoading(true);
    const token = localStorage.getItem("_auth") || "";
    const endpoint = "/task";
    return requestPostPut(endpoint, { title: taskInput }, token, "post")
      .then(() => {
        fetchAllTasks();
        return toast({
          id: `success-added`,
          title: `Task ${taskInput} created successfully`,
          status: "success",
          isClosable: true,
        });
      })
      .catch((reject: AxiosError) => {
        console.error(reject);
        return toast({
          id: "error-checking",
          title: `Error on creating task`,
          status: "error",
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (!tokenValid) return;
    setHasError && setHasError(false);
    fetchAllTasks();
  }, [fetchAllTasks, setHasError, tokenValid]);

  if (
    !loadingHandlers ||
    !tasksHandlers ||
    !setTaskInput ||
    !fetchAllTasks ||
    !setIsLoading ||
    !setIsEditing
  )
    return;

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
              isOpen={addTask.isOpen}
              initialFocusRef={firstFieldRef}
              onOpen={addTask.onOpen}
              onClose={addTask.onClose}
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

                <Tooltip
                  placement="bottom-start"
                  label="Click on + to add description or press enter to fast-add"
                >
                  <Input
                    onChange={(e) => setTaskInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fastSubmit()}
                    type="text"
                    size="sm"
                    value={taskInput}
                    borderColor="gray.400"
                    borderRadius={4}
                    placeholder="New task"
                    pl={8}
                    _placeholder={{ opacity: 0.2, color: "inherit" }}
                  />
                </Tooltip>
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
                  <AddTask
                    type="new"
                    onCancel={addTask.onClose}
                    defaultName={taskInput || ""}
                    firstFieldRef={firstFieldRef}
                    fetchAllTasks={fetchAllTasks}
                    setIsLoading={setIsLoading}
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
            <TasksTabs tasks={tasks || []} fetchAllTasks={fetchAllTasks} />
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
      <EditTask
        isOpen={!!isEditing}
        onClose={setIsEditing}
        task={
          (isEditing && tasks && tasks.find((task) => task.id === isEditing)) ||
          null
        }
        taskBoxProps={{ firstFieldRef, fetchAllTasks, setIsLoading }}
      />
    </>
  );
};

export default Todo;
