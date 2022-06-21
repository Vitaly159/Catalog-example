import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './TodoSlice';

const InputField = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

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
