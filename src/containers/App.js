import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import store from '../store';

import Header from '../components/template/Header';
import Content from '../components/template/Content';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="main">
              <Header></Header>
              <Content></Content>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
