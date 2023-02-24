import { useEffect, useRef, useState } from "react";
//стили
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import { Radio, RadioGroup } from "@material-ui/core";
import { FormControl, FormLabel, FormControlLabel } from "@material-ui/core";

import "./App.css";

const useStyles = makeStyles({
  wrapper: {
    flexGrow: 1,
    padding: 10,
  },
  formControl: {
    textAlign: "center",
    "& .MuiTypography-body1": {
      fontSize: "0.8rem",
    },
  },
  table: {
    display: "inline",
    borderCollapse: "collapse",
  },
  tableBox: {
    display: "flex",
    justifyContent: "center",
  },
  cell: {
    border: "1px black solid",
    textAlign: "center",
    background: "rgb(220,220,220)",
  },
  closed: {
    cursor: "pointer",
    boxShadow: "2px 2px rgb(180,180,180)",
    "&:hover": {
      background: "rgb(240,240,240)",
    },
    "&:active": {
      background: "rgb(170,170,170)",
    },
  },
  opened: {
    background: "white",
  },
  image: {
    width: "80%",
    height: "80%",
    objectFit: "contain",
  },
  lightBlue: {
    color: "#6abafc",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  hardBlue: {
    color: "#0128f6",
  },
  brown: {
    color: "brown",
  },
  turquoise: {
    color: "#30d5c8",
  },
  black: {
    color: "black",
  },
  pink: {
    color: "pink",
  },
  cellsText: {
    fontWeight: 600,
  },
});

function App() {
  const classes = useStyles();
  const tableRef: any = useRef();
  const [mines, setMines] = useState<any[]>([]);
  const [cells, setCells] = useState<any[]>([]);

  const [startGame, setStartGame] = useState(false);
  const [sec, setSec] = useState(0);
  const [finish, setFinish] = useState(false);

  
  useEffect(() => {
    let timer: any;
    if (startGame === true) {
      timer = setInterval(() => {
        setSec((c) => c + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [startGame]);

  const colors: any = {
    1: classes.lightBlue,
    2: classes.green,
    3: classes.red,
    4: classes.hardBlue,
    5: classes.brown,
    6: classes.turquoise,
    7: classes.black,
    8: classes.pink,
  };

  const chooseColor = (value: number) => colors[value] && colors[value];

  const cellSize: any = {
    easy: "calc(3vh + 3vw)",
    medium: "calc(1.2vh + 1.2vw)",
    hard: "calc(0.8vh + 1vw)",
  };
  const fontSize: any = {
    easy: "calc(2vh + 2vw)",
    medium: "calc(1vh + 1vw)",
    hard: "calc(0.5vh + 0.6vw)",
  };

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

  const [radioValue, setRadioValue] = useState<string>("easy");

  const getCellsNumbers = (indexTr: number, indexTd: number) => {
    const strokes = Array(3)
      .fill(0)
      .map((el, index) =>
        tableRef?.current?.rows[indexTr - 1 + index]
          ? tableRef?.current?.rows[indexTr - 1 + index]
          : undefined
      )
      .map(
        (e: any) =>
          e && [
            e.cells[indexTd - 1]
              ? e.cells[indexTd - 1].getAttribute("my-index")
              : undefined,
            e.cells[indexTd].getAttribute("my-index"),
            e.cells[indexTd + 1]
              ? e.cells[indexTd + 1].getAttribute("my-index")
              : undefined,
          ]
      );

    return strokes.flat(2).filter((e) => e && e);
  };

  // const stopGame = () => {
  //   clearInterval(timer);
  //   // setSec(0)
  // };

  const isMine = (indexTr: number, indexTd: number) => {
    const clickedCell =
      tableRef?.current?.rows[indexTr]?.cells[indexTd].getAttribute("my-index");

    if (!cells[clickedCell].isOpen) {
      setStartGame(true);
      if (mines?.includes(Number(clickedCell))) {
        //есть ли мина в кликнутой ячейке?
        let copy: any = Object.assign([], cells);
        copy[clickedCell] = {
          ...cells[clickedCell],
          isOpen: true,
          isBomb: true,
        };
        setCells(copy);
        setStartGame(false);
        setFinish(true);
      } else if (
        //есть ли мина рядом?
        mines?.filter((x) =>
          getCellsNumbers(indexTr, indexTd).includes(String(x))
        ).length
      ) {
        let copy: any = Object.assign([], cells);
        copy[clickedCell] = {
          ...cells[clickedCell],
          isOpen: true,
          markIndex: 0,
          minesAround: mines?.filter((x) =>
            getCellsNumbers(indexTr, indexTd).includes(String(x))
          ).length,
        };
        setCells(copy);
      } else {
        //открываем соседние ячейки
        const test1: any = [];
        const test2: any = {};
        [...tableRef?.current?.rows].forEach((el, indexStroke) => {
          [...el.cells].forEach((e, indexCell) => {
            if (
              getCellsNumbers(indexTr, indexTd).includes(
                e.getAttribute("my-index")
              )
            ) {
              test1.push(e.getAttribute("my-index"));
              test2[e.getAttribute("my-index")] = mines?.filter((x) =>
                getCellsNumbers(indexStroke, indexCell).includes(String(x))
              ).length;
            }
          });
        });

        setCells(
          cells.map((cell, index) =>
            test1.includes(String(index))
              ? {
                  ...cell,
                  isOpen: true,
                  minesAround: test2[index] > 0 ? test2[index] : "",
                  markIndex: 0,
                }
              : cell
          )
        );
      }
    }
  };

  const createBombs = () => {
    const bombs = [];
    while (bombs.length < amountBombs[radioValue]) {
      var r =
        Math.floor(
          Math.random() *
            levels[radioValue].horizontal *
            levels[radioValue].vertical
        ) + 0;
      if (bombs.indexOf(r) === -1) bombs.push(r);
    }

    return bombs;
  };

  const createCellsData: any = (radioValue: string) => {
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

  const flags = cells.reduce((count, { markIndex }) => {
    if (markIndex > 0) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  useEffect(() => {
    setMines(createBombs());
    setCells(createCellsData(radioValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMines(createBombs());
    setCells(createCellsData(radioValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);

  const clickRadio = (e: any) => {
    setRadioValue(e.target.value);
    setSec(0);
    setStartGame(false);
  };

  let cellsNumber = 0; //порядковый номер ячейки с нуля

  const clickRightMouse = (e: any) => {
    e.preventDefault();
    let cell = cells[e.target.getAttribute("my-index")];

    if (cell.isOpen === false) {
      const index = cell.markIndex < 2 ? cell.markIndex + 1 : 0;

      const marks = [
        <span my-index={e.target.getAttribute("my-index")}></span>,
        <span my-index={e.target.getAttribute("my-index")}>?</span>,
        <span my-index={e.target.getAttribute("my-index")}>!</span>,
      ];

      let copy: any = Object.assign([], cells);
      copy[e.target.getAttribute("my-index")] = {
        ...cell,
        minesAround: marks[index],
        markIndex: index,
      };
      setCells(copy);
    }
  };

  return (
    <Box className={classes.wrapper}>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Box>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Уровень сложности</FormLabel>
              <RadioGroup row value={radioValue} onChange={clickRadio}>
                <FormControlLabel
                  value={"easy"}
                  control={<Radio style={{ padding: "3px 9px" }} />}
                  label="Новичок"
                />
                <FormControlLabel
                  value={"medium"}
                  control={<Radio style={{ padding: "3px 9px" }} />}
                  label="Любитель"
                />
                <FormControlLabel
                  value={"hard"}
                  control={<Radio style={{ padding: "3px 9px" }} />}
                  label="Профессионал"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            <span style={{ marginRight: 20 }}>
              <b>Флаги</b>: {mines.length - flags}
            </span>{" "}
            <span>
              {" "}
              <b>Время</b>: {sec} сек.
            </span>
          </Box>

          <Box>
            <Box className={classes.tableBox}>
              <table className={classes.table} ref={tableRef}>
                <tbody>
                  {Array(levels[radioValue].vertical)
                    .fill(0)
                    .map((e, indexTr) => (
                      <tr key={indexTr}>
                        {Array(levels[radioValue].horizontal)
                          .fill(0)
                          .map((el, indexTd) => (
                            <td
                              className={`${classes.cell} ${
                                cells[cellsNumber]?.isOpen
                                  ? classes.opened
                                  : classes.closed
                              } ${chooseColor(
                                cells[cellsNumber]?.minesAround
                              )} ${classes.cellsText}`}
                              style={{
                                width: cellSize[radioValue],
                                height: cellSize[radioValue],
                                fontSize: fontSize[radioValue],
                              }}
                              key={indexTd}
                              my-index={cellsNumber++}
                              onClick={() =>
                                finish === false && isMine(indexTr, indexTd)
                              }
                              onContextMenu={(e) => {
                                if (finish === false) {
                                  clickRightMouse(e);
                                  setStartGame(true);
                                }
                              }}
                            >
                              {cells[cellsNumber - 1]?.isBomb ? (
                                <img
                                  className={classes.image}
                                  src="https://grand-screen.com/uploads/pics/images/4113.jpg"
                                  alt="bomb"
                                />
                              ) : (
                                cells[cellsNumber - 1]?.minesAround
                              )}
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default App;
