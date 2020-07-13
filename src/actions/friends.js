import {
  FETCH_FRIENDS_SUCCESS,
  REMOVE_FRIEND,
  ADD_FRIEND,
} from './actionTypes';

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = `/api/v1/friendship/fetch_user_friends/${userId}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchFriendsSucces(data.data.friends));
      })
      .catch(console.log('errrororrrrrrrrrr'));
  };
}

export function fetchFriendsSucces(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
