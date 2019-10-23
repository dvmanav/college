import React from 'react';
import {
  Route,
  Redirect,
  Link
} from "react-router-dom";

import FlashMessage from '../../flash_message';

import VerifyOTP from '../verify_otp'
import Login from '../login';


class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: null,
        email: null,
        password: null,
        date_of_birth: null,
        gender: null
      },
      SignedUp: '',
      error: ''
    };
  }

  render() {
    const {
      SignedUp,
      error,
      user
    } = this.state;
    if(SignedUp == "success"){
      return (
        <VerifyOTP email={user.email}/>
      );
    }
    return (
      <div>
      {
        SignedUp == "failed" ?
        <FlashMessage message = {error} color = "red"></FlashMessage> : <div></div>
      }
        <h2> User Signup </h2>
        <form onSubmit={(e) => {this.Signup(e)} }>
          <input type="text" name="name" placeholder="Name" onChange={(e) => {this.UpdateUser(e)}} required></input>
          <br /><br />
          <input type="email" name="email" placeholder="Email" onChange={(e) => {this.UpdateUser(e)}} required></input>
          <br /><br />
          <input type="password" name="password" placeholder="Password" onChange={(e) => {this.UpdateUser(e)}} required></input>
          <br /><br />
          <label for="date_of_birth">Date of Birth: </label>
          <input type="date" name="date_of_birth" onChange={(e) => {this.UpdateUser(e)}} required></input>
          <br /><br />
          <label for="gender">Gender: </label>
          <input type="radio" name="gender" value="MALE" onChange={(e) => {this.UpdateUser(e)}} name="gender" /> Male
          <input type="radio" name="gender" value="FEMALE" onChange={(e) => {this.UpdateUser(e)}} name="gender" /> Female
          <br /><br />
          <input type="submit" value="Signup"></input>
          <br /><br />
          <span>Already signed up? </span><Link to="/login">Login</Link>
          <Route path="/login" component={Login} />
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

  Signup(event) {
    event.preventDefault();
    const {user, SignedUp, error} = this.state;

    console.log(process.env.REACT_APP_NAVEEN_API_URL + '/v1/users');


    fetch(process.env.REACT_APP_NAVEEN_API_URL + '/v1/users', {
        method: 'POST',
        headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin' : '*',
       'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
       'Access-Control-Allow-Headers': '*'
     },
        body: JSON.stringify({
          user: this.state.user,
        })
      }).then(res => res.json())
      .then(
        (result) => {
          if (result.status === 201) {
            this.setState({
              SignedUp: "success",
              error: "",
            });
            alert(result.message);
          } else if (result.status != 201) {
            this.setState({
              SignedUp: "failed",
              error: result.message
            });
            alert(result.message);
          }
        },
        (error) => {
          this.setState({
            Signup: "failed",
            error: error.message
          });
          alert(error.message);
        }
      )
  }
}

export default Signup;
