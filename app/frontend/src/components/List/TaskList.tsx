import React from "react";
import { ITaksList } from "../../types/task";
import { Accordion, TabPanel, Text } from "@chakra-ui/react";
import ListItem from "./ListItem";

const TaskList: React.FC<ITaksList> = ({ tasks, filter, fetchAllTasks }) => {
  const filtered = filter
    ? tasks.filter((task) => task.status === filter)
    : tasks;

  return (
    <TabPanel p={0} h="100%">
      {filtered.length ? (
        <Accordion
          allowMultiple
          h="100%"
          display="flex"
          flexDirection="column"
          gap={0}
          pt={2}
        >
          {filtered
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((task) => (
              <ListItem
                key={`task-${task.id}`}
                task={task}
                fetchAllTasks={fetchAllTasks}
              />
            ))}
        </Accordion>
      ) : (
        <Text
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          color="gray.500"
        >
          {filter === "COMPLETED"
            ? "No tasks completed yet."
            : "Yay! All tasks completed!"}
        </Text>
      )}
    </TabPanel>
  );
};

export default TaskList;
