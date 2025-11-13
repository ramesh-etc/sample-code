import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './redux/store';
// import ClearCacheProvider from 'react-clear-cache';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(

  <Provider store={store}>
    {/* <ClearCacheProvider auto={true}> */}
    <App />
    {/* </ClearCacheProvider> */}
  </Provider>

);
