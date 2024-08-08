import { AddToDo } from "./AddToDo";
import { TodoList } from "./TodoList";
import { Provider } from "./context";
import "./style.css"


export const App = () => {
  return (
    <>
      <h1>My Todo App </h1><br />
      <Provider>
        <AddToDo />
        <TodoList />
      </Provider>
    </>
  );
};
