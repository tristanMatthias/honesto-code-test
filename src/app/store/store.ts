import { applyMiddleware, createStore, combineReducers } from 'redux';
// tslint:disable-next-line match-default-export-name
import thunkMiddleware from 'redux-thunk';
import { reducers } from '../reducers/reducers';
import { State } from './state';


export const store = createStore<State, any, any, any>(
  // @ts-ignore
  combineReducers(reducers),
  applyMiddleware(
    thunkMiddleware
  )
);

