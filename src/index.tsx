import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import MainScreen from './screens/Main/MainScreen';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <MainScreen />,
  document.getElementById('root')
);

serviceWorker.unregister();
