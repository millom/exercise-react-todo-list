import { ReactElement } from "react";
import { useTodosContext } from "../hooks";

export function AboutPage(): ReactElement {
  const { todoArray } = useTodosContext();

  return (
    <>
      <article className="about-container">
        <h1>About</h1>

        <p>Total number of todos: {todoArray.length}</p>

        <h3>Instructions</h3>

        <p>Add items</p>
        <ul>
          <li>From Add todo</li>
          <li>Can write a note in Add todo</li>
          <li>Timestamp is added</li>
          <li>Author name from header is added</li>
        </ul>

        <p>Look at and Edit a todo</p>
        <ul>
          <li>From home</li>
          <li>Every todo in list has an Edit and Remove button</li>
          <li>A todo can be active by clicking on todo in list</li>
          <li>When clicking on a selected todos it will be unselected</li>
        </ul>

        <p>Remove items</p>
        <ul>
          <li>From home</li>
          <li>A todo can be removed by clicking a button n todo in list</li>
          <li>
            Multiple todos can be selected be clicking in checkboxes on todos
          </li>
          <li>
            All selected todos can be removed by clicking on a button appearing
            in the header
          </li>
        </ul>

        <p>Sort items</p>
        <ul>
          <li>From home</li>
          <li>Active Todos can be moved up and down by clicking on buttons</li>
          <li>Items can also be sorted by Drag and Drop</li>
        </ul>
      </article>
    </>
  );
}
