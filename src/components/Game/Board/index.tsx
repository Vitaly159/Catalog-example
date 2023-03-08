import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  setIsStartGame,
  setMines,
  setIsGameOver,
  setCells,
  setPlayers,
  setElapsedTime,
} from "../../../reducer/reducer";
//стили
import { Box } from "@material-ui/core";
import { useStyles } from "./BoardStyles";

type Props = {
  createCellsData: (radioValue: string) => any[];
  createBombs: () => number[];
  levels: any;
};

const Board = ({ createCellsData, levels, createBombs }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const tableRef: any = useRef();
  const mines: any[] = useAppSelector((state) => state.minesweeper.mines);
  const cells: any[] = useAppSelector((state) => state.minesweeper.cells);
  const radioValue: any = useAppSelector((state) => state.minesweeper.radioValue);
  const isGameOver: boolean = useAppSelector((state) => state.minesweeper.isGameOver);
  const elapsedTime: number = useAppSelector((state) => state.minesweeper.elapsedTime);
  const players: any[] = useAppSelector((state) => state.minesweeper.players);
  const flags = cells.reduce(
    (count: number, { markIndex }: any): number => (markIndex > 0 ? count + 1 : count),
    0
  );

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

  const chooseColor = (value: number) => colors[value];

  const getCellsNumbersAround = (indexTr: number, indexTd: number): any[] => {
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
            e.cells[indexTd - 1] ? e.cells[indexTd - 1].getAttribute("my-index") : undefined,
            e.cells[indexTd].getAttribute("my-index"),
            e.cells[indexTd + 1] ? e.cells[indexTd + 1].getAttribute("my-index") : undefined,
          ]
      );

    return strokes.flat(2).filter((e) => e && e);
  };

  const clickBomb = (): void => {
    let copy: any = Object.assign([], cells);

    mines.forEach((mine) => {
      copy[mine] = {
        ...cells[mine],
        isOpen: true,
        isBomb: true,
      };
    });
    dispatch(setCells(copy));
    dispatch(setIsStartGame(false));
    dispatch(setIsGameOver(true));
  };

  const clickСellAroundBomb = (clickedCell: number, indexTr: number, indexTd: number): void => {
    let copy: any[] = Object.assign([], cells);
    copy[clickedCell] = {
      ...cells[clickedCell],
      isOpen: true,
      markIndex: 0,
      minesAround: mines?.filter((x) => getCellsNumbersAround(indexTr, indexTd).includes(String(x)))
        .length,
    };
    dispatch(setCells(copy));
  };

  const openCellsAround = (indexTr: number, indexTd: number, amountBombsAround: any): void => {
    [...tableRef?.current?.rows].forEach((el, indexStroke) => {
      [...el.cells].forEach((e, indexCell) => {
        if (!Object.keys(amountBombsAround).includes(String(e.getAttribute("my-index")))) {
          if (getCellsNumbersAround(indexTr, indexTd).includes(e.getAttribute("my-index"))) {
            amountBombsAround[e.getAttribute("my-index")] = mines?.filter((x) =>
              getCellsNumbersAround(indexStroke, indexCell).includes(String(x))
            ).length;

            if (
              mines?.filter((x) =>
                getCellsNumbersAround(indexStroke, indexCell).includes(String(x))
              ).length > 0
            ) {
              return;
            } else {
              openCellsAround(indexStroke, indexCell, amountBombsAround);
            }
          }
        }
      });
    });

    dispatch(
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
      )
    );
  };

  const clickCell = (indexTr: number, indexTd: number) => {
    const clickedCell: number =
      tableRef?.current?.rows[indexTr]?.cells[indexTd].getAttribute("my-index");

    if (!cells[clickedCell].isOpen) {
      dispatch(setIsStartGame(true));

      if (mines?.includes(Number(clickedCell))) {
        clickBomb(); //результат нажатия на бомбу
      } else if (
        mines?.filter((x) => getCellsNumbersAround(indexTr, indexTd).includes(String(x))).length
      ) {
        clickСellAroundBomb(clickedCell, indexTr, indexTd); //результат нажатия на ячейку рядом с бомбой
      } else {
        openCellsAround(indexTr, indexTd, {}); //открываем соседние ячейки - рекурсия
      }
    }
  };

  useEffect(() => {
    dispatch(setMines(createBombs()));
    dispatch(setCells(createCellsData(radioValue)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const clickRightMouse = (e: any): void => {
    dispatch(setIsStartGame(true));
    e.preventDefault();
    const cellIndex = e.target.getAttribute("my-index");

    let cell = cells[cellIndex];

    if ((cell.isOpen === false && mines.length - flags > 0) || cell.markIndex > 0) {
      const index = cell.markIndex < 2 ? cell.markIndex + 1 : 0;

      const marks = ["", "?", "!"];

      let copy: any = Object.assign([], cells);
      copy[cellIndex] = {
        ...cell,
        minesAround: marks[index],
        markIndex: index,
      };
      dispatch(setCells(copy));
    }
  };

  let cellsNumber = 0; //порядковый номер ячейки с нуля

  const findClosedCellsWithoutBombs = (cell: any) =>
    cell.isOpen === false && !mines.includes(cell.cell);
  const checkIsAllCellsOpened = cells.length ? cells.some(findClosedCellsWithoutBombs) : true;

  useEffect(() => {
    if (!checkIsAllCellsOpened) {
      const gamesResult = { time: elapsedTime, level: radioValue };
      dispatch(setPlayers([gamesResult, ...players]));
      dispatch(setCells(createCellsData(radioValue)));
      dispatch(setElapsedTime(0));
      dispatch(setIsStartGame(false));
      dispatch(setIsGameOver(false));
      dispatch(setMines(createBombs()));
      alert(`Победа! Время игры: ${elapsedTime} секунд`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells]);

  const setSize = (radioValue: string) => {
    if (radioValue === "easy") return classes.easy;
    if (radioValue === "medium") return classes.medium;
    if (radioValue === "hard") return classes.hard;
  };

  return (
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
                      } ${chooseColor(cells[cellsNumber]?.minesAround)} ${setSize(radioValue)}`}
                      key={indexTd}
                      my-index={cellsNumber++}
                      onClick={() => isGameOver === false && clickCell(indexTr, indexTd)}
                      onContextMenu={(e) => isGameOver === false && clickRightMouse(e)}
                    >
                      {cells[cellsNumber - 1]?.isBomb ? (
                        <img
                          className={classes.image}
                          src="https://w1.pngwing.com/pngs/797/343/png-transparent-ship-governance-classic-minesweeper-game-business-android-government-sales-technology-thumbnail.png"
                          alt="bomb"
                        />
                      ) : (
                        cells[cellsNumber - 1]?.minesAround !== 0 &&
                        cells[cellsNumber - 1]?.minesAround
                      )}
                    </td>
                  ))}
                  
              </tr>
            ))}
        </tbody>
      </table>
    </Box>
  );
}

export default Board;
