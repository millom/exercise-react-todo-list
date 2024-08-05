import { ReactElement, RefObject, useRef, useState } from "react";
import { TodoList, TodoMainMenu } from ".";
import { ITodoItem } from "../interfaces";

export function TodoMain(): ReactElement {
  const defaultTodoArray: Array<ITodoItem> = [];
  const [todoArray, setTodoArray] = useState(defaultTodoArray);
  const [id, setId] = useState(0);
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const addTotdoFunc = () => {
    const todoItem: ITodoItem = {
      id: id,
      text: textAreaRef.current!.value,
    };
    todoArray.push(todoItem);
    setTodoArray(todoArray);
    setId(id + 1);
    //  = [...todoArray, todoItem];
    console.log(todoArray);
  };

  return (
    <>
      <h1>Help I need somebody</h1>
      <TodoMainMenu addTodo={addTotdoFunc} textareaRef={textAreaRef} />
      <TodoList todoArray={todoArray}></TodoList>
    </>
  );
}
