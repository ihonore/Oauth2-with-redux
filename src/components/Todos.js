import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todoss.todos);
  const handleClick = (id) =>
    dispatch({
      type: 'DELETE_TODO',
      payload: id,
    });
  if (!todos || !todos.length) {
    return <p>NO TODOS</p>;
  }
  return (
    <ul>
      {todos.map((todo) => (
        <div className='list post-it'>
          <li>
            <div contenteditable='true'>{todo.label}</div>
          </li>
          <FaTimesCircle
            className='delete'
            onClick={() => handleClick(todo.id)}
          />
        </div>
      ))}
    </ul>
  );
};
export default Todos;
