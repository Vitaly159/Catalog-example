import { configureStore } from "@reduxjs/toolkit";
import minesweeper from "../reducer/reducer";

const store = configureStore({
  reducer: {
    minesweeper: minesweeper,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
