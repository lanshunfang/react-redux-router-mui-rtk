import { createSelector } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ReactRouter } from 'typings';
import {
  updateReduxRoute
} from './routerStateSlice';

export { routerStateSliceReducer, selectRouterState } from './routerStateSlice';

export function RouterState({ match }: ReactRouter.RouteComponentProps) {
  const dispatch = useDispatch();
  const location = useLocation();

  // useEffect(
  //   () => {
  //     dispatch(updateReduxRoute(match))
  //   },
  //   [location]
  // )
  useSelector(
    createSelector(
      () => location,
      (location) => {
        dispatch(updateReduxRoute({ location }));
      }
    )
  );

  return (
    <React.Fragment></React.Fragment>
  );
}
