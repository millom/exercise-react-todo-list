import { ReactElement } from "react";
import { ITodoItem } from "../interfaces";

interface ITodoItemProps {
  todoItem: ITodoItem;
}

export function TodoItem({ todoItem }: ITodoItemProps): ReactElement {
  return (
    <>
      <div>{todoItem.text}</div>
    </>
  );
}
