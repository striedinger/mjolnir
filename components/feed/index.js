import React, { useState } from 'react';
import styles from './styles.module.css';
import useContent from '../../lib/shared/content';

const Feed = () => {
  const [count, setCount] = useState(0);
  const stories = useContent('stories', {});
  console.log(stories);
  return (
    <div className={styles.feed}>
      <h2>Feed</h2>
      <button onClick={() => setCount(count+1)}>Click</button>
      <span>Count: {count}</span>
    </div>
  );
};

export const loadData = () => {
  console.log('loading Data');
};

export default Feed;
