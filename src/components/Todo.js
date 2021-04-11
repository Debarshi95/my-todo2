import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  CheckCircle,
  CheckCircleOutline,
  Clear,
  Close,
  CropSquareSharp,
} from "@material-ui/icons";
import React from "react";
import { db } from "../firebase";
import "./Todo.css";

function Todo() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    db.collection("todos")
      .orderBy("timeStamp", "desc")
      .onSnapshot(
        (snapshot) => {
          setTodos(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
          setLoading(false);
        },
        (err) => console.log(err)
      );
  }, []);

  const setTodoMarked = async (id) => {
    await db.collection("todos").doc(id).update({
      isCompleted: true,
    });
  };

  return loading ? (
    <div className="todo__loading">
      <CircularProgress />
    </div>
  ) : todos.length > 0 ? (
    <div className="todo__root">
      {todos.map((todo) => (
        <div key={todo.id} className="todo__item">
          <h4
            className={`todo__title ${
              todo.isCompleted ? `todo__text--marked` : ``
            } `}
          >
            {todo.todo}
          </h4>
          <IconButton
            variant="outlined"
            className={`todo__btnDelete ${
              todo.isCompleted ? `todo__btnDelete--success` : ``
            }`}
            onClick={() => setTodoMarked(todo.id)}
          >
            <CheckCircleOutline />
          </IconButton>
        </div>
      ))}
    </div>
  ) : (
    <Typography variant="h5" className="todo__noPosts">
      No Todos found
    </Typography>
  );
}

export default Todo;
