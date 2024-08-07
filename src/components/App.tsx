import { ReactElement, DragEvent, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header, TodoItem } from ".";
import { ITodoItem, ITodosContext } from "../interfaces";
import { addFunc, removeFunc } from "../customTypes";
import { SortType } from "../enums";

export function App(): ReactElement {
  const defaultTodoArray: Array<ITodoItem> = [];
  const [todoArray, setTodoArray] = useState(defaultTodoArray);
  const [id, setId] = useState(0);
  const [sortType, setSortType] = useState(SortType.Custom);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const navigate = useNavigate();

  const addTodoFunc: addFunc = (todoItem: ITodoItem) => {
    todoItem.id = id;
    todoArray.push(todoItem);
    setTodoArray(todoArray);
    updateSelectedIdx(id);
    sortListFunc(SortType.Timestamp);
    setId(id + 1);
    console.log(todoArray);
    navigate("/");
  };

  const removeTodoFunc: removeFunc = () => {
    const newTodoArray = todoArray.filter((item) => !item.done);

    setTodoArray(newTodoArray);
    console.log(newTodoArray);
  };

  // Not used for edit
  // const editTodoFunc = (todo: ITodoItem) => {
  //   // const newTodoArray = todoArray.filter((item) => item.id !== id);

  //   setTodoArray([...todoArray]);
  // };

  const removeSelectedTodoFunc = (id: number) => {
    const newTodoArray = todoArray.filter((item) => item.id !== id);

    setTodoArray(newTodoArray);
  };

  const updateSortType = (type: SortType) => {
    setSortType(type);
  };

  const sortListFunc = (sortType: SortType) => {
    console.log(sortType);
    switch (sortType) {
      case SortType.Custom:
        break;
      case SortType.Timestamp:
        console.log("Timestamp");
        break;
      case SortType.Author:
        console.log("Author");
        break;
      default:
        console.log("Error");
    }

    // const newTodoArray = todoArray.sort((item) => item.id !== id);
    if (sortType === SortType.Custom) return;
    console.log(todoArray);
    const newTodoArray =
      sortType === SortType.Timestamp
        ? todoArray.sort((a: ITodoItem, b: ITodoItem) =>
            a.timestamp < b.timestamp ? 1 : -1
          )
        : todoArray.sort((a: ITodoItem, b: ITodoItem) =>
            a.username < b.username ? -1 : 1
          );
    console.log(newTodoArray);

    // setTodoArray(newTodoArray);
    setTodoArray([...newTodoArray]);
  };

  const updateSelectedIdx = (idx: number) => {
    setSelectedIdx(selectedIdx === idx ? -1 : idx);
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", event.currentTarget.id);
    console.log(handleDragStart);
  };

  const enableDropping = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(enableDropping);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, id: number) => {
    const dragedId = event.dataTransfer.getData("text");
    console.log(
      `Revceiver(${id}) Somebody dropped an element with id: ${dragedId}`
    );
    const targetId: number = todoArray.findIndex(
      (todo: ITodoItem) => todo.id.toString() == id.toString()
    );
    const sourseId: number = todoArray.findIndex(
      (todo: ITodoItem) => todo.id.toString() == dragedId.toString()
    );
    const todo = todoArray[sourseId];
    todoArray.splice(sourseId, 1);
    todoArray.splice(targetId, 0, todo);
    setTodoArray([...todoArray]);
    console.log(todoArray);
    // indexOf((todo: ITodoItem) => todo.id === dragedId);
  };

  const todosContext: ITodosContext = {
    todoArray,
    addTodoFunc,
    // editTodoFunc,
    removeTodoFunc,
    removeSelectedTodoFunc,
    selectedIdx,
    updateSelectedIdx,
    handleDragStart,
    enableDropping,
    handleDrop,
  };

  return (
    // <div className="todo-main-container">
    <>
      <Header
        removeTodoFunc={removeTodoFunc}
        sortListFunc={sortListFunc}
        sortType={sortType}
        updateSortType={updateSortType}
      />
      <Outlet context={todosContext} />
      {/* <TodoMainMenu addTodo={addTotdoFunc} removeTodo={removeTodoFunc} />
      <TodoList
        todoArray={todoArray}
        RemoveItem={removeSelectedTodoFunc}
      ></TodoList> */}
    </>
  );
}
