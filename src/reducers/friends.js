import {
  FETCH_FRIENDS_SUCCESS,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from '../actions/actionTypes';

const defaultProfileState = [];

// friends reducer
export default function friends(state = defaultProfileState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    case ADD_FRIEND:
      return action.friend;
    case REMOVE_FRIEND:
      const newArr = state.filter(
        (friend) => friend._id !== action.userId
      );
      return newArr;

    default:
      return state;
  }
}
