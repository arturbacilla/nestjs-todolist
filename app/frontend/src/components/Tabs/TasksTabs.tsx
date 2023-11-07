import React from "react";
import {
  Divider,
  Tab,
  TabIndicator,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { ITabs } from "../../types/tabs";
import TaskList from "../List/TaskList";

const TasksTabs: React.FC<ITabs> = ({ tasks }) => {
  return (
    <Tabs variant="unstyled" overflow="hidden" h="100%">
      <TabList>
        <Tab>All</Tab>
        <Tab>Active</Tab>
        <Tab>Completed</Tab>
      </TabList>
      <TabIndicator
        mt="-1.5px"
        height="2px"
        bg="orange.500"
        borderRadius="1px"
      />

      <Divider borderColor="orange.300" borderWidth={1} mt={-0.1} />

      <TabPanels h="100%" overflowY="scroll">
        <TaskList tasks={tasks} />
        <TaskList tasks={tasks} filter="ACTIVE" />
        <TaskList tasks={tasks} filter="COMPLETED" />
      </TabPanels>
    </Tabs>
  );
};

export default TasksTabs;
