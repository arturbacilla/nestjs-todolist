import { HandlersTuples } from "./general";
import { ITask } from "./task";

export interface ITasksContext {
  loadingHandlers: HandlersTuples<boolean>;
  newTaskInput: HandlersTuples<string>;
  tasksHandlers: HandlersTuples<ITask[]>;
  updatingHandlers: HandlersTuples<number | null>;
  editHandlers: HandlersTuples<number | null>;
}
