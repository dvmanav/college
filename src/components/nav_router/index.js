import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from '../home/home';

import Signup from '../session/signup';
import Login from '../session/login';

import AllDepartments from '../departments/index';
import Department from '../departments/show';
import NewDepartment from '../departments/new';

import Account from '../session/user_account';


class NavRouter extends React.Component {
  render() {
    return (
      <div>
      {
      localStorage.getItem('user_login_token') == null ?

        <Router>
        <Link to='/'>Home</Link><br />
          Please <Link to='/login'>Login</Link> to continue.
          <Route exect path="/login" component={Login} />
          <Route exect path="/signup" component={Signup} />
        </Router>
       :
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/departments">Departments</Link>
              </li>
              <li>
                <Link to='/account'>My Account</Link>
              </li>
              <li>
                <button onClick={(e)=>{this.Logout(e)}}>Logout</button>
              </li>
            </ul>
          </div>
          <Route exact path="/" component={Home} />

          <Route exect path="/signup" component={Signup} />
          <Route exect path="/login" component={Login} />

          <Route exact path="/departments" component={AllDepartments} />
          <Route exact path="/departments/new" component={NewDepartment} />
          <Route exect path="/department" component={Department} />

          <Router exect path='/account' component={Account} />
        </Router>
      }
      </div>

    );
  }
  Logout(event){
    var yes = window.confirm("Logout?");
    if (yes){
      localStorage.removeItem('user_login_token');
      window.location.href= window.location.href;
    }
  }
}

export default NavRouter;
