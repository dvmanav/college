import React from 'react';
class FlashMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {message:this.props.message, color: this.props.color};
    }
    
    render(){
       return (
        <div>
           <p style={{backgroundColor:this.state.color}}>{this.state.message}</p>
        </div>
        );
    }
}
export default FlashMessage;