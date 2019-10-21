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
      gender: '',
      SignedUp: '',
      error: ''
    };

    this.Signup = this.Signup.bind(this);
  }

  render() {
    const {
      SignedUp,
      error
    } = this.state;
    return (
      <div>
      {
        SignedUp.localeCompare("failed")?
        <FlashMessage message = {error} color = "red"></FlashMessage> : <div></div>
      }
        <h2> User Signup </h2>
        <form onSubmit={ this.Signup }>
          <input type="text" ref="name" placeholder="Name" required></input>
          <br /><br />
          <input type="email" ref="email" placeholder="Email" required></input>
          <br /><br />
          <input type="password" ref="password" placeholder="Password" required></input>
          <br /><br />
          <label for="date_of_birth">Date of Birth: </label>
          <input type="date" ref="date_of_birth" required></input>
          <br /><br />
          <label for="gender">Gender: </label>
          <input type="radio" value="MALE" defaultChecked onChange={ this.getGender.bind(this) } name="gender" /> Male
          <input type="radio" value="FEMALE" onChange={ this.getGender.bind(this) } name="gender" /> Female
          <br /><br />
          <input type="submit" value="Signup"></input>
          <br /><br />
          <span>Already signed up? </span><Link to="/login">Login</Link>
          <Route path="/login" component={Login} />
        </form>
      </div>
    );
  }

  getGender(event) {
    this.setState({
      gender: event.target.value
    })
  }

  Signup(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_NAVEEN_API_URL + '/v1/users', {
        method: 'POST',
        body: JSON.stringify({
          "user[email]": this.refs.email.value,
          "user[password]": this.refs.password.value,
          "user[name]": this.refs.name.value,
          "user[date_of_birth]": this.refs.date_of_birth.value,
          "user[gender]": this.state.gender
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
