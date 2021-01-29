import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import SignInForm from "./SignInForm";
import LoginForm from "./LoginForm";
import ButtonAppBar from "./Navbar";
import TodoList from "./TodoList";

function App() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState("");

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
        });
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
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
  };

  const renderForm = () => {
    switch (form) {
      case "signUp":
        return <SignInForm handleLogin={handleLogin} />;
        break;
      default:
        return <LoginForm handleLogin={handleLogin} />;
    }
  };
  return (
    <div>
      <ButtonAppBar
        handleFormSwitch={handleFormSwitch}
        handleLogout={handleLogout}
      />
      {renderForm()}
      <button onClick={handleAuthClick}>Access Authorized Route</button>
      <TodoList />
    </div>
  );
}

export default App;
