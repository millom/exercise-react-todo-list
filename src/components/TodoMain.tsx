import { ReactElement, RefObject, useRef } from "react";
import { TodoMainMenu } from ".";
import { ITodoItem } from "../interfaces";

export function TodoMain(): ReactElement {
  const todoArray: Array<ITodoItem> = [];
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const addTotdoFunc = () => {
    const todoItem: ITodoItem = {
      text: textAreaRef.current!.value,
    };
    todoArray.push(todoItem);
    console.log(todoArray);
  };

  return (
    <>
      <h1>Help I need somebody</h1>
      <TodoMainMenu addTodo={addTotdoFunc} textareaRef={textAreaRef} />
    </>
  );
}
