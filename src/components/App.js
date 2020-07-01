import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';



class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }


  
  render() {
    console.log(this.props);
    return <div>App</div>;
  }
}



function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}



App.PropTypes={
  posts:PropTypes.array.isRequired,
};



export default connect(mapStateToProps)(App);
