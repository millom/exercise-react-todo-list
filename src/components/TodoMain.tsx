import { ReactElement, RefObject, useRef, useState } from "react";
import { TodoList, TodoMainMenu } from ".";
import { ITodoItem } from "../interfaces";

export function TodoMain(): ReactElement {
  const defaultTodoArray: Array<ITodoItem> = [];
  const [todoArray, setTodoArray] = useState(defaultTodoArray);
  const [id, setId] = useState(0);
  const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const usernameRef: RefObject<HTMLSelectElement> = useRef(null);

  const addTotdoFunc = () => {
    const todoItem: ITodoItem = {
      id: id,
      text: textAreaRef.current!.value,
      done: false,
      username: usernameRef.current!.value,
      timestamp: new Date().toLocaleString("sv-SW"),
      // ref: useRef(null),
    };
    todoArray.push(todoItem);
    setTodoArray(todoArray);
    setId(id + 1);
    //  = [...todoArray, todoItem];
    console.log(todoArray);
  };

  const removeTodoFunc = () => {
    // console.log("Old", todoArray, todoArray[0].done === true);
    const newTodoArray = todoArray.filter((item) => !item.done);
    // console.log("New", newTodoArray);

    setTodoArray(newTodoArray);
  };

  const removeSelectedTodoFunc = (id: number) => {
    // console.log("Old", todoArray, todoArray[0].done === true);
    const newTodoArray = todoArray.filter((item) => item.id !== id);
    // console.log("New", newTodoArray);

    setTodoArray(newTodoArray);
  };

  return (
    <div className="todo-main-container">
      <TodoMainMenu
        addTodo={addTotdoFunc}
        removeTodo={removeTodoFunc}
        textareaRef={textAreaRef}
        usernameRef={usernameRef}
      />
      <TodoList
        todoArray={todoArray}
        RemoveItem={removeSelectedTodoFunc}
      ></TodoList>
    </div>
  );
}
