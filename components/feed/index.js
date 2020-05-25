import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStories } from '../../store/actions';
import styles from './styles.module.css';

const Feed = () => {
  const dispatch = useDispatch();
  const stories = useSelector(state => state.stories);
  useEffect(() => {
    dispatch(fetchStories());
  }, []);
  return (
    <div className={styles.feed}>
      <h2>Feed</h2>
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
