const resolve = query => {
  const { id } = query;
  if (!id) throw new Error('id is a required parameter');
  return `https://jsonplaceholder.typicode.com/posts/${id}`;
};

const params = {
  id: 'string'
};

export default {
  resolve,
  params
};
