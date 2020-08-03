import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';

const Todo = props => {
  const [todoState, setTodoState] = useState({
    todoName: '',
    // todoList: [],
  });

  //   const [todoName, setTodoName] = useState('');
  //   const [todoList, setTodoList] = useState([]);

  const changeHandler = e => {
    // setTodoName(e.target.value);
    setTodoState({
      ...todoState,
      todoName: e.target.value,
    });
  };

  const inputRef = useRef();

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload.name);
      case 'REMOVE':
        const newList = state.slice();

        newList.splice(action.payload.id, 1);
        return newList;
      case 'SET':
        return action.payload;
      default:
        break;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    console.log('[USE_EFFECT]');
    setTimeout(() => {
      setTodoState({
        ...todoState,
        // todoList: ['ukatane', 'zeek', 'ukatane2', 'kathryn'],
      });

      dispatch({
        type: 'SET',
        payload: ['ukatane', 'zeek', 'useReducer'],
      });
    }, 1000);
    return () => {
      console.log('[clean up] ');
    };
  }, []);

  const remove = index => {
    // const newList = [...todoState.todoList];

    // newList.splice(index, 1);

    // setTodoState({
    //   ...todoState,
    //   todoList: newList,
    // });

    dispatch({
      type: 'REMOVE',
      payload: {
        id: index,
      },
    });
  };

  const addListHandler = () => {
    // setTodoState({
    //   ...todoState,
    //   todoList: todoState.todoList.concat(todoState.todoName),
    // });

    dispatch({
      type: 'ADD',
      payload: {
        // name: todoState.todoName,
        name: inputRef.current.value,
      },
    });

    // setTodoList(todoState.concat(todoName));
    // setTodoName('');
  };

  return (
    <React.Fragment>
      <input
        type='text'
        placeholder='Todo'
        ref={inputRef}
        // value={todoState.todoName}
        // onChange={changeHandler}
        style={{
          outline: 'none',
        }}
      />
      <button onClick={addListHandler}>Add</button>
      <ul>
        {todoList.map((list, i) => (
          <li key={i} onClick={remove.bind(this, i)}>
            {list}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
