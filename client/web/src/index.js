import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// User service worker for Progressive Web App https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
serviceWorker.register();
