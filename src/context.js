//INITIAL STATES
import React, { useRef, useEffect } from "react";

const initialState = {
  todoList: [],
  recentDeleted: [],
};

const actions = {
  ADD_TODO_ITEM: "ADD_TODO_ITEM",
  REMOVE_TODO_ITEM: "REMOVE_TODO_ITEM",
  TOGGLE_COMPLETED: "TOGGLE_COMPLETED",
  RESTORE_TODO_ITEM: "RESTORE_TODO_ITEM",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_TODO_ITEM:
      return {
        todoList: [
          ...state.todoList,
          {
            id: new Date().valueOf(),
            label: action.todoItemLabel,
            completed: false,
          },
        ],
      };

    case actions.REMOVE_TODO_ITEM: {
      const filteredTodoItems = state.todoList.filter(
        (todoItem) => todoItem.id !== action.todoItemId
      );
      // const removedTodoItem = state.todoList.filter(
      //   (todoItem) => todoItem.id === action.todoItemId
      // );
      // console.log("recently deleted =>",removedTodoItem)
      return { todoList: filteredTodoItems };
    }

    case actions.RESTORE_TODO_ITEM: {
      return { todoList: action.prevTodoItems };
    }

    case actions.TOGGLE_COMPLETED: {
      const updatedTodoList = state.todoList.map((todoItem) =>
        todoItem.id === action.todoItemId
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem
      );
      return { todoList: updatedTodoList };
    }
    default:
      return state;
  }
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const TodoListContext = React.createContext();

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const prevTodoItems = usePrevious(state.todoList);

  const value = {
    todoList: state.todoList,
    recentDeleted: prevTodoItems,

    addTodoItem: (todoItemLabel) => {
      dispatch({ type: actions.ADD_TODO_ITEM, todoItemLabel });
    },
    removeTodoItem: (todoItemId) => {
      dispatch({ type: actions.REMOVE_TODO_ITEM, todoItemId });
    },
    markAsCompleted: (todoItemId) => {
      dispatch({ type: actions.TOGGLE_COMPLETED, todoItemId });
    },
    restoreTodoItem: () => {
      dispatch({ type: actions.RESTORE_TODO_ITEM, prevTodoItems });
    },
  };

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};
