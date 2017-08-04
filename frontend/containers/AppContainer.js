import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import UserProfile from '../pages/UserProfile';
import CommunityMarket from '../pages/CommunityMarket';
import CommunityProfile from '../pages/CommunityProfile';
import CommunitiesSearch from '../pages/CommunitiesSearch';
import styles from '../assets/stylesheets/main.less';

class AppContainer extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/temp2' exact component={Welcome} />
          <Route path='/' exact component={UserProfile} />
          <Route path='/search' exact component={CommunitiesSearch} />
          <Route path='/tt' component={CommunityMarket} />
          <Route path='/t' component={CommunityProfile} />
        </div>
      </BrowserRouter>
    );
  }
}

export default AppContainer;
