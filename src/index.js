import {AppContainer} from 'react-hot-loader';
import AppRouting from 'components/AppRouting';
import React from 'react';
import ReactDOM from 'react-dom';

const rootEl = document.getElementById('root');

const renderComponent = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        rootEl,
    );
};

renderComponent(AppRouting);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/AppRouting', () => {
        renderComponent(AppRouting);
    });
}
