import React from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import TasksTabs from "../components/Tabs/TasksTabs";
import { ITask } from "../types/tabs";

const Todo: React.FC = () => {
  const taskList: ITask[] = [
    {
      id: 1,
      title: "Teste",
      status: "ACTIVE",
      creationDate: new Date(),
    },
    {
      id: 2,
      title: "Teste-completed",
      status: "COMPLETED",
      creationDate: new Date(),
    },
    {
      id: 3,
      title: "Teste3",
      status: "ACTIVE",
      description: "TEste da descrição",
      creationDate: new Date(),
    },
    {
      id: 4,
      title: "Teste4",
      status: "ACTIVE",
      creationDate: new Date(),
    },
    {
      id: 5,
      title: "Teste5",
      status: "COMPLETED",
      creationDate: new Date(),
    },
    {
      id: 6,
      title: "Teste-completed2",
      status: "COMPLETED",
      creationDate: new Date(),
    },
    {
      id: 7,
      title: "Teste6",
      status: "ACTIVE",
      description: "TEste da descrição",
      creationDate: new Date(),
    },
    {
      id: 8,
      title: "Teste7",
      status: "ACTIVE",
      creationDate: new Date(),
    },
    {
      id: 9,
      title: "Teste8",
      status: "COMPLETED",
      creationDate: new Date(),
    },
    {
      id: 10,
      title: "Teste-completed4",
      status: "COMPLETED",
      creationDate: new Date(),
    },
    {
      id: 11,
      title: "Teste9",
      status: "ACTIVE",
      description: "TEste da descrição",
      creationDate: new Date(),
    },
    {
      id: 12,
      title: "Teste10",
      status: "ACTIVE",
      creationDate: new Date(),
    },
  ];

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
        backgroundColor="gray.100"
        p={8}
        alignItems="stretch"
        overflowY="hidden"
      >
        <Box id="add-header" w="100%" minH="15%">
          <InputGroup>
            <InputLeftElement
              color="gray.300"
              fontSize="0.6em"
              maxH="0.6em"
              maxW="0.6em"
              p={4}
            >
              <Button size="xs">
                <AddIcon color="orange.500" />
              </Button>
            </InputLeftElement>
            <Input
              type="text"
              size="sm"
              borderColor="gray.400"
              borderRadius={4}
              placeholder="New task"
              _placeholder={{ opacity: 0.2, color: "inherit" }}
            />
          </InputGroup>
        </Box>
        <TasksTabs tasks={taskList} />
      </Card>
    </Flex>
  );
};

export default Todo;
