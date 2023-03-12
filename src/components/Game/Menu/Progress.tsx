import { useAppSelector } from "../../../hooks/hooks";
import { useStyles } from "./MenuStyles";
import { Box } from "@material-ui/core";

const Progress = () => {
  const classes = useStyles();
  const mines: any[] = useAppSelector((state) => state.minesweeper.mines);
  const cells: any[] = useAppSelector((state) => state.minesweeper.cells);
  const elapsedTime: number = useAppSelector((state) => state.minesweeper.elapsedTime);
  const flags = cells.reduce(
    (count: number, { markIndex }: any): number => (markIndex > 0 ? count + 1 : count),
    0
  );

  return (
    <Box className={classes.gameInfo}>
      <span className={classes.marginRight20}>
        <b>Флаги</b>: {mines.length - flags}
      </span>
      <span className={classes.timer}>
        <b>Время</b>: {elapsedTime} сек.
      </span>
    </Box>
  );
}

export default Progress;
