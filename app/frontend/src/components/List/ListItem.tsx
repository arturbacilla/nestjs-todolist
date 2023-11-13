import React, { useContext } from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Fade,
  Flex,
  Text,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { ITask, TFetchAllTasks } from "../../types/task";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ITasksContext } from "../../types/context";
import TasksContext from "../../context/TasksContext";
import { requestDelete, requestPostPut } from "../../services/api";
import { format } from "date-fns";
import { useIntl } from "react-intl";

type TListItem = {
  task: ITask;
  fetchAllTasks: TFetchAllTasks;
};

const ListItem: React.FC<TListItem> = ({ task, fetchAllTasks }) => {
  const toast = useToast();
  const { updatingHandlers, editHandlers, userHandlers } =
    useContext<ITasksContext | null>(TasksContext) || {};

  const [isUpdating, setIsUpdating] = updatingHandlers || [];
  const [, setIsEditing] = editHandlers || [];

  const [showActions, setShowActions] = useBoolean(false);

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!setIsUpdating) return;
    setIsUpdating(task.id);
    const token = localStorage.getItem("_auth") || "";
    const endpoint = `/task/${task.id}`;

    return requestPostPut(endpoint, { status: e.target.checked }, token, "post")
      .then(() => fetchAllTasks())
      .catch((reject) => {
        console.error(reject);
        return toast({
          id: "error-checking",
          title: "Error updating task status",
          status: "error",
          isClosable: true,
        });
      });
  };

  const handleDelete = async () => {
    if (!setIsUpdating) return;
    setIsUpdating(task.id);
    const endpoint = `/task/${task.id}`;
    const token = localStorage.getItem("_auth") || "";

    return requestDelete(endpoint, token)
      .then(() => {
        fetchAllTasks();
        return toast({
          id: "success-deleting",
          title: `'${task.title}' removed successfully`,
          status: "info",
          isClosable: true,
        });
      })
      .catch((reject) => {
        console.error(reject);
        return toast({
          id: "error-deleting",
          title: `Error deleting task '${task.title}'`,
          status: "error",
          isClosable: true,
        });
      });
  };

  if (!setIsEditing) return null;
  return (
    <AccordionItem
      m="0 8px 0 0"
      border="none"
      onMouseEnter={setShowActions.on}
      onMouseLeave={setShowActions.off}
    >
      {({ isExpanded }) => (
        <>
          <Flex
            alignItems="center"
            w="100%"
            h={isExpanded ? "fit-content" : "36px"}
            justifyContent="space-between"
          >
            {isUpdating === task.id ? (
              <Box
                display="flex"
                alignItems="center"
                gap="8px"
                verticalAlign="middle"
              >
                <CircularProgress
                  isIndeterminate
                  color="orange.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  size="16px"
                  boxSize="16px"
                />
                <Flex alignItems="flex-start" gap="8px">
                  <Text
                    align="left"
                    fontSize="sm"
                    as={task.status === "COMPLETED" ? "s" : "span"}
                    fontWeight="semibold"
                    overflowWrap="break-word"
                    overflow="hidden"
                    pt="2px"
                  >
                    {task.title}
                  </Text>
                </Flex>
              </Box>
            ) : (
              <Box
                flex="1"
                textAlign="left"
                verticalAlign="middle"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                <Flex alignItems="center" gap="8px">
                  <Checkbox
                    colorScheme="orange"
                    defaultChecked={task.status === "COMPLETED"}
                    borderColor="orange.200"
                    display="flex"
                    alignItems="center"
                    isDisabled={!!isUpdating && isUpdating !== task.id}
                    onChange={handleCheck}
                  >
                    <Text
                      align="left"
                      fontSize="sm"
                      as={task.status === "COMPLETED" ? "s" : "span"}
                      fontWeight={
                        task.status === "COMPLETED" ? "medium" : "semibold"
                      }
                    >
                      {task.title}
                    </Text>
                  </Checkbox>
                  {task.status === "COMPLETED" && (
                    <Text fontSize="0.5rem" fontStyle="italic" color="gray.500">
                      {(task.conclusionDate &&
                        `Completed at ${format(
                          new Date(task?.conclusionDate),
                          "Pp"
                        )}`) ||
                        ""}
                    </Text>
                  )}
                </Flex>
              </Box>
            )}
            <Flex alignItems="center" alignSelf="center" justifySelf="flex-end">
              {showActions && (
                <Fade in={showActions}>
                  <Button size="xs" onClick={() => setIsEditing(task.id)}>
                    <EditIcon color="black.500" />
                  </Button>
                  <Button size="xs" onClick={handleDelete}>
                    <DeleteIcon color="black.500" />
                  </Button>
                </Fade>
              )}
              {task.description && (
                <AccordionButton w={8} p={2} justifyContent="center">
                  <AccordionIcon />
                </AccordionButton>
              )}
            </Flex>
          </Flex>
          {task.description && (
            <AccordionPanel
              alignSelf="center"
              alignItems="flex-start"
              display="flex"
              flexDirection="row"
              p={0}
            >
              <Divider
                borderColor="orange.400"
                borderWidth={1}
                h={4}
                m="0px 8px"
                orientation="vertical"
              />
              <Text fontSize="xs" color="blackAlpha.700">
                {task.description}
              </Text>
            </AccordionPanel>
          )}
        </>
      )}
    </AccordionItem>
  );
};

export default ListItem;
