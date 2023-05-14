import { configureStore } from "@reduxjs/toolkit";
import catalog from "../reducer/reducer";

const store = configureStore({
  reducer: {
    catalog: catalog,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
