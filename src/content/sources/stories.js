const resolve = query => {
  const { param1, param2 } = query;
  // returns url to fetch data from with app logic
  return `url`;
};

// Implement own data fetching logic
const fetch = query => {
  const data = 'bla'; 
  // Returns data fetched
  return data;
};

// Transforms data received from resolve/fetch into desired structure
const transform = (data, query) => {
  return {}; // transformed data
};

// params specify the different params in query, mostly for GUI
const params = {
  param1: 'text',
  param2: 'number'
};

export default {
  resolve,
  transform,
  params
};
