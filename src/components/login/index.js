import React from 'react';
import FlashMessage from '../flash_message';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {email: '', password:'', isLoggedIn: false, error:null, user:null};
    }
    render(){
       return (
        <div>
            <h2>User Login</h2>
            <form onSubmit={this.Login.bind(this)}>
                <input type="text" ref="email" placeholder="Email"></input>
                <br/>
                <input type="password" ref="password" placeholder="Password"></input>
                <br/>
                <a href="/signup">Signup</a><br/>   
                <input type="submit" value="Login"></input>
            </form>
        </div>
        );
    }

    Login(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API_LOGIN_URL + '/v1/users/sign_in', {
            method: 'POST', 
            body: JSON.stringify({
                "email": this.refs.email.value,
                "password" :this.refs.password.value
            })
        }).then(res => res.json())
        .then(
          (result) => {
              if (result.status === 200){
                  console.log(result);
                //   this.this.setState({isLoggedIn: false, error: null, user: result});
                //   console.log("Login successfull");
                //   window.location.href="/";

              }
              else if (result.status === 401){
                  console.log(result);
                  //this.setState({isLoggedIn: false, error: "Invalid Login credentials", user:null})

              } else {
                  console.log(result);

              }

          },
          (error) => {
              console.log(error);

          }
        )
    }
}

export default Login;