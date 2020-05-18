import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { AppScreen } from './screens/App/AppScreen';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <AppScreen />,
  document.getElementById('root')
);

serviceWorker.unregister();
