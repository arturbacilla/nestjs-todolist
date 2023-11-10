export enum TaskStatus {
  COMPLETED = "COMPLETED",
  ACTIVE = "ACTIVE",
  ALL = "ALL",
}

export interface ITask {
  id: number;
  title: string;
  description?: string;
  status: keyof typeof TaskStatus;
  author: string;
  creationDate: Date;
  conclusionDate?: Date;
}

export type TFetchAllTasks = () => Promise<string | number | void> | undefined;

export interface ITabs {
  tasks: ITask[];
  fetchAllTasks: TFetchAllTasks;
}

export interface ITaksList extends ITabs {
  filter?: keyof typeof TaskStatus;
}
