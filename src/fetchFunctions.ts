import { IFetchAddTodoItem, IFetchTodoItem, ITodoItem } from "./interfaces";

// export const getJSonDataUsingFetch = async () => {
//   const searchUrl = baseUrl + "api/todos";
//   const response = await fetch(searchUrl, {
//     // cache: "force-cache",
//     mode: "no-cors",
//   });
//   return await response.json();
// };
// export const getJSonDataUsingFetch: () => IFetchTodoItem[] | any = async () => {
//   const searchUrl = baseUrl + "api/todos";
//   console.log("url:", searchUrl);
//   const response = await fetch(searchUrl, {
//     // cache: "force-cache",
//     mode: "no-cors",
//   });
//   return await response.json();
// };
export const getJSonDataUsingFetch: (
  searchUrl: string
) => Promise<IFetchTodoItem[]> | any = async (searchUrl) => {
  const response = await fetch(searchUrl, {
    headers: {
      mode: "cors",
    },
    // mode: "no-cors",
    // cache: "force-cache",
    // contenttype:
  });
  return await response.json();
};

export const fetchGetAll: () => void = () => {
  const getAllTodos = async () => {
    try {
      // const headers = new Headers();
      const url = baseUrl + "api/todos";
      console.log("url:", url);
      const res = await fetch(url, { mode: "no-cors" });
      console.log(res);
      if (!res.ok) console.log(`GET ALL failed with ${res.status}.`);
    } catch (err) {
      console.error(err);
    }
  };

  getAllTodos();
};

export const fetchAddTodo: (todo: ITodoItem) => void = (todo) => {
  // const data: IFetchAddTodoItem = {
  //   Title: todo.text,
  //   Author: todo.username,
  // };

  const addTodo = async (todo: ITodoItem) => {
    const data: IFetchTodoItem = {
      Id: 1,
      Title: todo.text,
      Author: todo.username,
      IsCompleted: false,
      Timestamp: Date.now().toString(),
    };

    try {
      // const headers = new Headers();
      const url = baseUrl + "api/todos";
      console.log("url:", url);
      const res = await fetch(url, {
        method: "POST",
        // headers: {
        //   "content-type": "multipart/form-data",
        // },
        // headers,
        headers: { accept: "text/plain", "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify(data),
      });

      if (!res.ok) console.log(`POST failed with ${res.status}.`);
    } catch (err) {
      console.error(err);
    }
  };

  addTodo(todo);
};

export const fetchUpdateTodo: (todo: ITodoItem) => void = (todo) => {};

export const fetchRemoveTodo: (todo: ITodoItem) => void = (todo) => {};

export const simpleJsonToCocktails: (todos: IFetchTodoItem[]) => ITodoItem[] = (
  todos
) => {
  return todos.map((json: IFetchTodoItem) => {
    // console.log("json", json, json.timestamp, ":::", new Date());
    const unixEpochTimeMS = parseInt(json.epoch) * 1000;
    const todo: ITodoItem = {
      id: json.id,
      username: json.author,
      text: json.title,
      done: json.isCompleted,
      timestamp: new Date(unixEpochTimeMS), // From .NET time to JS time
      // timestamp: Date(json.epoch)
    };
    console.log(json.epoch);
    console.log("todo", todo);
    return todo;
  });
};
//   }
// }
