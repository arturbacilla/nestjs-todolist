import React from "react";
import TextInput from "../Inputs/TextInput";
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import { NewTaskPopover } from "../../types/general";

const NewTask: React.FC<NewTaskPopover> = ({
  firstFieldRef,
  onCancel,
  defaultName,
}) => {
  return (
    <Stack spacing={4}>
      <TextInput
        label="Task name"
        id="task-name"
        ref={firstFieldRef}
        value={defaultName}
        size="sm"
        isReadOnly
      />
      <TextInput
        label="Description"
        id="description"
        size="sm"
        defaultValue=""
      />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" size="xs" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          isDisabled={!defaultName || defaultName === "" || !defaultName.length}
          size="xs"
          colorScheme="orange"
        >
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default NewTask;
