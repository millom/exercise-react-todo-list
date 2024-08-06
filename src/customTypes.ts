import { ITodoItem } from "./interfaces";

export type addFunc = (todo: ITodoItem) => void;

export type removeFunc = () => void;

export type removeByIdFunc = (id: number) => void;
