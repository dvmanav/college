import React from 'react';
import ReactDOM from 'react-dom';

import NavRouter from './components/nav_router';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

require('dotenv').config()

ReactDOM.render(<NavRouter />, document.getElementById('root'));
//serviceWorker.unregister();
