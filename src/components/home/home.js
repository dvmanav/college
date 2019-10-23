import React from 'react';
import FlashMessage from '../flash_message';
import MapContainer from '../map';
import Calendar from 'react-calendar';

class Home extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        error: null
      };
    }

    render(){
      const {error} = this.state;
       return (
        <div>
            <h2>Home</h2>
            {
              localStorage.getItem('user_login_token')!=null ?
              <h3>Welcome logged in user!</h3> :
              <h3>Welcome Guest!</h3>
            }
        </div>
        );
    }
}
export default Home;
