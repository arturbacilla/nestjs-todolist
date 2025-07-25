import { createContext } from "react";
import type { ITasksContext } from "../types/context";

const TasksContext = createContext<ITasksContext | null>(null);

export default TasksContext;
