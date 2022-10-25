import React from 'react';
import ReactDOM from 'react-dom';
import { applyPolyfills, defineCustomElements } from 'blip-ds/loader';
import './assets/styles/app.scss';

import App from './App';

const ROOT_ID = 'root';

ReactDOM.render(<App />, document.getElementById(ROOT_ID));

applyPolyfills().then(() => {
    defineCustomElements(window);
});
