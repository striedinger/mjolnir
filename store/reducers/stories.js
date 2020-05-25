import { FETCH_STORIES } from '../actions';

export default (state = [], action) => {
  switch(action.type) {
    case FETCH_STORIES:
      return action.payload;
    default:
      return state;
  }
};
