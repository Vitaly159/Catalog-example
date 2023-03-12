import { useEffect } from "react";
//redux
import { useAppSelector, useAppDispatch } from "../../../hooks/hooks";
import {
  setElapsedTime,
  setIsStartGame,
  setIsGameOver,
  setMines,
  setCells,
} from "../../../reducer/reducer";
//стили
import { useStyles } from "./MenuStyles";
import { Box } from "@material-ui/core";
import StartAgainButton from "./StartAgainButton";
import Rating from "./Rating";
import Progress from "./Progress";
import Settings from "./Settings";

type Props = {
  createCellsData: (radioValue: string) => any[];
  createBombs: () => number[];
};

function Menu({ createCellsData, createBombs }: Props) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isStartGame: boolean = useAppSelector((state) => state.minesweeper.isStartGame);

  useEffect(() => {
    let timer: any;
    let count: number = 0;
    if (isStartGame === true) {
      timer = setInterval(() => {
        dispatch(setElapsedTime(count++));
      }, 1000);
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStartGame]);

  const refresh = (radioValue: string) => {
    dispatch(setCells(createCellsData(radioValue)));
    dispatch(setElapsedTime(0));
    dispatch(setIsStartGame(false));
    dispatch(setIsGameOver(false));
    dispatch(setMines(createBombs()));
  };

  return (
    <>
      <Box className={classes.blueText}>
        <StartAgainButton refresh={refresh} />
        <Rating />
      </Box>
      <Settings refresh={refresh} />
      <Progress />
    </>
  );
}

export default Menu;
