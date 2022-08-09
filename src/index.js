import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './GlobalStyles.js';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store} from './state/store';
import Images from './images';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles imageBackground={Images.background.imageBackgroundMain}/>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
