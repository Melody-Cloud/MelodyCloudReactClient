import 'assets/scss/App.scss';
import {HashRouter, Route, Switch} from 'react-router-dom';
import LoginLayout from './LoginLayout';
import MainScreen from './main-screen/MainScreen';
import React from 'react';
import RegisterLayout from './RegisterLayout';
import TestScreen from './TestScreen';
import UploadPage from './UploadPage';

class AppRouting extends React.PureComponent {
    render() {
        return (
            <HashRouter >
                <Switch>
                    <Route exact path="/register" component={RegisterLayout} />
                    <Route exact path="/" component={MainScreen} />
                    <Route exact path="/test" component={TestScreen} />
                    <Route exact path="/login" component={LoginLayout} />
                    <Route exact path="/upload" component={UploadPage} />
                </Switch>
            </HashRouter >
        );
    }
}

export default AppRouting;
