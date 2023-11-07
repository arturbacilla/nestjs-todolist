import React from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Divider,
  Fade,
  Flex,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { ITask } from "../../types/tabs";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

type TListItem = { task: ITask };

const ListItem: React.FC<TListItem> = ({ task }) => {
  const [showActions, setShowActions] = useBoolean(false);

  return (
    <AccordionItem
      m="8px 8px 8px 0"
      border="none"
      onMouseEnter={setShowActions.on}
      onMouseLeave={setShowActions.off}
    >
      {({ isExpanded }) => (
        <>
          <Flex alignItems="center" h={isExpanded ? "fit-content" : "36px"}>
            <Box as="span" flex="1" textAlign="left">
              <Checkbox
                colorScheme="orange"
                defaultChecked={task.status === "COMPLETED"}
                borderColor="orange.200"
              >
                <Text as={task.status === "COMPLETED" ? "s" : undefined}>
                  {task.title}
                </Text>
              </Checkbox>
            </Box>
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
              <Text>{task.description}</Text>
            </AccordionPanel>
          )}
        </>
      )}
    </AccordionItem>
  );
};

export default ListItem;
