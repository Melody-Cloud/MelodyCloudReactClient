import 'assets/scss/App.scss';
import {HashRouter, Route, Switch} from 'react-router-dom';
import LoginLayout from './main-components/LoginLayout';
import MainScreen from './main-components/MainScreen';
import React from 'react';
import RegisterLayout from './main-components/RegisterLayout';
import TestScreen from './main-components/TestScreen';
import UploadPage from './main-components/UploadPage';

class AppRouting extends React.PureComponent {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/register" component={RegisterLayout} />
                    <Route exact path="/" component={MainScreen} />
                    <Route exact path="/test" component={TestScreen} />
                    <Route exact path="/login" component={LoginLayout} />
                    <Route exact path="/upload" component={UploadPage} />
                </Switch>
            </HashRouter>
        );
    }
}

export default AppRouting;
