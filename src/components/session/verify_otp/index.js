import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import FlashMessage from '../../flash_message';

import Login from '../login';

class VerifyOTP extends React.Component {

  constructor(props){
    super(props);
    this.state = {OTP: 0, OTPverfied: false, error:null, email:props.email, OTPresent: false};
  }

  render(){
    const {OTP, OTPverfied, error, OTPresent, email} = this.state;
    if (OTPverfied){
      return(
        <Login email={email} />
      );
    }
    return(
      <div>
      {
        OTPverfied == false && error!=null ?
        <FlashMessage message={error} color="red" /> : null

      }
      {
        OTPresent == true ?
        <FlashMessage message={"OTP is sent on " + email} color="green" /> : null
      }
      <form onSubmit={(e)=>{this.ValidateOTP(e)}}>
      <input type="email" name="email" value={email} required placeholder="Email" onChange={(e) => {this.setState({email:e.target.value})}} />
      <br /><br />
      <input type="number" name="OTP" required placeholder="Enter OTP" onChange={(e) => {this.setState({OTP: e.target.value})}} />
      <br /><br />
      <input type="submit" value="Verify" />
      </form>
      <br/><br/>

      <form onSubmit={(e) => {this.ResendOTP(e)}}>
      <label>Resend OTP: </label>
      <input type="email" value={email} onChange={(e) => (this.setState({email: e.target.value}))} placeholder="Email" />
      <br/><br/>
      <input type='submit' value='Resend OTP' />

      </form>
      </div>
    );
  }

  ResendOTP(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_NAVEEN_API_URL + '/v1/users/resend_otp', {
      method: 'POST',
      headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin' : '*',
     'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
     'Access-Control-Allow-Headers': '*'
   },
      body: JSON.stringify({
        "email":this.state.email
      })
    }).then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        if(result.status===200){
          this.setState({
            OTPresent: true,
            error: null
          });
          alert(result.message);
        } else if (result.status!=200) {
          this.setState({
            OTPresent: false,
            error: result.message
          });
        }
      },
      (error) => {
        this.setState({
          OTPresent: false,
          error: error.message
        });

      }
    );
  }

  ValidateOTP(event){
    event.preventDefault();
    fetch(process.env.REACT_APP_NAVEEN_API_URL + '/v1/users/verify_otp', {
      method: 'POST',
      headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin' : '*',
     'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
     'Access-Control-Allow-Headers': '*'
   },
      body: JSON.stringify({
        "email" : this.state.email,
        "code":this.state.OTP
      })
    }).then(res => res.json())
    .then(
      (result) => {
        if(result.status===200){
          this.setState({
            OTPverfied: true,
            error: null
          });
          alert(result.message);
        } else if (result.status!=200) {
          this.setState({
            OTPverfied: false,
            error: result.message
          });
        }
      },
      (error) => {
        this.setState({
          OTPverfied: false,
          error: error.message
        });

      }
    );


  }

}

export default VerifyOTP;
