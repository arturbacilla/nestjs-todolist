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

export interface ITabs {
  tasks: ITask[];
  fetchAllTasks: () => Promise<void> | undefined;
}

export interface ITaksList extends ITabs {
  filter?: keyof typeof TaskStatus;
}
