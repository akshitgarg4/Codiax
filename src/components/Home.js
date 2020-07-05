import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import PostList from './PostList';
import FriendsList from './FriendsList';

class Home extends Component {
  render() {
    const { posts, friends, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="home">
        {/*posts  list*/}
      <PostList posts={posts} />
      {isLoggedIn && <FriendsList friends={friends} />}
    </div>
    );
  }
}

export default Home;
