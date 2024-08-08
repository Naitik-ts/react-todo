import React, { useState, useContext } from "react";

import { TodoListContext } from "./context";

export const AddToDo = () => {
  const [inputValue, setInputValue] = useState("");

  const { addTodoItem, restoreTodoItem } = useContext(TodoListContext);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        placeholder={"Type and add todo item"}
        onChange={(e) => setInputValue(e.target.value)}
      />{" "}
      <button
        onClick={() => {
          addTodoItem(inputValue);
          setInputValue("");
        }}
      >
        Add
      </button>{" "}
      <button
        onClick={() => {
          restoreTodoItem();
          setInputValue("");
        }}
      >
        Restore 
      </button>
    </>
  );
};
