import { Routes, Route } from "react-router-dom"; //роутинг(маршрутизация)
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import io from "socket.io-client";
import { useEffect } from "react";


const useStyles = makeStyles({
  wrapper: {
    flexGrow: 1,
    padding: 10,
  },
});

const socket = io('http://localhost:9999');
// io('http://localhost:9999');
const App = () => {
  const classes = useStyles();
  useEffect(() => {
    socket.emit('join')
  }, [])

  return (
    <Box className={classes.wrapper}>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Box>
         привет
        </Box>
      </Grid>
    </Box>
  );
}

export default App;
