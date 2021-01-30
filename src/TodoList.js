import React, { useState, useEffect } from "react";
import update from "immutability-helper";
import TodoItem from "./TodoItem";

function TodoList(props) {
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
    <div>
      <div className="inputContainer">
        <input
          value={todoInput}
          onChange={handleTodoInputChange}
          className="taskInput"
          type="text"
          placeholder="Add a task"
          maxLength="50"
          onKeyPress={createTodo}
        />
      </div>
      <div className="listWrapper">
        <ul className="taskList">
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
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
