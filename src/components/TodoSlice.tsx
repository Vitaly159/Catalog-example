import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

type Todo = {
  id: string,
  text: string,
  completed: boolean
}

type TodosState = {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,

  reducers:{
    addTodo(state, action: PayloadAction<string>) {
      
      state.todos.push({
        'id': uuid(),
        'text': action.payload,
        'completed': false,
      })
    },

    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
  
})

export const {addTodo, removeTodo} = todoSlice.actions;
export default todoSlice.reducer;
