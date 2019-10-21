import React from 'react';
import FlashMessage from '../flash_message';
import SearchArea from '../search_area';
class Home extends React.Component {
    render(){
       return (
        <div>
            <SearchArea location= "home"></SearchArea>
            <h2>Home</h2>
        </div>
        );
    }
}

export default Home;