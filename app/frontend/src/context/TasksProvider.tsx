import React, { useState } from "react";
import TasksContext from "./TasksContext";
import { ITasksContext } from "../types/context";
import { ITask } from "../types/tabs";

const taskList: ITask[] = [];

const TasksProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [taskInput, setTaskInput] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>(taskList);
  const [isUpdating, setisUpdating] = useState<number | null>(null);

  const values: ITasksContext = {
    loadingHandlers: [isLoading, setIsLoading],
    newTaskInput: [taskInput, setTaskInput],
    tasksHandlers: [tasks, setTasks],
    updatingHandlers: [isUpdating, setisUpdating],
  };

  return (
    <main>
      <TasksContext.Provider value={values}>{children}</TasksContext.Provider>
    </main>
  );
};

export default TasksProvider;
