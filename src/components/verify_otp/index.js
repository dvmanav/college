import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import FlashMessage from '../flash_message';

class VerifyOTP extends React.Component {

  constructor(){
    super();
    this.state = {OTP: 0, OTPverfied: false, error:null};
  }

  render(){
    const {OTP, OTPverfied, error} = this.state;
    if (OTPverfied){
      return(
        <Redirect to='/login' />
      );
    }
    return(
      <div>
      {
        OTPverfied == false && error!=null ?
        <FlashMessage message={error} color="red" /> : null

      }
      <form onSubmit={(e)=>{this.ValidateOTP(e)}}>
      <input type="number" name="OTP" required placeholder="Enter OTP" onChange={(e) => {this.setState({OTP: e.target.value})}} />
      <br /><br />
      <input type="submit" value="Verify" />
      </form>
      </div>
    );
  }

  ValidateOTP(event){
    event.preventDefault();
    console.log(process.env.REACT_APP_NAVEEN_API_URL + '/v1/users/verify_otp');
    console.log(this.state.OTP);
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
        "code":this.state.OTP
      })
    }).then(res => res.json())
    .then(
      (result) => {
        console.log(result);
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
