import { createStore, compose } from 'redux';
import appReducer from '../reducers/index';
import DevTools from '../containers/DevTools';

export function configureStore(initialState) {
  return createStore(
    appReducer,
    initialState,
    compose(
        DevTools.instrument()
    )
  );
}
