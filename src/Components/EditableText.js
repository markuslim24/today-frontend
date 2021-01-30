import React, { useState, Fragment } from "react";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ListItemText: {
    multiline: "true",
  },
  InputText: {
    fontSize: "14px",
  },
}));

function EditableText(props) {
  const classes = useStyles();
  const { todo, handleTodoEdit } = props;
  const [isClick, setIsClick] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const myRef = React.createRef();

  const handleBlur = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ todo: { title: title } }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        handleTodoEdit(data);
        setIsClick(false);
      });
  };

  const handleClick = () => {
    if (todo.done) {
    } else {
      setIsClick(true);
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      myRef.current.blur();
    }
  };

  return (
    <Fragment>
      {isClick ? (
        <TextField
          className={classes.InputText}
          inputRef={myRef}
          fullWidth="true"
          multiline="true"
          rowsMax="3"
          value={title}
          autoFocus="true"
          onBlur={() => handleBlur(todo.id)}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            classes: {
              input: classes.InputText,
            },
          }}
        />
      ) : (
        <ListItemText
          primary={title}
          onClick={handleClick}
          className={classes.ListItemText}
          style={{ textDecoration: todo.done ? "line-through" : "none" }}
        />
      )}
    </Fragment>
  );
}

export default EditableText;
