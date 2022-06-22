import React, {useState} from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { addTodo } from './TodoSlice';

const InputField: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return(
    <label>
      <input className="writing" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAction}>Добавить</button>
    </label>
  );
}

export default InputField;
