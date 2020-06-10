import React from 'react';
import useGlobalContent from '../../lib/shared/globalContent';

const Banner = () => {
  const users = useGlobalContent() || [];
  return (
    <p>There are {users.length} users registered.</p>
  );
};

export default Banner;


