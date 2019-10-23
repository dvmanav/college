import React from 'react';

import FlashMessage from '../flash_message';

import Calendar from 'react-calendar';

class Articles extends React.Component {
  constructor(props) {
    super(props);
    console.log("arttt---c");
    this.state = {
      date_filter: false,
      date: new Date(),
      fetched: false,
      error: null
    };
    fetch(process.env.REACT_APP_NAVEEN_API_URL + '/v1/articles').then(res => res.json()).
    then((result)=>{
      if (result.status === 200){
        this.setState({
          fetched: true,
          error: null
        });
      } else if (result.status!=200){
        this.setState({
          fetched: false,
          error: result.message
        });
      }

    }, (error) => {
      this.setState({
        fetched: false,
        error: error.message
      });
    });
  }

  DateChanged = date => {
    this.setState({
      date
    });
    fetch(process.env.REACT_APP_NAVEEN_API_URL + '/v1/get_articles', {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify({
        "date": this.state.date
      })
    }).then(res => res.json()).then(
      (result) => {
        if (result.status === 200) {
          this.setState({
            fetched: true,
            error: null
          });

        } else if (result.status != 200) {
          this.setState({
            fetched: false,
            error: result.message
          });
        }
      },
      (error) => {
        this.setState({
          fetched: false,
          error: error.message
        });
      }
    );
  }

  render() {
    console.log("arttt");
    const {
      date,
      fetched,
      date_filter,
      error
    } = this.state;

    if (date_filter){
      return(
        <div>
        </div>
      );
    } else if(!date_filter){
      return (
        <div>
        <button onClick={() => {this.setState({date_filter:true})}}>Filter by date</button>
        {
          !fetched && error!=null ?
          <FlashMessage message={error} color="red" /> : null
        }
        {
          fetched && error==null ?
          <h1>Fetched!</h1> : null
        }
        </div>
      );
    }
  }

}

export default Articles;
