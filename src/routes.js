import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import App from './components/App';
import About from './components/About';

export default () => (
  <BrowserRouter>
    <div>
      <Route path="/" component={App} />
      <Route path="/about" component={About} />
    </div>
  </BrowserRouter>
);
