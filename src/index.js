import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const router =
  <BrowserRouter>
    <App />
  </BrowserRouter>

ReactDOM.render(router, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();
// serviceWorkerRegistration.register();
