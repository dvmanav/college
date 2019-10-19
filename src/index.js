import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/home/home';
import About from './components/about/about';

import AllDepartments from './components/departments/index';
import Department from './components/departments/show';
import NewDepartment from './components/departments/new';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


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
      </ul>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/departments" component={AllDepartments} />
      <Route path="/department" component={Department} />
      <Route path="/departments_new" component={NewDepartment} />

    </div>
  </Router>
)

ReactDOM.render(router, document.getElementById('root'))


//serviceWorker.unregister();
