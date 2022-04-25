import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const TodoInput = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState();
  const handleChange = (event) => setNewTodo(event.target.value);
  const handleClick = () =>
    dispatch({
      type: 'ADD_TODO',
      payload: {
        label: newTodo,
        id: Math.ceil(Math.random() * 100),
      },
    });

  return (
    <div>
      <input type='text' value={newTodo} onChange={handleChange} />
      <Button className='addTodo' onClick={handleClick}>
        ADD TODO
      </Button>
    </div>
  );
};
export default TodoInput;
