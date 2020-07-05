import { FETCH_FRIENDS_SUCCESS } from './actionTypes';

export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = `http://codeial.com:8000/api/v2/friendship/fetch_user_friends/${userId}`;
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        dispatch(fetchFriendsSucces(data.data.friends));
      });
  };
}

export function fetchFriendsSucces(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}
