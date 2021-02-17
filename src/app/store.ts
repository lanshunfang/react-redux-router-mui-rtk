import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoListCollectionSliceReducer from '../features/todo-list-collection/todoListCollectionSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todoListCollection: todoListCollectionSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
