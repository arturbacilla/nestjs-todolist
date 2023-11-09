import React from "react";
import { ITaksList } from "../../types/tabs";
import { Accordion, TabPanel } from "@chakra-ui/react";
import ListItem from "./ListItem";

const TaskList: React.FC<ITaksList> = ({ tasks, filter, fetchAllTasks }) => {
  const filtered = filter
    ? tasks.filter((task) => task.status === filter)
    : tasks;

  return (
    <TabPanel p={0} h="100%">
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
            <ListItem task={task} fetchAllTasks={fetchAllTasks} />
          ))}
      </Accordion>
    </TabPanel>
  );
};

export default TaskList;
