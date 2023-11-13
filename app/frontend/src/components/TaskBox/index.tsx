import React, { useEffect, useState } from "react";
import TextInput from "../Inputs/TextInput";
import { Button, ButtonGroup, Stack, useToast } from "@chakra-ui/react";
import { TaskBoxProps } from "../../types/general";
import { requestPostPut } from "../../services/api";
import { AxiosError } from "axios";

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

  useEffect(() => {
    setTitle(defaultName);
    if (type === "edit") {
      setDescription(task?.description);
    }
  }, [defaultName, task?.description, type]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("_auth") || "";

    let endpoint = "/task";
    if (type === "edit" && task) {
      endpoint = `/task/${task.id}`;
    }
    return requestPostPut(
      endpoint,
      { title, description },
      token,
      type === "edit" ? "put" : "post"
    )
      .then(() => {
        fetchAllTasks();
        onCancel(e);

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
      <TextInput
        label="Description"
        id="description"
        size="sm"
        onChange={(e) => setDescription(e.target.value)}
        defaultValue={type === "edit" ? task?.description : ""}
      />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" size="xs" onClick={onCancel}>
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
