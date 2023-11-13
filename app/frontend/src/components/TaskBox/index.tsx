import React, { useContext, useEffect, useState } from "react";
import TextInput from "../Inputs/TextInput";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { TaskBoxProps } from "../../types/general";
import { requestPostPut } from "../../services/api";
import { AxiosError } from "axios";
import { ITasksContext } from "../../types/context";
import TasksContext from "../../context/TasksContext";

const TaskBox: React.FC<TaskBoxProps> = ({
  type,
  firstFieldRef,
  onCancel,
  defaultName,
  fetchAllTasks,
  setIsLoading,
  task,
}) => {
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const toast = useToast();
  const { userHandlers } = useContext<ITasksContext | null>(TasksContext) || {};

  const [storeUser] = userHandlers || [];

  useEffect(() => {
    setTitle(defaultName);
    setDescription(undefined);
    if (type === "edit") {
      setDescription(task?.description);
    }
  }, [defaultName, task?.description, type]);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDescription("");
    onCancel(e);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("_auth") || "";

    if (!storeUser || !token) return;
    const { id: authorId } = storeUser;
    let endpoint = "/task";
    if (type === "edit" && task) {
      endpoint = `/task/${task.id}`;
    }
    return requestPostPut(
      endpoint,
      { title, description, authorId },
      token,
      type === "edit" ? "put" : "post"
    )
      .then(() => {
        fetchAllTasks();
        handleClose(e);
        const message = `Task '${
          type === "new"
            ? `${defaultName}' created`
            : `${task?.title}' modified`
        } successfully`;

        return toast({
          id: `success-${type}`,
          title: message,
          status: "success",
          isClosable: true,
        });
      })
      .catch((reject: AxiosError) => {
        console.error(reject);
        return toast({
          id: "error-checking",
          title: `Error on ${type === "new" ? "adding a" : "editing"} task`,
          status: "error",
          isClosable: true,
        });
      });
  };

  return (
    <Stack spacing={4}>
      <Box>
        {type === "edit" && (
          <Text variant="label" fontSize="0.7rem" p={0}>
            Task Name
          </Text>
        )}
        <TextInput
          label="Task name"
          id="task-name"
          name="taskName"
          ref={firstFieldRef}
          value={title}
          size="sm"
          onChange={(e) => setTitle(e.target.value)}
          isReadOnly={type === "new"}
          isDisabled={type === "new"}
        />
      </Box>
      <Box>
        {type === "edit" && (
          <Text variant="label" fontSize="0.7rem" p={0}>
            Description
          </Text>
        )}
        <Textarea
          placeholder="Description"
          id="description"
          size="sm"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Box>
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" size="xs" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          isDisabled={!defaultName || defaultName === "" || !defaultName.length}
          size="xs"
          colorScheme="orange"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default TaskBox;
