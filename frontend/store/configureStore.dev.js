import DevTools from '../containers/DevTools';
import appReducer from '../reducers/index';
import { compose, applyMiddleware, createStore } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

export function configureStore(initialState) {
  return createStore(
    appReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      autoRehydrate()
    )
  );
}