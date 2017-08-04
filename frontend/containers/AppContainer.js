import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/profile" exact component={UserProfile} />
            <Route path="/search" exact component={CommunitiesSearch} />
            <Route path="/community/profile/:communityId" exact component={CommunityProfile} />
            <Route path="/community/:communityId" exact component={CommunityMarket} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppContainer;
