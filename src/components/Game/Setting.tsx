import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//redux
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import {
  setElapsedTime,
  setRadioValue,
  setIsStartGame,
  setIsGameOver,
  setMines,
  setCells,
} from "../../reducer/reducer";
//стили
import { makeStyles } from "@material-ui/core/styles";
import { Box, Radio, RadioGroup, Button } from "@material-ui/core";
import { FormControl, FormLabel, FormControlLabel } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";

const useStyles = makeStyles({
  blueText: {
    textAlign: "center",
    textDecoration: "underline",
    color: "blue",
    cursor: "pointer",
    marginBottom: 20,
    "& >span": {
      "&:hover": {
        color: "#7676f9",
      },
    }
  },
  checkboxes: {
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
  link: {
    textDecoration: "none",
  },
  timer: {
    minWidth: 120,
  },
});

type Props = {
  createCellsData: (radioValue: string) => any[];
  createBombs: () => number[];
};

function Setting({ createCellsData, createBombs }: Props) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const mines: any[] = useAppSelector((state) => state.minesweeper.mines);
  const cells: any[] = useAppSelector((state) => state.minesweeper.cells);
  const elapsedTime: number = useAppSelector((state) => state.minesweeper.elapsedTime);
  const isStartGame: boolean = useAppSelector((state) => state.minesweeper.isStartGame);
  const radioValue: string = useAppSelector((state) => state.minesweeper.radioValue);
  const [startAgain, setStartAgain] = useState(false);
  const [open, setOpen] = useState(false);
  const flags = cells.reduce(
    (count: number, { markIndex }: any): number => (markIndex > 0 ? count + 1 : count),
    0
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickRadio = (e: any): void => {
    dispatch(setRadioValue(e.target.value));
  };

  const refresh = (): void => {
    setStartAgain(!startAgain);
  };

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

  useEffect(() => {
    dispatch(setCells(createCellsData(radioValue)));
    dispatch(setElapsedTime(0));
    dispatch(setIsStartGame(false));
    dispatch(setIsGameOver(false));
    dispatch(setMines(createBombs()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue, startAgain]);

  return (
    <>
      <Box className={classes.blueText}>
        <span onClick={refresh} className={`${classes.refresh} ${classes.blueText}`}>
          Начать заново
        </span>
        <span onClick={handleClickOpen}>Рейтинг</span>
      </Box>
      <Box className={classes.checkboxes}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Уровень сложности:</FormLabel>
          <RadioGroup row value={radioValue} onChange={clickRadio}>
            <FormControlLabel
              value={"easy"}
              control={<Radio className={classes.radio} />}
              label="Новичок"
            />
            <FormControlLabel
              value={"medium"}
              control={<Radio className={classes.radio} />}
              label="Любитель"
            />
            <FormControlLabel
              value={"hard"}
              control={<Radio className={classes.radio} />}
              label="Профессионал"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box className={classes.gameInfo}>
        <span className={classes.marginRight20}>
          <b>Флаги</b>: {mines.length - flags}
        </span>
        <span className={classes.timer}>
          <b>Время</b>: {elapsedTime} сек.
        </span>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>Внимание! Игра обнулится, продолжить?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Link to="/records" className={classes.link}>
            <Button onClick={handleClose} color="primary">
              {" "}
              Продолжить
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Setting;
