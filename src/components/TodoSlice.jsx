import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuid} from 'uuid';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: []
  },

  reducers:{
    addTodo(state, action) {
      console.log(state);
      console.log(action);
      
      state.todos.push({
        'id': uuid(),
        'text': action.payload.text,
        'completed': false,
      })
    },

    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
  
})

export const {addTodo, removeTodo} = todoSlice.actions;
export default todoSlice.reducer;
