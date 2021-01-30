import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import TodoItem from "./TodoItem";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    width: "100%",
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
  },
  input: {
    width: "100%",
  },
}));

function TodoList(props) {
  const classes = useStyles();
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/api/v1/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setTodos(data);
        });
    }
  };
  const handleTodoInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const createTodo = (e) => {
    const token = localStorage.getItem("token");
    if (e.key === "Enter") {
      fetch(`http://localhost:3000/api/v1/todos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ todo: { title: todoInput } }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          const todostmp = update(todos, {
            $splice: [[0, 0, data]],
          });
          setTodos(todostmp);
          setTodoInput("");
        });
    }
  };

  const handleTodoCheck = (data) => {
    const todoIndex = todos.findIndex((x) => x.id === data.id);
    const todostmp = update(todos, {
      [todoIndex]: { $set: data },
    });
    setTodos(todostmp);
  };

  const handleTodoEdit = (data) => {
    const todoIndex = todos.findIndex((x) => x.id === data.id);
    const todostmp = update(todos, {
      [todoIndex]: { $set: data },
    });
    setTodos(todostmp);
  };

  const handleTodoDelete = (id) => {
    const todoIndex = todos.findIndex((x) => x.id === id);
    const todostmp = update(todos, {
      $splice: [[todoIndex, 1]],
    });
    setTodos(todostmp);
  };

  return (
    <Container maxWidth="xl">
      <List className={classes.root}>
        <ListItem>
          <TextField
            className={classes.input}
            value={todoInput}
            onChange={handleTodoInputChange}
            type="text"
            placeholder="Add a task"
            maxLength="50"
            onKeyPress={createTodo}
          />
        </ListItem>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleTodoCheck={handleTodoCheck}
              handleTodoEdit={handleTodoEdit}
              handleTodoDelete={handleTodoDelete}
            />
          );
        })}
      </List>
    </Container>
  );
}

export default TodoList;
