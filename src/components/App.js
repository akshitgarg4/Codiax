import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import Home from './Home';
import Page404 from './Page404';
import Nav from './Nav';
import settings from './Settings';
import UserProfile from './UserProfile';
import Login from './Login';
import SignUp from './Signup';
import * as jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';

//creating own private routes
const PrivateRoute = (privateProps) => {
  const { isLoggedIn, path, component: Component } = privateProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token);
      //console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { posts, auth } = this.props;
    console.log(this.props);

    return (
      <Router>
        <div>
          {/*Navbar */}
          <Nav />

          <Switch>
            {/*Routes*/}
            <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <Home {...props} posts={posts} isLoggedIn={auth.isLoggedIn} />
                );
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute
              path="/settings"
              component={settings}
              isLoggedIn={auth.isLoggedIn}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedin={auth.isLoggedin}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}
App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
