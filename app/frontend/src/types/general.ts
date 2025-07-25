import type { Dispatch, SetStateAction } from "react";
import type { ITask, TFetchAllTasks } from "./task";

export type HandlersTuples<T> = [T, Dispatch<SetStateAction<T>>];

export interface TaskBoxProps {
	type: "new" | "edit";
	firstFieldRef: React.Ref<HTMLInputElement>;
	onCancel: React.MouseEventHandler<HTMLButtonElement>;
	defaultName: string;
	fetchAllTasks: TFetchAllTasks;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	task?: ITask;
}

export interface User {
	id: number | string;
	email: string;
	userName: string;
}
