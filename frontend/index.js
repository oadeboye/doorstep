import React from 'react';
import { render } from 'react-dom';
import { configureStore } from './store/configureStore';
import Root from './containers/Root';
import { persistStore, autoRehydrate } from 'redux-persist';

const store = configureStore();

persistStore(store);

render(
  <Root store={store}/>,
  document.getElementById('root')
);
