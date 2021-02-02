import React, { Fragment } from "react";
import EditableText from "./EditableText";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import { API_ROOT } from "../apiRoot";

function TodoItem(props) {
  const { todo, handleTodoCheck, handleTodoEdit, handleTodoDelete } = props;

  const todoCheck = (e, id) => {
    const token = localStorage.getItem("token");
    fetch(`${API_ROOT}/api/v1/todos/${id}`, {
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

  const todoDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`${API_ROOT}/api/v1/todos/${id}`, {
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
    <Fragment>
      <Divider variant="middle" />
      <ListItem todo={todo} key={todo.id} dense role={undefined}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.done}
            disableRipple
            onChange={(e) => todoCheck(e, todo.id)}
          />
        </ListItemIcon>
        <EditableText todo={todo} handleTodoEdit={handleTodoEdit} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => todoDelete(todo.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Fragment>
  );
}

export default TodoItem;
