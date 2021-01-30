import React, { useState, useEffect } from "react";
import "./App.css";
import SignInForm from "./SignInForm";
import LoginForm from "./LoginForm";
import ButtonAppBar from "./Navbar";
import TodoList from "./TodoList";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#E9ECEF",
    },
    primary: {
      main: "#212529",
    },
    secondary: {
      main: "#E9ECEF",
    },
  },
});

const useStyles = makeStyles({
  App: {
    justify: "center",
    margin: "auto",
  },
});

function App() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [form, setForm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUser(data);
          setIsLoggedIn(true);
        });
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const handleFormSwitch = (input) => {
    setForm(input);
  };

  const handleAuthClick = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/user_is_authed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  };

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const renderForm = () => {
    switch (form) {
      case "signUp":
        return (
          <SignInForm
            handleLogin={handleLogin}
            handleFormSwitch={handleFormSwitch}
          />
        );
        break;
      default:
        return (
          <LoginForm
            handleLogin={handleLogin}
            handleFormSwitch={handleFormSwitch}
          />
        );
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ButtonAppBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      {isLoggedIn ? <TodoList /> : renderForm()}
      <button onClick={handleAuthClick}>Access Authorized Route</button>
    </ThemeProvider>
  );
}

export default App;
