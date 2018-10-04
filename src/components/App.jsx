import React from 'react';
import 'assets/scss/App.scss';
import {HashRouter, Route, Switch} from 'react-router-dom';
import RegisterLayout from './RegisterLayout';
import MainScreen from "./MainScreen";
import TestScreen from "./TestScreen";
import LoginLayout from "./LoginLayout";
import UploadPage from "./UploadPage";

class App extends React.PureComponent {
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

export default App;
