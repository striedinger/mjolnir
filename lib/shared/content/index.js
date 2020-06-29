import { useEffect, useState } from 'react';
import serialize from 'serialize-javascript';
import contentProvider from '../../../content/engine';

const isClient = typeof window !== 'undefined';

const useContentClient = (source, query) => {
  const [fetchedContent, setFetchedContent] = useState();
  const sourceCache = window.__STATE__ && window.__STATE__.contentCache && window.__STATE__.contentCache[source] || {};
  const cachedContent = sourceCache[serialize(query)];
  const queryParams = Object.keys(query).map(param => {
    return `${param}=${query[param]}`;
  }).join('&');
  const queryString = Object.keys(query).length !== 0 && `?${queryParams}` || '';
  useEffect(() => {
    fetch(`/content/${source}${queryString}`)
    .then(response => response.json())
    .then(data => setFetchedContent(data))
    .catch(() => {
      setFetchedContent(undefined);
    });
  }, [serialize(query)]);
  return fetchedContent || cachedContent;
};

const useContentServer = (source, query) => {
  const { cached } = contentProvider(source, query);
  return cached;
};

const useContent = (source, query) => {
  if (isClient) {
    return useContentClient(source, query);
  } else {
    return useContentServer(source, query);
  }
};

export default useContent;
