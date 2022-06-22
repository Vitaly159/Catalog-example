import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { removeTodo } from './TodoSlice';

const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos.todos);
  const dispatch = useAppDispatch();

  return(
    <ul>
      {
        todos.map((todo, index) => 
          <li key={index}>
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
