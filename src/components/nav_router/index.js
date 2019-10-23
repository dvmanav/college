import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from '../home/home';

import Signup from '../signup';
import Login from '../login';

import AllDepartments from '../departments/index';
import Department from '../departments/show';
import NewDepartment from '../departments/new';

import Account from '../user_account';


class NavRouter extends React.Component {
  render() {
    return (
      <div>
      {
      localStorage.getItem('user_login_token') == null ?

        <Router>
        <Link to='/'>Home</Link><br />
          Please <Link to='/login'>Login</Link> to continue.
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
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
                <button onClick={(e)=>{this.Logout(e)}}>Logout</button>
              </li>
              <li>
                <Link to='/account'>My Account</Link>
              </li>
            </ul>
          </div>
          <Route exact path="/" component={Home} />

          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />

          <Route path="/departments" component={AllDepartments} />
          <Route path="/departments_new" component={NewDepartment} />
          <Route path="/department" component={Department} />

          <Router path='/account' component={Account} />
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
