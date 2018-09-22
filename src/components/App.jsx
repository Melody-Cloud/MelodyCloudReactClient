import React from 'react';
import 'assets/scss/App.scss';
import {HashRouter, Route, Switch} from 'react-router-dom';
import RegisterLayout from './RegisterLayout';
import MainScreen from "./MainScreen";

class App extends React.PureComponent {
    render() {
        return (
            <HashRouter >
                <Switch>
                    <Route exact path="/register" component={RegisterLayout} />
                    <Route exact path="/" component={MainScreen} />
                </Switch>
            </HashRouter >
        );
    }
}

export default App;
