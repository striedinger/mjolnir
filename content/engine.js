import fetch from 'isomorphic-unfetch';
import serialize from 'serialize-javascript';
import stories from './sources/stories';
import story from './sources/story';
import users from './sources/users';
import mock404 from './sources/mock404';
const TTL = 60;
const sources = {
  stories,
  story,
  users,
  mock404
};

export const contentCache = {};

const isValidUrl = string => {
  const regEx = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regEx.test(string)) return true;
  return false;
};

const resolveSource = async ({ source, transform, resolve, query, options }) => {
  // Get content source resolve url
  const endpoint = resolve(query);
  if (isValidUrl(endpoint)) {
    // Fetch data with resolve url
    const response = await fetch(endpoint, typeof options === 'object' ? options : {});
    // If response is not ok, throw error with corresponding http status
    if (!response.ok) {
      const error = new Error(`${response.status} ${response.statusText}`);
      error.status = response.status;
      throw error;
    };
    try {
      const data = await response.json();
      // transform data if functon defined
      const transformedData = typeof transform === 'function' ? transform(data, query) : null;
      const resolvedData = transformedData || data;
      // Store data in cache. TODO: setting data expiration and lastModified
      const sourceCache = contentCache[source] = contentCache[source] || {};
      sourceCache[serialize(query)] = resolvedData;
      return resolvedData;
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    throw new Error(`Content source resolve does not provide valid url`);
  }
};

const contentProvider = (source, query) => {
  // Must provide content source type
  if (!source) throw new Error('Content source is required');
  const selectedSource = sources[source];
  // Content source must be registered
  if (!selectedSource) throw new Error(`Content source not found: ${source}`);
  const { resolve, transform, options, ttl = TTL } = selectedSource;
  if (!resolve || typeof resolve !== 'function') throw new Error(`Content source has no resolve method`);
  // TODO: transform implementation
  const sourceCache = contentCache[source] || {};
  return {
    type: source,
    query,
    fetched: resolveSource({ source, resolve, transform, query, options }),
    cached: sourceCache[serialize(query)],
    ttl
  };
};

export default contentProvider;
