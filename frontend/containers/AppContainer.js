// import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import styles from '../assets/stylesheets/main.less';

class AppContainer extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Welcome} />
        </div>
      </BrowserRouter>
    );
  }
}

export default AppContainer;
