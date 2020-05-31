import { FETCH_CONTENT } from '../actions';

export default (state = {}, action) => {
  const { payload: { type, query, data } = {}, type: actionType } = action;
  switch(actionType) {
    case FETCH_CONTENT:
      return {
        ...state,
        [type]: {
          ...state[type],
          [JSON.stringify(query)]: {
            data
          }
        }
      };
    default:
      return state;
  }
};
