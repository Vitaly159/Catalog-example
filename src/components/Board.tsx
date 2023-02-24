import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setIsStartGame, setMines, setIsGameOver } from "../reducer/reducer";
//стили
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    flexGrow: 1,
    padding: 10,
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
    fontWeight: 600,
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
});

function Board({ cells, setCells, createCellsData, levels, createBombs }: any) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const tableRef: any = useRef();
  const mines: any[] = useAppSelector((state) => state.minesweeper.mines);
  const radioValue: string = useAppSelector((state) => state.minesweeper.radioValue);
  const isGameOver: boolean = useAppSelector((state) => state.minesweeper.isGameOver);

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

  const getCellsNumbersAround = (indexTr: number, indexTd: number) => {
    const strokes = Array(3)
      .fill(0)
      .map((el, index) =>
        tableRef?.current?.rows[indexTr - 1 + index] ? tableRef?.current?.rows[indexTr - 1 + index] : undefined
      )
      .map(
        (e: any) =>
          e && [
            e.cells[indexTd - 1] ? e.cells[indexTd - 1].getAttribute("my-index") : undefined,
            e.cells[indexTd].getAttribute("my-index"),
            e.cells[indexTd + 1] ? e.cells[indexTd + 1].getAttribute("my-index") : undefined,
          ]
      );

    return strokes.flat(2).filter((e) => e && e);
  };

  const clickBomb = (clickedCell: number): void => {
    let copy: any = Object.assign([], cells);

    mines.forEach(mine => {
      copy[mine] = {
        ...cells[mine],
        isOpen: true,
        isBomb: true,
      };
      
    })
    setCells(copy);
    dispatch(setIsStartGame(false));
    dispatch(setIsGameOver(true));
  };

  const clickСellAroundBomb = (clickedCell: number, indexTr: number, indexTd: number): void => {
    let copy: any = Object.assign([], cells);
    copy[clickedCell] = {
      ...cells[clickedCell],
      isOpen: true,
      markIndex: 0,
      minesAround: mines?.filter((x) => getCellsNumbersAround(indexTr, indexTd).includes(String(x))).length,
    };
    setCells(copy);
  };

  const openCellsAround = (indexTr: number, indexTd: number, amountBombsAround: any): void => {

    [...tableRef?.current?.rows].forEach((el, indexStroke) => {
      [...el.cells].forEach((e, indexCell) => {
        if (!Object.keys(amountBombsAround).includes(String(e.getAttribute("my-index")))) {
          if (getCellsNumbersAround(indexTr, indexTd).includes(e.getAttribute("my-index"))) {
            amountBombsAround[e.getAttribute("my-index")] = mines?.filter((x) =>
              getCellsNumbersAround(indexStroke, indexCell).includes(String(x))
            ).length;

            if (mines?.filter((x) => getCellsNumbersAround(indexStroke, indexCell).includes(String(x))).length > 0) {
              return;
            } else {
              openCellsAround(indexStroke, indexCell, amountBombsAround);
            }
          }
        }
      });
    });

    setCells(
      cells.map((cell: any, index: number) =>
        amountBombsAround[index] >= 0
          ? {
              ...cell,
              isOpen: true,
              minesAround: amountBombsAround[index],
              markIndex: 0,
            }
          : cell
      )
    );
  };

  const clickCell = (indexTr: number, indexTd: number) => {
    const clickedCell: number = tableRef?.current?.rows[indexTr]?.cells[indexTd].getAttribute("my-index");

    if (!cells[clickedCell].isOpen) {
      dispatch(setIsStartGame(true));

      if (mines?.includes(Number(clickedCell))) {
        clickBomb(clickedCell); //результат нажатия на бомбу
      } else if (mines?.filter((x) => getCellsNumbersAround(indexTr, indexTd).includes(String(x))).length) {
        clickСellAroundBomb(clickedCell, indexTr, indexTd); //результат нажатия на ячейку рядом с бомбой
      } else {
        openCellsAround(indexTr, indexTd, {}); //открываем соседние ячейки - рекурсия
      }
    }
  };

  useEffect(() => {
    dispatch(setMines(createBombs()));
    setCells(createCellsData(radioValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setMines(createBombs()));
    setCells(createCellsData(radioValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioValue]);

  const clickRightMouse = (e: any): void => {
    e.preventDefault();
    const cellIndex = e.target.getAttribute("my-index");

    let cell = cells[cellIndex];

    if (cell.isOpen === false) {
      const index = cell.markIndex < 2 ? cell.markIndex + 1 : 0;

      const marks = [
        <span my-index={cellIndex}></span>,
        <span my-index={cellIndex}>?</span>,
        <span my-index={cellIndex}>!</span>,
      ];

      let copy: any = Object.assign([], cells);
      copy[cellIndex] = {
        ...cell,
        minesAround: marks[index],
        markIndex: index,
      };
      setCells(copy);
    }
  };

  let cellsNumber = 0; //порядковый номер ячейки с нуля

  return (
    <>
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
                          cells[cellsNumber]?.isOpen ? classes.opened : classes.closed
                        } ${chooseColor(cells[cellsNumber]?.minesAround)}`}
                        style={{
                          width: cellSize[radioValue],
                          height: cellSize[radioValue],
                          fontSize: fontSize[radioValue],
                        }}
                        key={indexTd}
                        my-index={cellsNumber++}
                        onClick={() => isGameOver === false && clickCell(indexTr, indexTd)}
                        onContextMenu={(e) => {
                          if (isGameOver === false) {
                            clickRightMouse(e);
                            dispatch(setIsStartGame(true));
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
                          cells[cellsNumber - 1]?.minesAround !== 0 && cells[cellsNumber - 1]?.minesAround
                        )}
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </Box>
    </>
  );
}

export default Board;
