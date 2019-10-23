import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import FlashMessage from '../../../flash_message';

class ForgotPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {error: null, PasswordReset:false, email:props.email, hide:false};
  }

  render(){
    const {PasswordReset, error, email} = this.state;
    // console.log(PasswordReset);
    // console.log(error);
    // console.log(email);
    return(
    <div>
    <br /><br />
    {
      !PasswordReset && error!=null ?
      <FlashMessage message={error} color="red" /> : null
    }
    {
      PasswordReset ?
      <FlashMessage message={"New password is sent to " + email + ". Please login with new password"} color="green" /> : <div></div>
    }
    <form onSubmit={(e) => {this.ResetPassword(e)}}>
    <label>Forgot Password</label>
    <br />
    <input type="email" required name="email" value={email} placeholder="Email" onChange={(e) => {this.setState({email: e.target.value})}} />
    <br /><br />
    <input type="submit" value="Reset Password" />
    </form>
    <br />
    </div>
  );
  }

  ResetPassword(event){
    event.preventDefault();
    const {error, PasswordReset, email} = this.state;

    fetch(process.env.REACT_APP_NAVEEN_API_URL +  '/v1/reset_password', {
      method: 'POST',
      headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin' : '*',
     'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
     'Access-Control-Allow-Headers': '*'
   },
      body: JSON.stringify({
        "email" : email
      })
    }).then(res => res.json())
    .then(
      (result) => {
        if (result.status ===200){
          this.setState({
            PasswordReset: true,
            error: null
          })
        } else if(result.status != 200){
          this.setState({
            PasswordReset: false,
            error: result.message
          })
        }
      },
      (error) => {
        this.setState({
          PasswordReset: false,
          error: error.message
        })
      }
    );
  }
}

export default ForgotPassword;
