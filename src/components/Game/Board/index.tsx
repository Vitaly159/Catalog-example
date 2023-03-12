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
import { Box } from "@material-ui/core";
import { useStyles } from "./BoardStyles";
import Cell from "./Cell";

type Props = {
  createCellsData: (radioValue: string) => any[];
  createBombs: () => number[];
  levels: any;
};

const Board = ({ createCellsData, levels, createBombs }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const tableRef: any = useRef();
  const tableRows = tableRef?.current?.rows;
  const mines: any[] = useAppSelector((state) => state.minesweeper.mines);
  const cells: any[] = useAppSelector((state) => state.minesweeper.cells);
  const radioValue: any = useAppSelector((state) => state.minesweeper.radioValue);
  const elapsedTime: number = useAppSelector((state) => state.minesweeper.elapsedTime);
  const players: any[] = useAppSelector((state) => state.minesweeper.players);
  const isGameOver: boolean = useAppSelector((state) => state.minesweeper.isGameOver);
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

  const setSize = (radioValue: string) => {
    if (radioValue === "easy") return classes.easy;
    if (radioValue === "medium") return classes.medium;
    if (radioValue === "hard") return classes.hard;
  };

  const getRowsAroundClickedCell = (indexTr: number) =>
    Array(3)
      .fill(0)
      .reduce(
        (arr, row, index) =>
          tableRows[indexTr - 1 + index] ? [...arr, tableRows[indexTr - 1 + index]] : arr,
        []
      );

  const getCellsAroundClickedCell = (rowsAroundClickedCell: any, indexTd: number) =>
    rowsAroundClickedCell.reduce((arr: any, e: any) => {
      const adjacentCellsInRow = [];

      adjacentCellsInRow.push(e.cells[indexTd].getAttribute("my-index"));

      e.cells[indexTd - 1] &&
        adjacentCellsInRow.push(e.cells[indexTd - 1].getAttribute("my-index"));

      e.cells[indexTd + 1] &&
        adjacentCellsInRow.push(e.cells[indexTd + 1].getAttribute("my-index"));

      return [...arr, adjacentCellsInRow].flat(2);
    }, []);

  const getCellsAroundClicked = (indexTr: number, indexTd: number): any[] => {
    const rowsAroundClickedCell = getRowsAroundClickedCell(indexTr);
    const cellsAroundClickedCell = getCellsAroundClickedCell(rowsAroundClickedCell, indexTd);

    return cellsAroundClickedCell;
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
      minesAround: mines?.filter((bomb) => getCellsAroundClicked(indexTr, indexTd).includes(String(bomb)))
        .length,
    };

    dispatch(setCells(copy));
  };

  const openCellsWithoutBombsAround = (checkedCellsWithoutBombs: any) => {
    dispatch(
      setCells(
        cells.map((cell: any, index: number) =>
          checkedCellsWithoutBombs[index] >= 0
            ? {
                ...cell,
                isOpen: true,
                minesAround: checkedCellsWithoutBombs[index],
                markIndex: 0,
              }
            : cell
        )
      )
    );
  }

  const checkCellsAround = (indexTr: number, indexTd: number, checkedCellsWithoutBombs: any): void => {
    [...tableRows].forEach((el, indexStroke) => {
      [...el.cells].forEach((e, indexCell) => {
        if (!Object.keys(checkedCellsWithoutBombs).includes(String(e.getAttribute("my-index")))) {

          if (getCellsAroundClicked(indexTr, indexTd).includes(e.getAttribute("my-index"))) {
            checkedCellsWithoutBombs[e.getAttribute("my-index")] = mines?.filter((bomb) =>
              getCellsAroundClicked(indexStroke, indexCell).includes(String(bomb))
            ).length;
            if (
              mines?.filter((bomb) =>
                getCellsAroundClicked(indexStroke, indexCell).includes(String(bomb))
              ).length > 0
            ) {              
              return;
            } else {
              checkCellsAround(indexStroke, indexCell, checkedCellsWithoutBombs);
            }
          }

        }
      });
    });

    openCellsWithoutBombsAround(checkedCellsWithoutBombs)
  };

  const chooseClickEvent = (indexTr: number, indexTd: number, clickedCell: number) => {
    if (mines?.includes(Number(clickedCell))) {
      clickBomb(); //результат нажатия на бомбу
    } else if (
      mines?.filter((bomb) => getCellsAroundClicked(indexTr, indexTd).includes(String(bomb))).length
    ) {
      clickСellAroundBomb(clickedCell, indexTr, indexTd); //результат нажатия на ячейку рядом с бомбой
    } else {
      checkCellsAround(indexTr, indexTd, {}); //открываем соседние ячейки - рекурсия
    }
  };

  const clickCell = (indexTr: number, indexTd: number) => {
    const clickedCell: number = tableRows[indexTr]?.cells[indexTd].getAttribute("my-index");

    if (!cells[clickedCell].isOpen) {
      dispatch(setIsStartGame(true));
      chooseClickEvent(indexTr, indexTd, clickedCell);
    }
  };

  const clickRightMouse = (e: any): void => {    
    dispatch(setIsStartGame(true));
    e.preventDefault();
    const cellIndex = e.currentTarget.getAttribute("my-index");
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

  const findClosedCellsWithoutBombs = (cell: any) =>
    cell.isOpen === false && !mines.includes(cell.cell);

  const checkIsAllCellsOpened = cells.length ? cells.some(findClosedCellsWithoutBombs) : true;

  let cellsNumber = 0; //порядковый номер ячейки с нуля

  const cellProps = {
    cells: cells,
    radioValue: radioValue,
    isGameOver: isGameOver,
    clickCell: clickCell,
    setSize: setSize,
    clickRightMouse: clickRightMouse,
    chooseColor: chooseColor,
  };

  useEffect(() => {
    dispatch(setMines(createBombs()));
    dispatch(setCells(createCellsData(radioValue)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

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

  return (
    <Box className={classes.tableBox}>
      <table className={classes.table} ref={tableRef}>
        <tbody>
          {Array(levels[radioValue].vertical)
            .fill(0)
            .map((line, indexTr) => (
              <tr key={indexTr}>
                {Array(levels[radioValue].horizontal)
                  .fill(0)
                  .map((cell, indexTd) => (
                    <Cell
                      {...cellProps}
                      key={cellsNumber}
                      indexTd={indexTd}
                      indexTr={indexTr}
                      cellsNumber={cellsNumber++}
                    />
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </Box>
  );
};

export default Board;
