import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type States = {
  elapsedTime: number;
  isStartGame: boolean;
  radioValue: string;
  mines: number[];
  isGameOver: boolean;
};

const initialState: States = {
  mines: [],
  elapsedTime: 0,
  isStartGame: false,
  radioValue: "easy",
  isGameOver: false,
};

const minesWeeperSlice = createSlice({
  name: "minesWeeper",
  initialState,

  reducers: {
    setElapsedTime(state, action: PayloadAction<number>) {
      state.elapsedTime = action.payload;
    },
    setIsStartGame(state, action: PayloadAction<boolean>) {
      state.isStartGame = action.payload;
    },
    setRadioValue(state, action: PayloadAction<string>) {
      state.radioValue = action.payload;
    },
    setMines(state, action: PayloadAction<number[]>) {
      state.mines = action.payload;
    },
    setIsGameOver(state, action: PayloadAction<boolean>) {
      state.isGameOver = action.payload;
    },
  },
});

export const { setElapsedTime, setIsStartGame, setRadioValue, setMines, setIsGameOver } = minesWeeperSlice.actions;
export default minesWeeperSlice.reducer;
