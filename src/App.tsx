import { Routes, Route } from "react-router-dom"; //роутинг(маршрутизация)
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import io from "socket.io-client";
import { useEffect } from "react";

import UserSelection from "./components/UserSelection";

const useStyles = makeStyles({
  wrapper: {
    flexGrow: 1,
    padding: 10,
  },
});

const App = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Routes>
          <Route path="/" element={<UserSelection />} />
        </Routes>
       
      </Grid>
    </Box>
  );
};

export default App;
