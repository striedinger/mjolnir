import fetch from 'isomorphic-unfetch';
import stories from './sources/stories';
import mock404 from './sources/mock404';
const TTL = 60;
const sources = {
  stories,
  mock404
};

const isValidUrl = string => {
  const regEx = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regEx.test(string)) return true;
  return false;
};

const resolveSource = async (resolve, query) => {
  // Get content source resolve url
  const endpoint = resolve(query);
  if (isValidUrl(endpoint)) {
    // Fetch data with resolve url
    const response = await fetch(endpoint);
    // If response is not 200, throw error with corresponding http status
    if (!response.ok) {
      const error = new Error(`${response.status} ${response.statusText}`);
      error.status = response.status;
      throw error;
    };
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error(`Content source resolve does not provide valid url`);
  }
};

const transformData = (transform, data, query) => {
  try {
    const transformedData = transform(data, query);
    return transformedData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const contentProvider = async (source, query) => {
  // Must provide content source type
  if (!source) throw new Error('Content source is required');
  const selectedSource = sources[source];
  // Content source must be registered
  if (!selectedSource) throw new Error(`Content source not found: ${source}`);
  const { resolve, transform, ttl = TTL } = selectedSource;
  const data = resolve && await resolveSource(resolve, query);
  if (!data) throw new Error('Content source does not resolve to valid data');
  const transformedData = transform && transformData(transform, data, query);
  return {
    type: source,
    query,
    data: transformedData || data,
    ttl
  };
};

export default contentProvider;
