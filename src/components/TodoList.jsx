import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeTodo } from './TodoSlice';

const TodoList = () => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  return(
    <ul>
      {
        todos.map(todo => 
          <li key={todo.id}>
            <input className="checkbox" type='checkbox' />
            <span>{todo.text}</span>
            <span className="red" onClick={() => dispatch(removeTodo(todo.id))}>&times;</span>
          </li>
        )
      }
    </ul>
  )
}

export default TodoList;
