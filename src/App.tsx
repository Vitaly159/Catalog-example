import { Routes, Route } from "react-router-dom"; //роутинг(маршрутизация)
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import Game from "./components/Game";
import RecordsTable from "./components/RecordsTable/Index";

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
        <Box>
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/records" element={<RecordsTable />} />
          </Routes>
        </Box>
      </Grid>
    </Box>
  );
}

export default App;
