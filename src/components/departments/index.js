import React from 'react';
import FlashMessage from '../flash_message/index';
import SearchArea from '../search_area';
class AllDepartments extends React.Component {
    constructor(props){
        super(props)
        this.state = {error: null, isLoaded: false, departments: []};
    }
    
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "departments?auth=" + process.env.REACT_APP_API_ACCESS_TOKEN)
          .then(res => res.json())
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
          
    render() {
        const { error, isLoaded, departments, id, status } = this.state;
        if (error) {
          return (<div>
                    <SearchArea location="departments"></SearchArea><br/>
                    <FlashMessage message={error.message} color="red"></FlashMessage>;
                  </div>
            );
        } else if (!isLoaded) {
          return (<div>
                    <SearchArea location="departments"></SearchArea><br/>
                    Loading...
                  </div>
           );
        } else {
          return (
              <div>
                <SearchArea location="departments"></SearchArea><br/>
                
                <h1>All Departments</h1>
                <a href="/departments_new">Add New Department</a>
                <table>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>HOD ID</th>
                    <th></th>
                  </tr>
              
                  {departments.map(department => (
                  <tr>
                    <td>{department.id} </td>
                    <td>{department.name}</td>
                    <td>{department.hod_id}</td>
                    <td><a href={"/department?id=" + department.id}>Show</a></td>
                  </tr>
                    ))}
                </table>
              </div>
            );
        }
    }
}

export default AllDepartments;