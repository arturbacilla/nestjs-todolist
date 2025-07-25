import type React from "react";
import { useState } from "react";
import type { ITasksContext } from "../types/context";
import type { User } from "../types/general";
import type { ITask } from "../types/task";
import TasksContext from "./TasksContext";

const taskList: ITask[] = [];

const TasksProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [taskInput, setTaskInput] = useState<string>("");
	const [tasks, setTasks] = useState<ITask[]>(taskList);
	const [isUpdating, setisUpdating] = useState<number | null>(null);
	const [isEditing, setIsEditing] = useState<number | null>(null);
	const [hasError, setHasError] = useState<boolean>(false);
	const [storeUser, setStoreUser] = useState<User | null>(null);

	const values: ITasksContext = {
		loadingHandlers: [isLoading, setIsLoading],
		newTaskInput: [taskInput, setTaskInput],
		tasksHandlers: [tasks, setTasks],
		updatingHandlers: [isUpdating, setisUpdating],
		editHandlers: [isEditing, setIsEditing],
		errorHandlers: [hasError, setHasError],
		userHandlers: [storeUser, setStoreUser],
	};

	return (
		<main>
			<TasksContext.Provider value={values}>{children}</TasksContext.Provider>
		</main>
	);
};

export default TasksProvider;
