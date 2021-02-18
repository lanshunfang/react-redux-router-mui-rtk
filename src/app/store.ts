import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import {
  todoListCollectionSliceReducer
} from 'features/todo-list-collection/todoListCollectionSlice';

export const store = configureStore({
  reducer: {
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
