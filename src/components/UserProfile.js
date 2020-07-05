import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchUserProfile } from '../actions/profile';

class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }
  checkIfUserIsAFriend = () => {
    const { match } = this.props;
    const { friends } = this.props;
    const userId = match.params.userId;
    const array = friends.map((friend) => friend.to_user._id);
    const index = array.indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  render() {
    const {
      isLoggedIn,
      match: { params },
    } = this.props;
    console.log('this.props', params);
    const user = this.props.profile.user;
    const userFriend = this.checkIfUserIsAFriend();

    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }
    if (this.props.profile.inProgress) {
      return <h1>Loading.......</h1>;
    }
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {userFriend && (
            <button className="button save-btn">Remove Friend</button>
          )}
          {!userFriend && (
            <button className="button save-btn">Add Friend</button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    friends: state.friends,
  };
}
export default connect(mapStateToProps)(UserProfile);
