import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchUserProfile } from '../actions/profile';
import { addFriend, removeFriend } from '../actions/friends';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }

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
    console.log('userId', userId);
    console.log('friends', friends);
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };

  handleAddFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = `http://codeial.com:8000/api/v2/friendship/create_friendship?user_id=${userId}`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Added friend successfully!',
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    const { match } = this.props;
    const userId = this.props.match.params.userId;
    const url = `http://codeial.com:8000/api/v2/friendship/remove_friendship?user_id=${userId}`;

    const extra = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const response = await fetch(url, extra);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Removed friends successfully!',
      });
      this.props.dispatch(removeFriend(match.params.userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    const {
      isLoggedIn,
      match: { params },
    } = this.props;
    console.log('this.props', params);
    const user = this.props.profile.user;
    const userFriend = this.checkIfUserIsAFriend();
    const { success, error, successMessage } = this.state;

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
          { !userFriend && (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          )}
          {userFriend && (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove Friend
            </button>
          )}

          {success && (
            <div className="alert success-dailog">{successMessage}</div>
          )}
          {error && <div className="alert error-dailog">{error}</div>}
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
