import React, { useState } from "react";
import TasksContext from "./TasksContext";
import { ITasksContext } from "../types/context";
import { ITask } from "../types/tabs";

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
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
     industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
      it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
       typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
       sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus 
       PageMaker including versions of Lorem Ipsum`,
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

const TasksProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [taskInput, setTaskInput] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>(taskList);

  const values: ITasksContext = {
    loadingHandlers: [isLoading, setIsLoading],
    newTaskInput: [taskInput, setTaskInput],
    tasksHandlers: [tasks, setTasks],
  };

  return (
    <main>
      <TasksContext.Provider value={values}>{children}</TasksContext.Provider>
    </main>
  );
};

export default TasksProvider;
