import 'core-js/shim';
import 'core-js/es7/reflect';

import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import App from 'views/app';
import { Provider } from 'mobx-react';
import AppState from 'store/appState';

const root = document.getElementById('app-root');


const hotRender = Component => {
    const renderMethod = hydrate;
    renderMethod(
        <Provider appState={new AppState()}>
            <BrowserRouter>
                <Component />
            </BrowserRouter>
        </Provider>,
        root);
    // renderMethod(
    //     <AppContainer>
    //         <Component />
    //     </AppContainer>,
    //     root);
};
hotRender(App);

// if (module.hot) {
//     module.hot.accept('app/app', () => {
//         const NextApp = require('app/app').default;
//         hotRender(NextApp);
//     });
// }