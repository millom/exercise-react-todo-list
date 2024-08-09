import {
  ReactElement,
  DragEvent,
  MouseEvent,
  ChangeEvent,
  useState,
} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from ".";
import { ITodoItem, ITodosContext, IUsername } from "../interfaces";
import { SortType } from "../enums";

export function App(): ReactElement {
  const users: Array<IUsername> = [
    { id: 0, name: "MFL" },
    { id: 1, name: "RFL" },
    { id: 2, name: "JFL" },
  ];

  const defaultTodoArray: Array<ITodoItem> = [];
  const [todoArray, setTodoArray] = useState(defaultTodoArray);
  const [id, setId] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [anyTodoSelected, setAnyTodoSelected] = useState(false);
  const [username, setUsername] = useState(users[0].name);

  const navigate = useNavigate();

  const addTodoFunc: (todoItem: ITodoItem) => void = (todoItem: ITodoItem) => {
    todoItem.id = id;
    todoArray.push(todoItem);
    setTodoArray(todoArray);
    updateSelectedIdx(id);
    sortListFunc(SortType.Timestamp);
    setId(id + 1);
    console.log(todoArray);
    navigate("/");
  };

  const removeTodoFunc: () => void = () => {
    const newTodoArray = todoArray.filter((item) => !item.done);

    setTodoArray(newTodoArray);
    updateAnyTodoSelected(newTodoArray);
    console.log("removeTodo", newTodoArray);
  };

  const removeSelectedTodoFunc = (id: number) => {
    const newTodoArray = todoArray.filter((item) => item.id !== id);

    setTodoArray(newTodoArray);
    updateAnyTodoSelected(newTodoArray);
  };

  // const updateSortType = (type: SortType) => {
  //   setSortType(type);
  // };

  const sortListFunc = (sortType: SortType) => {
    if (sortType === SortType.Custom) return;

    // console.log(todoArray);
    const newTodoArray =
      sortType === SortType.Timestamp
        ? todoArray.sort((a: ITodoItem, b: ITodoItem) =>
            a.timestamp < b.timestamp ? 1 : -1
          )
        : todoArray.sort((a: ITodoItem, b: ITodoItem) =>
            a.username < b.username ? -1 : 1
          );
    // console.log(newTodoArray);

    setTodoArray([...newTodoArray]);
  };

  const updateUserFunc: (event: ChangeEvent<HTMLSelectElement>) => void = (
    event
  ) => {
    setUsername(event.target.value);
    console.log(username, users[0]);
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
  };

  const MoveItem = (
    event: MouseEvent<HTMLButtonElement>,
    todoToMove: ITodoItem,
    movement: number
  ) => {
    console.log("MoveItem", todoToMove, movement);
    const idx: number = todoArray.findIndex(
      (todo: ITodoItem) => todo === todoToMove
    );
    if (
      (idx <= 0 && movement < 0) ||
      (idx >= todoArray.length - 1 && movement > 0)
    ) {
      event.stopPropagation();
      return;
    }

    todoArray.splice(idx, 1);
    todoArray.splice(idx + movement, 0, todoToMove);

    setTodoArray([...todoArray]);

    event.stopPropagation();
  };

  const updateAnyTodoSelected: (localTodoArray?: Array<ITodoItem>) => void = (
    localTodoArray = todoArray
  ) => {
    const anySelected: boolean = localTodoArray.some((todo) => todo.done);
    setAnyTodoSelected(anySelected);
    console.log("updateAnyTodoSelected:", localTodoArray, anyTodoSelected);
  };

  const todosContext: ITodosContext = {
    todoArray,
    addTodoFunc,
    removeTodoFunc,
    removeSelectedTodoFunc,
    selectedIdx,
    updateSelectedIdx,
    handleDragStart,
    enableDropping,
    handleDrop,
    MoveItem,
    updateAnyTodoSelected,
    username,
  };

  return (
    <>
      <Header
        removeTodoFunc={removeTodoFunc}
        sortListFunc={sortListFunc}
        showRemoveButton={anyTodoSelected}
        users={users}
        updateUserFunc={updateUserFunc}
        username={username}
      />

      <Outlet context={todosContext} />
    </>
  );
}
