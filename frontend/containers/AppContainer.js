// import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

class AppContainer extends React.Component {
    render() {
        return (
          <p>Hello!</p>
        );
    }
}

AppContainer.propTypes = {
    // responses: PropTypes.array,
    // onResponseClick: PropTypes.func
};

const mapStateToProps = (/* state */) => {
    return {
        // responses: state.responses
    };
};

const mapDispatchToProps = (/* dispatch */) => {
  //  someDispProp: /* some function that dispatches an action */
    return {
        // onResponseClick: (receiver, response) => dispatch({type: 'RESPONSE_TO_REQUEST', receiver, response})
    };
};

export default AppContainer;
