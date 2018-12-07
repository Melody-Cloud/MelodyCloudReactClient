import {AppContainer} from 'react-hot-loader';
import AppRouting from 'components/AppRouting';
import React from 'react';
import ReactDOM from 'react-dom';
import createAxiosInterceptor from 'src/config/axios-interceptor';

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
createAxiosInterceptor();

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/AppRouting', () => {
        renderComponent(AppRouting);
    });
}
