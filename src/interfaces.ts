import { DragEvent, MouseEvent } from "react";

export interface ITodoItem {
  id: number;
  text: string;
  done: boolean;
  timestamp: Date;
  // epoch: string;
  username: string;
}

export interface ITodoItemPostDto {
  // id: number;
  text: string;
  // done: boolean;
  // timestamp: Date;
  // epoch: string;
  username: string;
}

export interface IUsername {
  id: number;
  name: string;
}

export interface ITodosContext {
  todoArray: Array<ITodoItem>;
  // todoItem?: ITodoItem;
  addTodoFunc: (todo: ITodoItemPostDto) => void;
  // editTodoFunc: (todo: ITodoItem) => void; // Not used fpor edit
  removeTodoFunc: () => void;
  removeSelectedTodoFunc: (id: number) => void;
  selectedIdx: number;
  updateSelectedIdx: (idx: number) => void;
  handleDragStart: (event: DragEvent<HTMLDivElement>) => void;
  enableDropping: (event: DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: DragEvent<HTMLDivElement>, id: number) => void;
  MoveItem: (
    event: MouseEvent<HTMLButtonElement>,
    todoToMove: ITodoItem,
    movement: number
  ) => void;
  updateAnyTodoSelected: () => void;
  username: string;
  baseUrl: string;
}

export interface IFetchAddTodoItem {
  Title: string;
  Author: string;
}

// export interface IFetchPutTodoItem {
//   Id: number;
//   Title: string;
//   IsCompleted: boolean;
//   Timestamp: Date;
//   Author: string;
// }

export interface IFetchTodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  timestamp: string;
  // epoch: string;
  author: string;
}

export interface IFetchTodoItemSend {
  // id: number;
  title: string;
  // isCompleted: boolean;
  // timestamp: string;
  // epoch: string;
  author: string;
}
