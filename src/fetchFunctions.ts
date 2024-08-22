import {
  IFetchTodoItem,
  IFetchTodoItemSend,
  ITodoItem,
  ITodoItemPostDto,
} from "./interfaces";

export const getJSonDataUsingFetch: (
  searchUrl: string
) => Promise<IFetchTodoItem[]> | any = async (searchUrl) => {
  console.log("getJSonDataUsingFetch", searchUrl);
  const response = await fetch(searchUrl, {
    headers: {
      mode: "cors",
    },
  });
  return await response.json();
};

export const postJSonDataUsingFetch: (
  searchUrl: string,
  todoItem: IFetchTodoItemSend
) => Promise<IFetchTodoItem> | any = async (searchUrl, todoItem) => {
  console.log("postJSonDataUsingFetch", todoItem, JSON.stringify(todoItem));
  const response = await fetch(searchUrl, {
    method: "post",
    headers: {
      mode: "cors",
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
    //make sure to serialize your JSON body
    body: JSON.stringify(todoItem),
    // mode: "no-cors",
    // cache: "force-cache",
    // contenttype:
  });
  return await response.json();
};

export const putJSonDataUsingFetch: (
  searchUrl: string,
  todoItem: IFetchTodoItem
) => Promise<IFetchTodoItem> | any = async (searchUrl, todoItem) => {
  console.log("putJSonDataUsingFetch", todoItem, JSON.stringify(todoItem));
  const response = await fetch(searchUrl, {
    method: "put",
    headers: {
      mode: "cors",
      // Accept: "application/json",
      "Content-Type": "application/json",
    },
    //make sure to serialize your JSON body
    body: JSON.stringify(todoItem),
    // mode: "no-cors",
    // cache: "force-cache",
    // contenttype:
  });
  console.log("putJSonDataUsingFetch:", response);
  return await response.json();
};

export const deleteJSonDataUsingFetch: (
  searchUrl: string,
  id: number
) => Promise<IFetchTodoItem> | any = async (searchUrl, id) => {
  const response = await fetch(searchUrl, {
    method: "delete",
    headers: {
      mode: "cors",
    },
  });
  console.log("deleteJSonDataUsingFetch:", response);
  return await response;
};

export const fetchUpdateTodo: (todo: ITodoItem) => void = (todo) => {};

export const fetchRemoveTodo: (todo: ITodoItem) => void = (todo) => {};

export const simpleJsonToCocktail: (json: IFetchTodoItem) => ITodoItem = (
  json
) => {
  const unixEpochTimeMS = parseInt(json.timestamp) * 1000;
  const todo: ITodoItem = {
    id: json.id,
    username: json.author,
    text: json.title,
    done: json.isCompleted,
    timestamp: new Date(unixEpochTimeMS), // From .NET time to JS time
    epoch: json.timestamp,
  };
  return todo;
};

export const simpleJsonToCocktails: (todos: IFetchTodoItem[]) => ITodoItem[] = (
  todos
) => {
  return todos.map((json: IFetchTodoItem) => {
    const unixEpochTimeMS = parseInt(json.timestamp) * 1000;
    const todo: ITodoItem = {
      id: json.id,
      username: json.author,
      text: json.title,
      done: json.isCompleted,
      epoch: json.timestamp,
      timestamp: new Date(unixEpochTimeMS), // From .NET time to JS time
    };
    console.log("todo", todo);
    return todo;
  });
};

export const cocktailToJson: (todo: ITodoItem) => IFetchTodoItem = (todo) => {
  const json: IFetchTodoItem = {
    id: todo.id,
    author: todo.username,
    title: todo.text,
    isCompleted: todo.done,
    timestamp: todo.epoch,
  };
  return json;
};

export const simpleCocktailToJson: (
  todo: ITodoItemPostDto
) => IFetchTodoItemSend = (todo) => {
  const json: IFetchTodoItemSend = {
    author: todo.username,
    title: todo.text,
  };
  return json;
};
