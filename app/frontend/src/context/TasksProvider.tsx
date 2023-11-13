import React, { useState } from "react";
import TasksContext from "./TasksContext";
import { ITasksContext } from "../types/context";
import { ITask } from "../types/task";
import { User } from "../types/general";

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
