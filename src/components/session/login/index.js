import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import FlashMessage from '../../flash_message';
import Signup from '../signup';
import Home from '../../home/home';
import VerifyOTP from '../verify_otp';
import ForgotPassword from './forgot_password';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoggedIn: false,
      error: null,
      user: {
        email: null,
        password: null
      },
      OTPverifyPending: false,
      ForgotPass: false
    };
  }
  render() {
    const {
      LoggedIn,
      error,
      user,
      OTPverifyPending,
      ForgotPass
    } = this.state;

    if (OTPverifyPending) {
      return(
        <VerifyOTP email={user.email} />
      );
    }

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
          <button onClick={(e) => {this.ShowForgotPassword(e)}}>Forgot Password</button>
          <br />
          <span>Not signed up? </span>
          <Link to="/signup">Signup</Link>
          <Route path="/signup" component={Signup} />
          {
            ForgotPass ?
            <div><br /><br /><ForgotPassword email={user.email} /></div> : null
          }
        </form>
      </div>
    );
  }
  ShowForgotPassword(e){
    e.preventDefault();

    this.setState({
      ForgotPass:true
    })
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
       'Access-Control-Allow-Origin' : '*',
       'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
       'Access-Control-Allow-Headers': '*'
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
          } else if (result.status === 400) { //change this
            this.setState({
              LoggedIn: false,
              error: result.message,
              OTPverifyPending: true
            })
            alert(result.message);
          } else if (result.status != 200 && result.status!= 400){ //change this
            this.setState({
              LoggedIn: false,
              error: result.message,
              OTPverifyPending: false
            })
          }
        },
        (error) => {
          this.setState({
            LoggedIn: false,
            error: error.message
          })
          alert(error.message);
        }
      );
  }
}
export default Login;
