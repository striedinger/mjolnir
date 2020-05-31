import contentProvider from '../../content';

export const FETCH_CONTENT = 'fetch_content';

export const fetchContent = (type, query = 'default') => async dispatch => {
  try {
    const { data } = await contentProvider(type, query);
    dispatch({
      type: FETCH_CONTENT,
      payload: { type, query, data }
    });
  } catch (error) {
    console.error(error);
  }
};
