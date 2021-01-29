import React, { useState } from "react";

function SignInForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cfmpassword, setCfmPassword] = useState("");

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };
  const handleCfmPasswordChange = (evt) => {
    setCfmPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (password !== cfmpassword) {
      alert("passwords do not match!");
    } else {
      fetch(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          localStorage.setItem("token", data.jwt);
          props.handleLogin(data.user);
        });
      setUsername("");
      setPassword("");
    }
  };
  const formDivStyle = {
    margin: "auto",
    padding: "20px",
    width: "80%",
  };

  return (
    <div style={formDivStyle}>
      <h1>Sign Up</h1>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Username</label>
          <input
            value={username}
            onChange={handleUsernameChange}
            type="text"
            placeholder="username"
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="password"
          />
        </div>
        <div className="field">
          <label>Confirm Password</label>
          <input
            value={cfmpassword}
            onChange={handleCfmPasswordChange}
            type="password"
            placeholder="Confirm password"
          />
        </div>

        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
