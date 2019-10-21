import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/home/home';
import About from './components/about/about';
import SearchArea from './components/search_area/index';

import AllDepartments from './components/departments/index';
import Department from './components/departments/show';
import NewDepartment from './components/departments/new';

import Login from './components/login';
import Signup from './components/signup';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

require('dotenv').config()

const router = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/departments">Departments</Link>
        </li>
        <li>
        {
          localStorage.getItem('user_login_token')!=null ?
          <button onClick={() => {localStorage.removeItem('user_login_token')}}>Logout</button> :
          <Link to="/login">Login</Link>
        }
        </li>
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />

      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />

      <Route path="/departments" component={AllDepartments} />
      <Route path="/departments_new" component={NewDepartment} />
      <Route path="/department" component={Department} />

    </div>
  </Router>
)
ReactDOM.render(router, document.getElementById('root'));
//serviceWorker.unregister();
