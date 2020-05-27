import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStories } from '../../store/actions';
import styles from './styles.module.css';

const Feed = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const stories = useSelector(state => state.stories);
  useEffect(() => {
    dispatch(fetchStories());
  }, []);
  return (
    <div className={styles.feed}>
      <h2>Feed</h2>
      <button onClick={() => setCount(count+1)}>Click</button>
      <span>Count: {count}</span>
      {stories.map((story, index) => {
        return <h3 key={index}>{story.title}</h3>
      })}
    </div>
  );
};

export const loadData = () => {
  console.log('loading Data');
};

export default Feed;
