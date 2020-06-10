import React from 'react';
import { Helmet } from 'react-helmet';
import AppContext from '../../context';
import rendererTree from '../../lib/shared/renderTree';

const App = props => {
  const { page, globalContent } = props;
  const context = {
    globalContent
  };

  return (
    <AppContext.Provider value={context}>
      <Helmet>
        <title>Mjolnir App</title>
        <meta property="og:title" content="Mjolnir App" />
      </Helmet>
      {rendererTree(page.items, page.items['root'].children)}
    </AppContext.Provider>
  );
};

export default App;
