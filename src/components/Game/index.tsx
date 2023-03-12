import { useAppSelector } from "../../hooks/hooks";
import Board from "../Game/Board";
import Menu from "../../components/Game/Menu";

const Game = () => {
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

  const createCellsData = (radioValue: string): any[] => {
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
      const r =
        Math.floor(Math.random() * levels[radioValue].horizontal * levels[radioValue].vertical) + 0;
      if (bombs.indexOf(r) === -1) bombs.push(r);
    }

    return bombs;
  };

  return (
    <>
      <Menu createCellsData={createCellsData} createBombs={createBombs} />
      <Board createCellsData={createCellsData} levels={levels} createBombs={createBombs} />
    </>
  );
};

export default Game;
