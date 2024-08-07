import { DragEvent } from "react";

export interface ITodoItem {
  id: number;
  text: string;
  done: boolean;
  timestamp: Date;
  username: string;
}

export interface IUsername {
  id: number;
  name: string;
}

export interface ITodosContext {
  todoArray: Array<ITodoItem>;
  // todoItem?: ITodoItem;
  addTodoFunc: (todo: ITodoItem) => void;
  // editTodoFunc: (todo: ITodoItem) => void; // Not used fpor edit
  removeTodoFunc: () => void;
  removeSelectedTodoFunc: (id: number) => void;
  selectedIdx: number;
  updateSelectedIdx: (idx: number) => void;
  handleDragStart: (event: DragEvent<HTMLDivElement>) => void;
  enableDropping: (event: DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: DragEvent<HTMLDivElement>, id: number) => void;
}
