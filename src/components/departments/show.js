import React from 'react';
class Department extends React.Component {
    constructor(props){
        super(props);
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        this.state = {error: null, isLoaded: false, department: null, id: id};

        this.deleteDepartment = this.deleteDepartment.bind(this);

        this.updateName = this.updateName.bind(this);
        this.updateHODID = this.updateHODID.bind(this);
        this.updateDepartment = this.updateDepartment.bind(this);
    }
    
    componentDidMount() {
      let id = this.state.id;

        fetch("http://localhost:3001/api/departments/"+id+"?auth=abc")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result.status.data);
              this.setState({
                isLoaded: true,
                department: result.status.data
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
        const { error, isLoaded, department } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
              <div>
              <h1>Department</h1>
            <table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>HOD ID</th>
                <th></th>
                <th></th>
              </tr>
                <tr>
                <td><input type="number" readOnly="true" value={department.id}/></td>
                <td><input type="text" placeholder={department.name} onChange={this.updateName}></input></td>
                <td><input type="number" placeholder={department.hod_id} onChange={this.updateHODID}></input></td>
                <td><button onClick={this.updateDepartment}>Update</button></td>
                <td><button onClick={this.deleteDepartment}>Delete</button></td>
              </tr>
            </table>
            <br/><br/>
            <a href="/departments">All Departments</a>
            </div>
          );
        }
    }
    updateName(event){
      this.setState({name:event.target.value});
    }
    
    updateHODID(event){
      this.setState({hod_id:event.target.value});
    }

    updateDepartment(){
      let id = this.state.id;
      fetch('http://localhost:3001/api/departments/'+id+ '?auth=ABC', {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body :JSON.stringify({
              "id" : this.state.id,
              "name" : this.state.name,
              "hod_id": this.state.hod_id

            })
        }).then(res => res.json())
        .then(
          (result) => {
              if (result.status.status==200){
                  window.location.href = 'http://localhost:3000/department/?id=' + id;
              } else if(result.status.status!=201){
                  
              }
          },
          
          (error) => {
            console.log("errrrrro");
            console.log(error);
          }
        );

    }

    deleteDepartment(){
      let id = this.state.id;
      fetch('http://localhost:3001/api/departments/'+id+ '?auth=ABC', {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'}
        }).then(res => res.json())
        .then(
          (result) => {
              if (result.status.status==200){
                  window.location.href = 'http://localhost:3000/departments'
              } else if(result.status.status!=201){
                  
              }
          },
          
          (error) => {
            console.log(error);
          }
        );
      

    }
}

export default Department;