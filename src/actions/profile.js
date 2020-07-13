import {
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
    FETCH_USER_PROFILE,
  } from './actionTypes';
  
  export function startUserProfileFetch() {
    return {
      type: FETCH_USER_PROFILE,
    };
  }
  
  export function userProfileSuccess(user) {
    return {
      type: USER_PROFILE_SUCCESS,
      user,
    };
  }
  
  export function userProfileFailed(error) {
    return {
      type: USER_PROFILE_FAILURE,
      error,
    };
  }
  
  export function fetchUserProfile(userId) {
    return (dispatch) => {
      dispatch(startUserProfileFetch());
  
      const url = `/api/v1/users/${userId}`;
      fetch(url, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((response) => response.json())
        .then((data) => {
          dispatch(userProfileSuccess(data.data.user));
        }).catch(console.log("errrororrrrrrrrrr"));
    };
  }
  