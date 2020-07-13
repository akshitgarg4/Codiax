import { FETCH_SEARCH_RESULTS_SUCCESS } from './actionTypes';

export function searchUsers(searchText) {
  return (dispatch) => {
    const url = `/api/v1/users/search/${searchText}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((repsonse) => repsonse.json())
      .then((data) => {
        if (data.success) {
          dispatch(searchResultsSuccess(data.data.users));
        } else {
          dispatch(searchResultsSuccess([]));
        }
      })
      .catch('errorrrr');
  };
}

export function searchResultsSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users,
  };
}
