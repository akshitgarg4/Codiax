import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import PostList from './PostList';

class Home extends Component {
  render() {
    const { posts, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        {/*posts  list*/}
        <PostList posts={posts} />
      </div>
    );
  }
}

export default Home;
