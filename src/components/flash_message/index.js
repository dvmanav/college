import React from 'react';
class FlashMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {message:this.props.message, color: this.props.color, hidden:false};
    }

    render(){
        const {message, color, hidden} = this.state;
        if(hidden || message==""){
            return (
                <div></div>
            );

        } else if(!hidden && message!=""){
            return (
                <div>
                   <p style={{backgroundColor:color}}>{message}</p>
                   <button onClick={() => {this.setState({hidden:true})}}>Hide</button>
                </div>
                );
        }

    }
}
export default FlashMessage;
