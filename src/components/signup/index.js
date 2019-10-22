import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import FlashMessage from '../flash_message';
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
      error
    } = this.state;
    return (
      <div>
      {
        SignedUp.localeCompare("failed") ?
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
          <input type="radio" name="gender" value="MALE" defaultChecked onChange={(e) => {this.UpdateUser(e)}} name="gender" /> Male
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
    var key=  event.target.name;
    var value =event.target.value;
    console.log(key  + " : "  +value);
    this.setState({
      user: {
        key : value
      }
    })
  }

  Signup(event) {
    event.preventDefault();
    const {user, SignedUp, error} = this.state;

    fetch(process.env.REACT_APP_NAVEEN_API_URL + '/v1/users', {
        method: 'POST',
        body: JSON.stringify({
          "user[email]": user.email,
          "user[password]": user.password,
          "user[name]": user.name,
          "user[date_of_birth]": user.date_of_birth,
          "user[gender]": user.gender
        })
      }).then(res => res.json())
      .then(
        (result) => {
          if (result.status === 201) {
            this.setState({
              SignedUp: "success",
              error: "",
            });
            alert("Signup successful");
            window.location.href = '/login';
          } else if (result.status != 201) {
            this.setState({
              SignedUp: "failed",
              error: result.message
            });
          }
        },
        (error) => {
          this.setState({
            Signup: "failed",
            error: error.message
          });
        }
      )
  }
}

export default Signup;
