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
} from "@chakra-ui/react";
import { ITask } from "../../types/tabs";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ITasksContext } from "../../types/context";
import TasksContext from "../../context/TasksContext";
import { requestGet, requestPostPut } from "../../services/api";

type TListItem = { task: ITask };

const ListItem: React.FC<TListItem> = ({ task }) => {
  const { updatingHandlers, tasksHandlers } =
    useContext<ITasksContext | null>(TasksContext) || {};

  const [, setTasks] = tasksHandlers || [];
  const [isUpdating, setIsUpdating] = updatingHandlers || [];

  const [showActions, setShowActions] = useBoolean(false);

  const fetchAllTasks = () => {
    if (!setTasks || !setIsUpdating) return;
    const endpoint = "/tasks";
    return requestGet(endpoint)
      .then((result) => setTasks(result.data.message))
      .catch((reject) => console.error(reject))
      .finally(() => setIsUpdating(null));
  };

  const handleCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!setIsUpdating) return;
    setIsUpdating(task.id);
    const endpoint = `/task/${task.id}`;

    return requestPostPut(endpoint, { status: e.target.checked }, "")
      .catch((reject) => {
        // todo: adicionar um popup notificando erro
      })
      .finally(() => fetchAllTasks());
  };

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
                <Text
                  align="left"
                  casing="capitalize"
                  fontSize="sm"
                  as={task.status === "COMPLETED" ? "s" : "span"}
                  fontWeight="semibold"
                  overflowWrap="break-word"
                  overflow="hidden"
                  pt="2px"
                >
                  {task.title}
                </Text>
              </Box>
            ) : (
              <Box flex="1" textAlign="left" verticalAlign="middle">
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
                    casing="capitalize"
                    fontSize="sm"
                    as={task.status === "COMPLETED" ? "s" : "span"}
                    fontWeight="semibold"
                  >
                    {task.title}
                  </Text>
                </Checkbox>
              </Box>
            )}
            <Flex alignItems="center" alignSelf="flex-end">
              {showActions && (
                <Fade in={showActions}>
                  <Button size="xs">
                    <EditIcon color="black.500" />
                  </Button>
                  <Button size="xs">
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
