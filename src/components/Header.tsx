import { ReactElement } from "react";

export function Header(): ReactElement {
  return (
    <div className="header">
      <div className="">My todo list</div>
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/add-todo">Add</a>
        <a href="/about">About</a>
      </nav>
    </div>
  );
}
