import {configureStore} from "@reduxjs/toolkit";
import todoReducer from '../components/TodoSlice';

export default configureStore({
  reducer: {
    todos: todoReducer,
  }
});
