import React from "react";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import "./App.css";
import { Typography } from "@material-ui/core";

function App() {
  return (
    <div className="app__root">
      <div className="app__todo">
        <Typography variant="h4">MyTodos</Typography>
        <TodoForm />
        <Todo />
      </div>
    </div>
  );
}

export default App;
