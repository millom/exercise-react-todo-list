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
}
