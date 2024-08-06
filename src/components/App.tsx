import { ReactElement, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from ".";
import { ITodoItem, ITodosContext } from "../interfaces";
import { addFunc, removeFunc } from "../customTypes";

export function App(): ReactElement {
  const defaultTodoArray: Array<ITodoItem> = [];
  const [todoArray, setTodoArray] = useState(defaultTodoArray);
  const [id, setId] = useState(0);
  const navigate = useNavigate();

  const addTodoFunc: addFunc = (todoItem: ITodoItem) => {
    todoItem.id = id;
    todoArray.push(todoItem);
    setTodoArray(todoArray);
    setId(id + 1);
    console.log(todoArray);
    navigate("/");
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

  const todosContext: ITodosContext = {
    todoArray,
    addTodoFunc,
    removeTodoFunc,
    removeSelectedTodoFunc,
  };

  return (
    // <div className="todo-main-container">
    <>
      <Header removeTodoFunc={removeTodoFunc} />
      <Outlet context={todosContext} />
      {/* <TodoMainMenu addTodo={addTotdoFunc} removeTodo={removeTodoFunc} />
      <TodoList
        todoArray={todoArray}
        RemoveItem={removeSelectedTodoFunc}
      ></TodoList> */}
    </>
  );
}
