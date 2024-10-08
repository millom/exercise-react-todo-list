import {
  ReactElement,
  DragEvent,
  MouseEvent,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from ".";
import {
  IFetchTodoItem,
  IFetchTodoItemSend,
  ITodoItem,
  ITodoItemPostDto,
  ITodosContext,
  IUsername,
} from "../interfaces";
import { SortType } from "../enums";
import {
  cocktailToJson,
  deleteJSonDataUsingFetch,
  getJSonDataUsingFetch,
  postJSonDataUsingFetch,
  putJSonDataUsingFetch,
  simpleCocktailToJson,
  simpleJsonToCocktail,
  simpleJsonToCocktails,
} from "../fetchFunctions";

export function App(): ReactElement {
  const users: Array<IUsername> = [
    { id: 0, name: "MFL" },
    { id: 1, name: "RFL" },
    { id: 2, name: "JFL" },
  ];

  const baseUrl: string = "https://localhost:7070/";
  const defaultTodoArray: Array<ITodoItem> = [];
  const [todoArray, setTodoArray] = useState(defaultTodoArray);
  // const [id, setId] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [anyTodoSelected, setAnyTodoSelected] = useState(false);
  const [username, setUsername] = useState(users[0].name);

  const navigate = useNavigate();

  const addTodoFunc: (todoItem: ITodoItemPostDto) => void = (
    todoItem: ITodoItemPostDto
  ) => {
    const addTodoLocal: (todoItem: ITodoItemPostDto) => Promise<void> = async (
      todoItem: ITodoItemPostDto
    ) => {
      const url: string = baseUrl + "api/todos";
      console.log("addTodoFunc", url, todoItem);
      const json: IFetchTodoItemSend = simpleCocktailToJson(todoItem);
      console.log("addTodoFunc2", url, json);
      const newTodoPromise: Promise<IFetchTodoItem> =
        await postJSonDataUsingFetch(url, json);
      const newTodo: ITodoItem = simpleJsonToCocktail(await newTodoPromise);

      setTodoArray([newTodo, ...todoArray]);
      console.log("addTodoFunc:", newTodo, todoArray);

      updateSelectedIdx(newTodo.id);
      console.log(todoArray);
      navigate("/");
    };

    addTodoLocal(todoItem);
  };

  const updateTodoFunc: (todoItem: ITodoItem) => void = (
    todoItem: ITodoItem
  ) => {
    const updateTodoLocal: (todoItem: ITodoItem) => Promise<void> = async (
      todoItem: ITodoItem
    ) => {
      const url: string = baseUrl + `api/todos/${todoItem.id}`;
      console.log("updateTodoFunc", url, todoItem);
      const json: IFetchTodoItem = cocktailToJson(todoItem);
      console.log("updateTodoFunc2", url, json);
      const newTodoPromise: Promise<IFetchTodoItem> =
        await putJSonDataUsingFetch(url, json);
      const newTodo: ITodoItem = simpleJsonToCocktail(await newTodoPromise);

      setTodoArray([...todoArray]);
      console.log("updateTodoFunc:", newTodo, todoArray);

      console.log(todoArray);
    };

    updateTodoLocal(todoItem);
  };

  const deleteTodoFromDb: (id: number) => void = (todo) => {
    const deleteTodoLocal: (id: number) => void = async (id: number) => {
      const url: string = baseUrl + `api/todos/${id}`;
      const response: Response = await deleteJSonDataUsingFetch(url, id);
      if (!response.ok) {
        console.log("----FAIL TO DELETE ITEM-----");
        throw new Error("Fail to delete item");
      }
      console.log(todoArray);
    };

    deleteTodoLocal(todo);
  };

  const removeTodoFunc: () => void = () => {
    todoArray.forEach((item) => {
      if (item.done) {
        deleteTodoFromDb(item.id);
      }
    });
    const newTodoArray = todoArray.filter((item) => !item.done);

    setTodoArray(newTodoArray);
    updateAnyTodoSelected(newTodoArray);
    console.log("removeTodo", newTodoArray);
  };

  const removeSelectedTodoFunc = (id: number) => {
    deleteTodoFromDb(id);
    const newTodoArray = todoArray.filter((item) => item.id !== id);

    setTodoArray(newTodoArray);
    updateAnyTodoSelected(newTodoArray);
  };

  const sortListFunc = (sortType: SortType) => {
    if (sortType === SortType.Custom) return;

    const newTodoArray =
      sortType === SortType.Timestamp
        ? todoArray.sort((a: ITodoItem, b: ITodoItem) =>
            a.timestamp < b.timestamp ? 1 : -1
          )
        : todoArray.sort((a: ITodoItem, b: ITodoItem) =>
            a.username < b.username ? -1 : 1
          );

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
    baseUrl,
    updateTodoFunc,
  };

  useEffect(() => {
    const setCocktailById = async () => {
      const url: string = baseUrl + "api/todos";
      console.log(url);
      const jsonTodos: IFetchTodoItem[] = await getJSonDataUsingFetch(url);
      console.log(jsonTodos);
      const todos: ITodoItem[] = simpleJsonToCocktails(jsonTodos);
      console.log("tre:", todos);
      setTodoArray(todos);
    };

    setCocktailById();
  }, []);

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
