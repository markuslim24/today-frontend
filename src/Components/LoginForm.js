import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import { API_ROOT } from "../apiRoot";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(1),
  },
}));

function LoginForm(props) {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch(`${API_ROOT}/login`, {
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
        if (data.failure) {
          setIsAlert(true);
        } else {
          localStorage.setItem("token", data.jwt);
          props.handleLogin(data.user);
        }
      });
    setUsername("");
    setPassword("");
  };
  return (
    <Container maxWidth="xs">
      <div className={classes.root}>
        <Fade in={true} timeout={1500}>
          <Typography variant="h1" align="center">
            Today.
          </Typography>
        </Fade>
        <Fade in={true} timeout={1500}>
          <Typography variant="p" align="center">
            A minimalistic Todo List App
          </Typography>
        </Fade>
        <form className={classes.form} onSubmit={handleSubmit}>
          {isAlert ? (
            <Alert
              className={classes.alert}
              severity="error"
              onClose={() => {
                setIsAlert(false);
              }}
            >
              Invalid username or password!
            </Alert>
          ) : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            type="text"
            name="username"
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                onClick={() => props.handleFormSwitch("signUp")}
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
