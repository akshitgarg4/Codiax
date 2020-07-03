import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import PostList from './PostList';
import Nav from './Nav';

const signup = () => {
  return <div>Sign up</div>;
};
const login = () => {
  return <div>Login</div>;
};
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    console.log(this.props);

    return (
      <Router>
        <div>
          {/*Navbar */}
          <Nav />
          <Route path="/login" component={login} />
          <Route path="/signup" component={signup} />

          {/*posts  list*/}
          <PostList posts={posts} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}
App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
