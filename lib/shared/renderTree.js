import React from 'react';
import Components from '../../components';

const renderer = (tree, children) => {
  return children.map((componentId, index) => {
    if (!tree[componentId]) return null;
    const component = tree[componentId].component;
    const childrenIds = tree[componentId].children;
    const children = renderer(tree, childrenIds);
    const Component = Components[component.type];
    return (
      <Component key={index} options={component.options}>{children}</Component>
    );
  });
};

export default renderer;
