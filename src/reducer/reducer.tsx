import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAutoFreeze } from "immer";
setAutoFreeze(false);

type States = {
  elapsedTime: number;
  isStartGame: boolean;
  radioValue: string;
  mines: number[];
  isGameOver: boolean;
  cells: any[];
  players: any[];
};

const initialState: States = {
  mines: [],
  elapsedTime: 0,
  isStartGame: false,
  radioValue: "easy",
  isGameOver: false,
  cells: [],
  players: localStorage.getItem("players") ? JSON.parse(localStorage.getItem("players")!) : [],
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
    setCells(state, action: PayloadAction<any[]>) {
      state.cells = action.payload;
    },
    setPlayers(state, action: PayloadAction<any[]>) {
      state.players = action.payload;
    },
  },
});

export const { setElapsedTime, setIsStartGame, setRadioValue, setMines, setIsGameOver, setCells, setPlayers } =
  minesWeeperSlice.actions;
export default minesWeeperSlice.reducer;
