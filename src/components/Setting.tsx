import { useEffect } from "react";
//redux
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { setElapsedTime, setRadioValue, setIsStartGame, setIsGameOver } from "../reducer/reducer";
//стили
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Radio, RadioGroup } from "@material-ui/core";
import { FormControl, FormLabel, FormControlLabel } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    textAlign: "center",
    "& .MuiTypography-body1": {
      fontSize: "0.8rem",
    },
  },
  radio: {
    padding: "3px 9px",
  },
  gameInfo: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  marginRight20: {
    marginRight: 20,
  },
  refresh: {
    marginRight: 20,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
});

function Setting({ cells, createCellsData, setCells }: any) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const mines: any[] = useAppSelector((state) => state.minesweeper.mines);
  const elapsedTime: number = useAppSelector((state) => state.minesweeper.elapsedTime);
  const isStartGame: boolean = useAppSelector((state) => state.minesweeper.isStartGame);
  const radioValue: string = useAppSelector((state) => state.minesweeper.radioValue);
  const flags = cells.reduce((count: number, { markIndex }: any): number => (markIndex > 0 ? count + 1 : count), 0);

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

  const clickRadio = (e: any): void => {
    dispatch(setRadioValue(e.target.value));
    dispatch(setElapsedTime(0));
    dispatch(setIsStartGame(false));
    dispatch(setIsGameOver(false));
  };

  const refresh = () => {
    dispatch(setElapsedTime(0));
    dispatch(setIsStartGame(false));
    dispatch(setIsGameOver(false));
    setCells(createCellsData(radioValue));
  };

  return (
    <>
      <Box className={classes.wrapper}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Уровень сложности:</FormLabel>
          <RadioGroup row value={radioValue} onChange={clickRadio}>
            <FormControlLabel value={"easy"} control={<Radio className={classes.radio} />} label="Новичок" />
            <FormControlLabel value={"medium"} control={<Radio className={classes.radio} />} label="Любитель" />
            <FormControlLabel value={"hard"} control={<Radio className={classes.radio} />} label="Профессионал" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box className={classes.gameInfo}>
        <span onClick={refresh} className={classes.refresh}>
          Начать заново
        </span>
        <span className={classes.marginRight20}>
          <b>Флаги</b>: {mines.length - flags}
        </span>
        <span>
          <b>Время</b>: {elapsedTime} сек.
        </span>
      </Box>
    </>
  );
}

export default Setting;
