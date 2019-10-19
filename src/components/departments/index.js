import React from 'react';
class AllDepartments extends React.Component {
    constructor(props){
        super(props)
        this.state = {error: null, isLoaded: false, departments: []};
    }
    
    componentDidMount() {
        fetch("http://localhost:3001/api/departments?auth=abc")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result);
              this.setState({
                isLoaded: true,
                departments: result.status.data
              });
            },
            
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

      render() {
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
                <td><a href={"http://localhost:3002/department?id=" + department.id}>Show</a></td>
              </tr>
              ))}
            </table>
            </div>
          );
        }
    }
}

export default AllDepartments;