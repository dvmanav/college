import React from 'react';
import FlashMessage from '../flash_message';
import SearchArea from '../search_area';
class Home extends React.Component {
    render(){
       return (
        <div>
            <h2>Home</h2>
            {
              localStorage.getItem('user_name')!=null ?
              <h3>Welcome localStorage.getItem('user_name')!</h3> :
              <h3>Welcome Guest!</h3>
            }
        </div>
        );
    }
}
export default Home;
