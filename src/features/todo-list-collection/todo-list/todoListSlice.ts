import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from '@_app/store';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../typing';


const initialState: Todo.TodoList = {
  name: 'Loading list',
  todos: []
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.todos.push(action.payload as Todo.Todo);
    },
    remove: (state, action) => {
      const todoId = action.payload as string;
      state.todos = state.todos.filter(todo => todo.id !== todoId);
    },
    
  },
});

export const { add, remove } = todoListSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const addNewTodo = (label: string): AppThunk => dispatch => {
  const newTodo: Todo.Todo = {
    label,
    id: uuidv4(),
    description: ''
  };
  
  dispatch(add(newTodo));
};

export const removeATodo = (id: string): AppThunk => dispatch => {
  
  dispatch(remove({
    payload: id
  }));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectTodo = (state: RootState) => state.todoListCollection.todoLists;

// const param = useParams()
// const getId = (_, props as TodoListProps) => props.id;
// const getTodoLists = (state, props as TodoListProps) => state.todoListCollection[props.id];
// export const selectTodo = createSelector([
//   getId,
//   getTodoLists,
// ], (id, todoList) => {return todoList[id]});

export default todoListSlice.reducer;
