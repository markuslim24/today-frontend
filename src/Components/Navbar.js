import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  const renderAuthButton = () => {
    if (props.isLoggedIn) {
      return (
        <Button color="inherit" onClick={() => props.handleLogout()}>
          Logout
        </Button>
      );
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Today
          </Typography>
          {renderAuthButton()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
