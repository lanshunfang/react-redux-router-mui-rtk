import { CaseReducer, createSlice } from '@reduxjs/toolkit';

/**
 * Merge slices created by RTK createSlice
 * 
 * @description
 * 
 * For nested 
 */
type CreateSlice = typeof createSlice;
type CreateSliceParameters = Parameters<CreateSlice>;
type CreateSliceReturnType = ReturnType<CreateSlice>;

export const withNestedSlice = <T extends CreateSliceParameters[0]>(
	parentSliceParameter: T,
	getChildState: (state: any) => any,
	childSlice: CreateSliceReturnType
): T => {

	const parentName = parentSliceParameter.name;
	const childName = childSlice.name;
	if (parentName === childName) {
		throw new Error('[ERROR] The name of the child slice should not be the same as the parent slice');
	}

	const childActionNames = Object.keys(childSlice.actions);

	parentSliceParameter.extraReducers = {
		...parentSliceParameter.extraReducers,
		...childActionNames
			.map((actionName) => {
				const childAction = childSlice.actions[actionName];
				return {
					name: actionName,
					type: childAction.type
				};
			})
			.reduce((prev, actionObj) => {
				const reducer: CaseReducer = (state, action) => {
					const reducer: any = childSlice.caseReducers[actionObj.name]
					reducer(getChildState(state), action)
				}
				prev[actionObj.type] = reducer;
				return prev;
			}, {} as {
				[key: string]: CaseReducer
			})
	};

	return parentSliceParameter;

};

// export const combineNestedSlice = (parentSlice: CreateSlice, getChildState: (state: any) => any, childSlice: CreateSlice) => {
// 	const actionNames = Object.keys(childSlice.actions);
// 	const childReducers = actionNames.map((actionName) => {
// 		const childAction = childSlice.actions[actionName](null);
// 		const parentAction = parentSlice.actions[actionName];
// 		if (parentAction && parentAction(null).type === childAction.type) {
// 			throw new Error('[ERROR] The child slice includes conflicting actions with parent slice')
// 		}
// 		return {
// 			name: actionName,
// 			type: childAction.type
// 		}
// 	})
// 		.reduce((prev, actionObj) => {
// 			prev[actionObj.type] = (state: any, action: any) => {
// 				const reducer: any = childSlice.caseReducers[actionObj.name]
// 				reducer(getChildState(state), action)
// 			};
// 			return prev;
// 		}, {} as any);


// 	parentSlice.caseReducers = { ...parentSlice.caseReducers, childReducers }
// };