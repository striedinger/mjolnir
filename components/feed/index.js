import React, { useState } from 'react';
import styles from './styles.module.css';
import useContent from '../../lib/shared/content';

const Feed = () => {
  const [count, setCount] = useState(0);
  const stories = useContent('stories', {}) || [];
  return (
    <div className={styles.feed}>
      <h2>Feed</h2>
      <button onClick={() => setCount(count+1)}>Click</button>
      <span>Count: {count}</span>
      {stories.map((story, index) => {
        return <p key={index}>{story.title}</p>
      })}
    </div>
  );
};

export default Feed;
