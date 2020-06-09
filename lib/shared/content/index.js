import { useEffect, useState } from 'react';
import contentProvider from '../../../content/index';

const isClient = typeof window !== 'undefined';

const useContentClient = (source, query) => {
  const [fetchedContent, setFetchedContent] = useState();
  useEffect(() => {
    fetch(`/content/${source}`)
    .then(response => response.json())
    .then(data => setFetchedContent(data))
    .catch(() => {
      setFetchedContent(undefined);
    });
  }, [JSON.stringify(query)]);
  return fetchedContent;
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
