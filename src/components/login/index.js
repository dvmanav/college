import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import FlashMessage from '../flash_message';
import Signup from '../signup';
import Home from '../home/home';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoggedIn: false,
      error: null,
      user: {
        email: null,
        password: null
      }
    };
  }
  render() {
    const {
      LoggedIn,
      error
    } = this.state;

    return (
      <div>
        {
        !LoggedIn && error!=null ?
        <FlashMessage message={error} color="red"></FlashMessage> :
        <div></div>
        }
        <h2>User Login</h2>
        <form onSubmit={(e) => {this.Login(e)}}>
          <input type="text" name="email" placeholder="Email" onChange={(e) => {this.UpdateUser(e)}} required></input>
          <br /><br />
          <input type="password" name="password" placeholder="Password" onChange={(e) => {this.UpdateUser(e)}} required></input>
          <br /><br />
          <input type="submit" value="Login"></input>
          <br /><br />
          <span>Not signed up? </span>
          <Link to="/signup">Signup</Link>
          <Route path="/signup" component={Signup} />
        </form>
      </div>
    );
  }
  UpdateUser(event) {
    const {name, value} = event.target;
    this.setState({
      user: {
         ...this.state.user,
         [name] : value
       }
   });
  }

  Login(event) {
    event.preventDefault();
    console.log(this.state.user);
    fetch(process.env.REACT_APP_NAVEEN_API_URL + '/v1/users/sign_in', {
        method: 'POST',
        headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin' : '*'
     },
        body: JSON.stringify({
          user: this.state.user
        })
      }).then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status === 200) {
            this.setState({
              LoggedIn: true,
              error: null
            })
            localStorage.setItem('user_login_token', result.token);
            alert("success");
            window.location.href='/';
          } else if (result.status != 200) {
            this.setState({
              LoggedIn: false,
              error: result.message
            })
            alert(result.message);

          }
        },
        (error) => {
          this.setState({
            LoggedIn: false,
            error: error.message
          })
          alert(error.message);
        }
      )
  }
}
export default Login;
