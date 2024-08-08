import { ReactElement, DragEvent, MouseEvent, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from ".";
import { ITodoItem, ITodosContext } from "../interfaces";
import { addFunc, removeFunc } from "../customTypes";
import { SortType } from "../enums";

export function App(): ReactElement {
  const defaultTodoArray: Array<ITodoItem> = [];
  const [todoArray, setTodoArray] = useState(defaultTodoArray);
  const [id, setId] = useState(0);
  const [sortType, setSortType] = useState(SortType.Custom);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [anyTodoSelected, setAnyTodoSelected] = useState(false);

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

  const removeSelectedTodoFunc = (id: number) => {
    const newTodoArray = todoArray.filter((item) => item.id !== id);

    setTodoArray(newTodoArray);
  };

  const updateSortType = (type: SortType) => {
    setSortType(type);
  };

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

    // // console.log(todoArray);
    // let newTodoArray =
    //   sortType === SortType.Timestamp
    //     ? todoArray.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
    //     : todoArray.sort((a, b) => (a.username < b.username ? -1 : 1));
    // // console.log(newTodoArray);

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

  const updateAnyTodoSelected: () => void = () => {
    const anySelected: boolean = todoArray.some((todo) => todo.done);
    setAnyTodoSelected(anySelected);
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
  };

  return (
    <>
      <Header
        removeTodoFunc={removeTodoFunc}
        sortListFunc={sortListFunc}
        sortType={sortType}
        updateSortType={updateSortType}
        showRemoveButton={anyTodoSelected}
      />

      <Outlet context={todosContext} />
    </>
  );
}
