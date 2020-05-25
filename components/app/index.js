import React from 'react';
import { Helmet } from 'react-helmet';
import Feed from '../feed';

const App = () => {
  return (
    <div className="app">
      <Helmet>
        <title>Mjolnir App</title>
        <meta property="og:title" content="Mjolnir App" />
      </Helmet>
      App Component
      <p>bla</p>
      <button onClick={() => console.log('clicked!!')}>Click me</button>
      <Feed />
    </div>
  );
};

export default App;
