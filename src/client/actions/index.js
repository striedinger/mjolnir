import fetch from 'isomorphic-unfetch';

export const FETCH_STORIES = 'fetch_stories';
export const fetchStories = () => async dispatch => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  dispatch({
    type: FETCH_STORIES,
    payload: data
  })
};
