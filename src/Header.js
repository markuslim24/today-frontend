import React from "react";

const headerStyle = {
  background: "black",
  height: "15vh",
  // lineHeight: "15vh"
};
function Header(props) {
  return (
    <div className="App-header">
      <h1 style={{ color: "white" }}>JWT Auth Setup</h1>
      <button
        className="ui button"
        onClick={() => props.handleFormSwitch("signUp")}
      >
        Sign Up
      </button>
      <button
        className="ui button"
        onClick={() => props.handleFormSwitch("login")}
      >
        Log In
      </button>
    </div>
  );
}

export default Header;
