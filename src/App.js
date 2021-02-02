import React, { useState, useEffect, Fragment } from "react";
import "./css/App.css";
import SignInForm from "./Components/SignInForm";
import LoginForm from "./Components/LoginForm";
import ButtonAppBar from "./Components/Navbar";
import TodoList from "./Components/TodoList";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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

function App() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`/auto_login`, {
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
    fetch(`/user_is_authed`, {
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
      {isLoggedIn ? (
        <Fragment>
          <ButtonAppBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          <TodoList />
        </Fragment>
      ) : (
        renderForm()
      )}
      {/* <button onClick={handleAuthClick}>Access Authorized Route</button> */}
    </ThemeProvider>
  );
}

export default App;
