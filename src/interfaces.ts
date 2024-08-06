import { RefObject } from "react";

export interface ITodoItem {
  id: number;
  // ref: RefObject<HTMLInputElement>;
  text: string;
  done: boolean;
  timestamp: Date;
  username: string;
}
