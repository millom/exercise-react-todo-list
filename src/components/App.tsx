import { ReactElement, useState } from "react";
import { Outlet } from "react-router-dom";
import { TodoMainMenu, Header } from ".";
import { ITodoItem } from "../interfaces";
import { addFunc, removeFunc } from "../customTypes";

export function App(): ReactElement {
  const defaultTodoArray: Array<ITodoItem> = [];
  const [todoArray, setTodoArray] = useState(defaultTodoArray);
  const [id, setId] = useState(0);

  const addTotdoFunc: addFunc = (todoItem: ITodoItem) => {
    todoItem.id = id;
    todoArray.push(todoItem);
    setTodoArray(todoArray);
    setId(id + 1);
    console.log(todoArray);
  };

  const removeTodoFunc: removeFunc = () => {
    const newTodoArray = todoArray.filter((item) => !item.done);

    setTodoArray(newTodoArray);
    console.log(newTodoArray);
  };

  const removeSelectedTodoFunc = (id: number) => {
    const newTodoArray = todoArray.filter((item) => item.id !== id);

    setTodoArray(newTodoArray);
  };

  return (
    // <div className="todo-main-container">
    <>
      <Header />
      <Outlet />
      {/* <TodoMainMenu addTodo={addTotdoFunc} removeTodo={removeTodoFunc} />
      <TodoList
        todoArray={todoArray}
        RemoveItem={removeSelectedTodoFunc}
      ></TodoList> */}
    </>
  );
}
