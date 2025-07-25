import { Divider, Tab, TabIndicator, TabList, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import TasksContext from "../../context/TasksContext";
import { ITasksContext } from "../../types/context";
import { ITabs } from "../../types/task";
import TaskList from "../List/TaskList";

const TasksTabs: React.FC<ITabs> = ({ tasks, fetchAllTasks }) => {
	const { errorHandlers } = useContext<ITasksContext | null>(TasksContext) || {};
	const [hasError] = errorHandlers || [];

	return (
		<Tabs variant="unstyled" overflow="hidden" h="100%">
			<TabList>
				<Tab>All</Tab>
				<Tab>Active</Tab>
				<Tab>Completed</Tab>
			</TabList>
			<TabIndicator mt="-1.5px" height="2px" bg="orange.500" borderRadius="1px" />

			<Divider borderColor="orange.300" borderWidth={1} mt={-0.1} />
			{tasks.length ? (
				<>
					<TabPanels h="calc(100% - 32px)" overflowY="auto" overflowX="hidden">
						<TaskList tasks={tasks} fetchAllTasks={fetchAllTasks} />
						<TaskList tasks={tasks} filter="ACTIVE" fetchAllTasks={fetchAllTasks} />
						<TaskList tasks={tasks} filter="COMPLETED" fetchAllTasks={fetchAllTasks} />
					</TabPanels>
				</>
			) : (
				<Text display="flex" alignItems="center" justifyContent="center" h="100%" color="gray.500">
					{hasError
						? "Something wrong happened. Try reloading the page"
						: "You have no tasks added. Start adding some!"}
				</Text>
			)}
		</Tabs>
	);
};

export default TasksTabs;
