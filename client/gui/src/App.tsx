import React, { useState } from 'react';
import './App.css';
import { Provider, useSelector } from 'react-redux';
import {store} from "./redux/store";
import { Main } from './Main';

// This is the main part of the application that will run as soon as the cef is ready and javascript loaded
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
};

export default App;
