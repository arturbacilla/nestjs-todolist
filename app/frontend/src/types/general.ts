import { Dispatch, SetStateAction } from "react";

export type HandlersTuples<T> = [T, Dispatch<SetStateAction<T>>];

export interface NewTaskPopover {
  firstFieldRef: React.Ref<HTMLInputElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  defaultName: string;
}
