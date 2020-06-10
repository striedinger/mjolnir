import React from 'react';

const Container = props => {
  const { children } = props;
  return (
    <div>
      { children }
    </div>
  );
};

export default Container;
