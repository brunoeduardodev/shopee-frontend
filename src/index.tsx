import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';

import {ItemsContextProvider} from './contexts/ItemsContext'
import {AuthContextProvider} from './contexts/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ItemsContextProvider>
        <Routes />
      </ItemsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);