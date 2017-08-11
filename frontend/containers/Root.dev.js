import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import AppContainer from './AppContainer.js';
import DevTools from './DevTools';

export default function Root({ store }) {

  const requireLogin = (nextState, replace, callback) => {
    const { user } = store.getState();
    console.log("REQUIRE LOGING USER: ", user);
    if (!user || Object.keys(user).length === 0) {
      replace('/');
    }
    callback();
  }

  return (
    <Provider store={store}>
      <div>
          <AppContainer requireLogin={requireLogin} />
          <DevTools />
      </div>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
