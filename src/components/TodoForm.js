import { Button, TextField } from "@material-ui/core";
import React from "react";
import { db } from "../firebase";

import "./TodoForm.css";

function TodoForm() {
  const [todo, setTodo] = React.useState("");
  const [error, setError] = React.useState("");

  const handleClick = () => {
    if (todo === "") {
      setError("Todo cannot be empty");
    } else {
      db.collection("todos")
        .add({
          todo: todo,
          isCompleted: false,
          timeStamp: Date.now(),
        })
        .then((data) => data.id)
        .catch((err) => console.log(err));
    }

    setTodo("");
  };

  return (
    <div className="todoForm__root">
      <TextField
        className="todoForm__input"
        type="text"
        name="todo"
        onChange={({ target }) => setTodo(target.value)}
        value={todo}
      />
      {error && <h6 className="todoForm__error">{error}</h6>}
      <Button
        disableElevation
        className="todoForm__btnAdd"
        type="button"
        variant="contained"
        disabled={todo === "" ? true : false}
        onClick={handleClick}
      >
        Add
      </Button>
    </div>
  );
}

export default TodoForm;
