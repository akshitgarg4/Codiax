import { FETCH_SEARCH_RESULTS_SUCCESS } from './actionTypes';


export function searchUsers(searchText) {
  return (dispatch) => {
    const url = `/api/v1/users/search?text=${searchText}`;

    fetch(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
    })
      .then((repsonse) => repsonse.json())
      .then((data) => {
        //console.log('SEARCH data', data);
        if (data.success) {
          dispatch(searchResultsSuccess(data.data.users));
        } else {
          dispatch(searchResultsSuccess([]));
        }
      });
  };
}

export function searchResultsSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users,
  };
}
