import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ReactRouter } from 'typings';
import {
  updateReduxRoute
} from './routerStateSlice';

export { routerStateSliceReducer, selectRouterState } from './routerStateSlice';

export function RouterState({ match }: ReactRouter.RouteComponentProps<any>) {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(updateReduxRoute(match))
    },
    [match.url]
  )

  return (
    <React.Fragment></React.Fragment>
  );
}
