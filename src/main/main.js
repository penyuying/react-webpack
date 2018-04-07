import 'core-js/shim';
import 'core-js/es7/reflect';

import React from 'react';
import { render, hydrate } from 'react-dom';
import App from 'app/app';
// import { hot } from 'react-hot-loader';

const root = document.getElementById('app-root');

const hotRender = Component => {
    const renderMethod = module.hot ? render : hydrate;
    renderMethod(<Component />,
        root);
}

hotRender(App);

// if (module.hot) {
//     module.hot.accept('app/app', () => {
//         const NextApp = require('app/app').default;
//         hotRender(NextApp);
//     });
// }