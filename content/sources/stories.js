// Returns constructed endpoint to fetch data from
const resolve = query => {
  // const { param1, param2 } = query
  // const url = `https://endpoint.domain/?param1=param1&param2=param2`;
  // return url;
  return 'https://jsonplaceholder.typicode.com/posts';
};

// Returns data fetched with custom logic
const fetch = query => {
  // const data = await axios.get('endpoint');
  // return data;
};

// Returns transformed data after resolve / fetch
const transform = (data, query) => {
  // return Object.keys(data).map(item => {
  //   return data[item] = `${data[item]}-copy`; 
  // });
  return data.map(item => {
    return {
      ...item,
      hello: 'world'
    };
  });
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
