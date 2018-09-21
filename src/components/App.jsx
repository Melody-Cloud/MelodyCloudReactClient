import React from 'react';
import 'assets/scss/App.scss';
import {HashRouter, Route} from 'react-router-dom';
import RegisterLayout from './RegisterLayout';

class App extends React.PureComponent {
    render() {
        return (
            <HashRouter >
                <Route exact path="/register" component={RegisterLayout} />
            </HashRouter >
        );
    }
}

export default App;
