import React, { useContext } from "react";
import { TodoListContext } from "./context";

export const TodoList = () => {
  const { todoList, removeTodoItem, markAsCompleted } =
    useContext(TodoListContext);

  return (
    <ul>
      {todoList.map((todoItem) => (
        <li
          className={`todoItem ${todoItem.completed ? "completed" : ""}`}
          key={todoItem.id}
          onClick={() => markAsCompleted(todoItem.id)}
        >
          {todoItem.label}
          <button
            className="delete"
            onClick={() => removeTodoItem(todoItem.id)}
          >
            {" "}
            X{" "}
          </button>
        </li>
      ))}
    </ul>
  );
};
