import { createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'app/store';
import { withNestedSlice } from 'helper';
import { v4 as uuidv4 } from 'uuid';
import { todoListSlice } from './todo-list';
import { Todo } from './typing';

const initialState: Todo.TodoListCollection = {
  todoLists: []
};

export const todoListCollectionSlice = createSlice(
  withNestedSlice(
    {
      name: 'todoListCollection',
      initialState,
      reducers: {
        add: (state: typeof initialState, action) => {
          // Redux Toolkit allows us to write "mutating" logic in reducers. It
          // doesn't actually mutate the state because it uses the Immer library,
          // which detects changes to a "draft state" and produces a brand new
          // immutable state based off those changes
          state.todoLists.push(action.payload as Todo.TodoList);
        },
        remove: (state: typeof initialState, action) => {
          const todoListId = action.payload as string;
          state.todoLists = state.todoLists.filter(todolist => todolist.id !== todoListId);
        },

      },
    },

    (state: typeof initialState) => {
      return state.todoLists;
    },
    todoListSlice as ReturnType<typeof createSlice>
  )
);

export const { add, remove } = todoListCollectionSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const addNewList = (name: string): AppThunk => dispatch => {
  const newList: Todo.TodoList = {
    name,
    id: uuidv4(),
    todos: []
  };

  dispatch(add(newList));
};

export const removeAList = (id: string): AppThunk => dispatch => {
  dispatch(remove(id));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodoLists = (state: RootState) => state.todoListCollection.todoLists;

export const todoListCollectionSliceReducer = todoListCollectionSlice.reducer;

