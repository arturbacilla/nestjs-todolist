import React from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { ITask } from "../../types/tabs";

type TListItem = { task: ITask };

const ListItem: React.FC<TListItem> = ({ task }) => {
  return (
    <AccordionItem m="8px 8px 8px 0" border="none">
      {({ isExpanded }) => (
        <>
          <Flex alignItems="center" h={isExpanded ? "fit-content" : "36px"}>
            <Box as="span" flex="1" textAlign="left">
              <Checkbox
                colorScheme="orange"
                defaultChecked={task.status === "COMPLETED"}
                borderColor="orange.200"
              >
                {task.title}
              </Checkbox>
            </Box>
            {task.description && (
              <AccordionButton w={8} p={2} justifyContent="center">
                <AccordionIcon />
              </AccordionButton>
            )}
          </Flex>
          {task.description && (
            <AccordionPanel
              alignSelf="center"
              alignItems="center"
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
              {task.description}
            </AccordionPanel>
          )}
        </>
      )}
    </AccordionItem>
  );
};

export default ListItem;
