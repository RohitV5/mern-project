import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

//why are we using this
import reportWebVitals from './reportWebVitals';
import ReduxStore from './store'
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ReduxStore()}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
