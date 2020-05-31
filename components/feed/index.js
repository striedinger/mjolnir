import React, { useState } from 'react';
import styles from './styles.module.css';

const Feed = () => {
  const [count, setCount] = useState(0);
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
