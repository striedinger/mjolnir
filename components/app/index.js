import React from 'react';
import { Helmet } from 'react-helmet';
import rendererTree from '../../lib/shared/renderTree';

const App = props => {
  const { page } = props;

  return (
    <div className="app">
      <Helmet>
        <title>Mjolnir App</title>
        <meta property="og:title" content="Mjolnir App" />
      </Helmet>
      { rendererTree(page.items, page.items['root'].children) }
    </div>
  );
};

export default App;
