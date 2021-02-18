import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Prompt } from 'react-router-dom';
import {
  addNewTodo
} from './todoListSlice';

export function TodoListNewTodo() {

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    dispatch(addNewTodo(inputValue));
    setInputValue("");
    event.preventDefault();
  };

  const handleInput = (event: React.FormEvent<HTMLElement>) => {
    setIsEditing(true);
    setInputValue((event.target as HTMLInputElement).value)
  };

  return (
    <div>

      <Prompt when={isEditing} message="Are you sure" />

      <form noValidate autoComplete="off"
        onSubmit={handleSubmit} >
        <TextField required label="New Todo" variant="outlined"
          value={inputValue}
          onInput={handleInput}
        />
        <Button type="submit" variant="contained">Add</Button>
      </form>


    </div>
  );
}
