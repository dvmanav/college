import React from 'react';
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
              console.log(process.env.REACT_APP_API_URL + "departments?auth=" + process.env.REACT_APP_API_ACCESS_TOKEN);
              console.log(result);
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
        console.log(process.env.REACT_APP_API_URL + "departments?auth=" + process.env.REACT_APP_API_ACCESS_TOKEN);
        const { error, isLoaded, departments } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
              <div>
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