import React from 'react';
import { Helmet } from 'react-helmet';
import Feed from '../feed';
import Story from '../story';

const App = () => {
  return (
    <div className="app">
      <Helmet>
        <title>Mjolnir App</title>
        <meta property="og:title" content="Mjolnir App" />
      </Helmet>
      App Component
      <p>bla</p>
      <Story id="1" />
      <Story id="2" />
      <Story id="3" />
      <button onClick={() => console.log('clicked!!')}>Click me</button>
      <Feed />
    </div>
  );
};

export default App;
