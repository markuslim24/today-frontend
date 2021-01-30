import React, { useRef } from "react";
import ContentEditable from "react-contenteditable";
import EditableLabel from "react-inline-editing";

function TodoItem(props) {
  const { todo, handleTodoCheck, handleTodoEdit, handleTodoDelete } = props;

  const todoTitle = useRef(todo.title);

  const todoCheck = (e, id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ todo: { done: e.target.checked } }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        handleTodoCheck(data);
      });
  };

  const handleChange = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else {
      todoTitle.current = e.target.value;
    }
  };

  const handleTodoBlur = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ todo: { title: todoTitle.current } }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        handleTodoEdit(data);
      });
  };

  const todoDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
        Accept: "application/json",
      },
    }).then((data) => {
      handleTodoDelete(id);
    });
  };

  return (
    <li className="task" todo={todo} key={todo.id}>
      <input
        className="taskCheckbox"
        type="checkbox"
        checked={todo.done}
        onChange={(e) => todoCheck(e, todo.id)}
      />
      <ContentEditable
        html={todoTitle.current}
        tagName="label"
        onChange={handleChange}
        onBlur={() => handleTodoBlur(todo.id)}
        maxLength="25"
      />
      <span className="deleteTaskBtn" onClick={() => todoDelete(todo.id)}>
        | x
      </span>
    </li>
  );
}

export default TodoItem;
