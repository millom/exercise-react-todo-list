export interface ITodoItem {
  id: number;
  text: string;
  done: boolean;
  timestamp: string;
  username: string;
}

export interface IUsername {
  id: number;
  name: string;
}

export interface ITodosContext {
  todoArray: Array<ITodoItem>;
  addTodoFunc: (todo: ITodoItem) => void;
  removeTodoFunc: () => void;
  removeSelectedTodoFunc: (id: number) => void;
}
