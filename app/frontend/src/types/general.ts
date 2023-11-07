import { Dispatch, SetStateAction } from "react";

export type HandlersTuples<T> = [T, Dispatch<SetStateAction<T>>];
