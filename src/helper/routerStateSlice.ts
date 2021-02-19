import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import { ReactRouter } from 'typings';


const initialState: ReactRouter.ReduxConnected<Object> = {
	params: {},
	match: {
		params: {},
		isExact: false,
		url: '',
		path: ''
	}
};

export const routerStateSlice = createSlice(

	{
		name: 'routerState',
		initialState,
		reducers: {
			update: (state: typeof initialState, action) => {
				// Redux Toolkit allows us to write "mutating" logic in reducers. It
				// doesn't actually mutate the state because it uses the Immer library,
				// which detects changes to a "draft state" and produces a brand new
				// immutable state based off those changes
				const match = action.payload as ReactRouter.match<Object>;
				state.params = match.params;
				state.match = match;
			},

		},
	}
);

export const { update } = routerStateSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const updateReduxRoute = (match: ReactRouter.match<Object>): AppThunk => dispatch => {
	dispatch(update(match));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectRouterState = (state: RootState) => state.routerState;

export const routerStateSliceReducer = routerStateSlice.reducer;
