import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import FlashMessage from '../flash_message';
import Signup from '../signup';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoggedIn: false,
      error: null
    };
    this.Login = this.Login.bind(this);
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
        <form onSubmit={this.Login}>
          <input type="text" ref="email" placeholder="Email" required></input>
          <br /><br />
          <input type="password" ref="password" placeholder="Password" required></input>
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

  Login(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_NAVEEN_API_URL + '/v1/users/sign_in', {
        method: 'POST',
        body: JSON.stringify({
          "email": this.refs.email.value,
          "password": this.refs.password.value
        })
      }).then(res => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            this.setState({
              LoggedIn: true,
              error: null
            })
            localStorage.setItem('user_login_token', result.data.token);
            localStorage.setItem('user_name', result.data.name);
            localStorage.setItem('user_email', result.data.email);
            alert("Login successfull!");
            window.location.href = "/";
          } else if (result.status === 401) {
            this.setState({
              LoggedIn: false,
              error: result.message
            })

          } else {
            this.setState({
              LoggedIn: false,
              error: result.message
            })
          }
        },
        (error) => {
          this.setState({
            LoggedIn: false,
            error: error.message
          })

        }
      )
  }
}
export default Login;
