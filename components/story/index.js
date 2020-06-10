import React, { useContext } from 'react';
import styles from './styles.module.css';
import useContent from '../../lib/shared/content';
import useGlobalContent from '../../lib/shared/globalContent';
import AppContext from '../../context';

const Story = props => {
  const { options: { id } } = props;
  const story = useContent('story', { id }) || {};
  const { title, body } = story;
  if (!title || !body) return <p>Oops. Story not found.</p>
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <p>{body}</p>
    </div>
  );
};

export default Story;
