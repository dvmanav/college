import React from 'react';
import FlashMessage from '../flash_message';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {name: '', email: '', password:'', date_of_birth:'', gender:'', SignedUp: false, error:null};
    }
    render(){
       return (
        <div>
            <h2>User Signup</h2>
            <form onSubmit={this.Signup.bind(this)}>

            <input type="text" ref="name" placeholder="Name"></input>
                <br/>
                <input type="text" ref="email" placeholder="Email"></input>
                <br/>
                <input type="password" ref="password" placeholder="Password"></input>
                <br/>
                <input type="date" ref="date_of_birth"></input>
                <br/>
                
                    <input type="radio" value="MALE" defaultChecked onChange={this.getGender.bind(this)} name="gender"/> Male
                    <input type="radio" value="FEMALE" onChange={this.getGender.bind(this)} name="gender"/> Female
                <br/>
                <a href="/login">Login</a><br/>   
                <input type="submit" value="Signup"></input>
            </form>
        </div>
        );
    }

    getGender(event){
        this.setState({gender: event.target.value});
    }

    Signup(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API_LOGIN_URL + '/v1/users', {
            method: 'POST', 
            body: JSON.stringify({
                "user[email]": this.refs.email.value,
                "user[password]" :this.refs.password.value,
                "user[name]" : this.refs.name.value,
                "user[date_of_birth]": this.refs.date_of_birth.value,
                "user[gender]" : this.state.gender
            })
        }).then(res => res.json())
        .then(
          (result) => {
              console.log(result);

          },
          (error) => {

          }
        )
    }
}

export default Login;