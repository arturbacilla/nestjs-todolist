import { HandlersTuples } from "./general";
import { ITask } from "./tabs";

export interface ITasksContext {
  loadingHandlers: HandlersTuples<boolean>;
  newTaskInput: HandlersTuples<string>;
  tasksHandlers: HandlersTuples<ITask[]>;
}
