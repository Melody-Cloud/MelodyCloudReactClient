import React from 'react';
import 'assets/scss/App.scss';
import { BrowserRouter } from 'react-router-dom';
import LoginLayout from './LoginLayout';

class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <LoginLayout/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
