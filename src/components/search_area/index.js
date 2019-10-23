import React from 'react';
import PropTypes from 'prop-types'
class SearchArea extends React.Component {
    constructor(props){
        super(props);
        this.state = {isLoaded:false, error:null, departments:null, location:this.props.location}

        this.departmentForm = this.departmentForm.bind(this);
    }
    render(){
        const {isLoaded, error, departments, location} =this.state;
        return (
            <div>
                {(() => {
                    switch(location) {
                        case 'departments':
                            return (<form id="search_form" onSubmit={this.departmentForm}>
                                        <input type="text" placeholder="Search by name." ref="search_name"></input>
                                        <input type="text" placeholder="Search by HOD ID" ref="search_hod_id"></input>
                                        <input type="submit" value="Search"></input>
                                    </form> );
                        case 'home':
                            return (<form id="search_form" onSubmit={this.homeForm}>
                                        <input type="text" placeholder="Search Home" ref="search_home"></input>
                                        <input type="submit" value="Search"></input>
                                    </form>
                            );
                        case 'about':
                            return;
                        default:
                            return;
                    }
                })()}
            </div>
        );
    }
    departmentForm(event){
        event.preventDefault();
        var search_name = this.refs.search_name.value;
        var search_hod_id = this.refs.search_hod_id.value;

        fetch(process.env.REACT_APP_API_URL + 'departments/search', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "auth": process.env.REACT_APP_API_ACCESS_TOKEN,
                "search_name": search_name,
                "search_hod_id": search_hod_id
            })}).then(res => res.json())
            .then(
              (result) => {
                if (result.status.status === 200){
                  this.setState({
                    isLoaded: true,
                    departments: result.status.data
                  });
                }
              },

              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              })

    }


}

SearchArea.propTypes = {
    location: PropTypes.string.isRequired
  }

export default SearchArea;
