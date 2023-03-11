import { useStyles } from "./BoardStyles";

const Cell = ({
  cellsNumber,
  setSize,
  chooseColor,
  indexTd,
  indexTr,
  clickCell,
  clickRightMouse,
  isGameOver,
  cells,
  radioValue
}: any) => {
  const classes = useStyles();

  return (
    <td
      className={`${classes.cell} ${
        cells[cellsNumber]?.isOpen ? classes.opened : classes.closed
      } ${chooseColor(cells[cellsNumber]?.minesAround)} ${setSize(radioValue)}`}
      key={indexTd}
      my-index={cellsNumber}
      onClick={() => isGameOver === false && clickCell(indexTr, indexTd)}
      onContextMenu={(e) => isGameOver === false && clickRightMouse(e)}
    >
      {cells[cellsNumber]?.isBomb ? (
        <img
          className={classes.image}
          src="https://w1.pngwing.com/pngs/797/343/png-transparent-ship-governance-classic-minesweeper-game-business-android-government-sales-technology-thumbnail.png"
          alt="bomb"
        />
      ) : (
        cells[cellsNumber]?.minesAround !== 0 && cells[cellsNumber]?.minesAround
      )}
    </td>
  );
};

export default Cell;
