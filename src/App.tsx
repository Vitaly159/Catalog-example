import { useState } from "react";
import { useAppSelector } from "./hooks/hooks";
//стили
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
//компоненты
import Board from "./components/Board";
import Setting from "./components/Setting";

const useStyles = makeStyles({
  wrapper: {
    flexGrow: 1,
    padding: 10,
  },
});

function App() {
  const classes = useStyles();
  const [cells, setCells] = useState<any[]>([]);
  const radioValue: string = useAppSelector((state) => state.minesweeper.radioValue);

  const levels: any = {
    easy: { horizontal: 8, vertical: 8 },
    medium: { horizontal: 16, vertical: 16 },
    hard: { horizontal: 32, vertical: 16 },
  };

  const amountBombs: any = {
    easy: 10,
    medium: 40,
    hard: 100,
  };

  const createCellsData: any = (radioValue: string): any[] => {
    const arr = [];
    let i = 0;
    while (i < levels[radioValue].horizontal * levels[radioValue].vertical) {
      arr.push({
        cell: i++,
        minesAround: "",
        isBomb: false,
        isOpen: false,
        markIndex: 0,
      });
    }

    return arr;
  };

  const createBombs = (): number[] => {
    const bombs = [];
    while (bombs.length < amountBombs[radioValue]) {
      var r = Math.floor(Math.random() * levels[radioValue].horizontal * levels[radioValue].vertical) + 0;
      if (bombs.indexOf(r) === -1) bombs.push(r);
    }

    return bombs;
  };

  return (
    <Box className={classes.wrapper}>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Box>
          <Setting cells={cells} createCellsData={createCellsData} setCells={setCells} />
          <Board cells={cells} setCells={setCells} createCellsData={createCellsData} levels={levels} createBombs={createBombs} />
        </Box>
      </Grid>
    </Box>
  );
}

export default App;
