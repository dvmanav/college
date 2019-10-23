import React from 'react';
import FlashMessage from '../flash_message/index';
class Department extends React.Component {
    constructor(props){
        super(props);

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        this.state = {error: null, isLoaded: false, department: null, id: id, status:0};

        this.deleteDepartment = this.deleteDepartment.bind(this);

        this.updateName = this.updateName.bind(this);
        this.updateHODID = this.updateHODID.bind(this);
        this.updateDepartment = this.updateDepartment.bind(this);
    }

    componentDidMount() {

      const { error, isLoaded, departments, id, status } = this.state;

        fetch(process.env.REACT_APP_API_URL + "departments/"+id + '?auth=' + process.env.REACT_APP_API_ACCESS_TOKEN)
          .then(res => res.json())
          .then(
            (result) => {
                if (result.status.status === 200){
                  this.setState({
                    isLoaded: true,
                    department: result.status.data,
                    status: result.status.status
                  });
                } else if(result.status.status === 404){
                  this.setState({
                    isLoaded: true,
                    status: result.status.status,
                    department: null
                    //say not found
                  })
                }

            },

            (error) => {
              this.setState({
                isLoaded: true,
                status: 500,
                department: null,
                error
              });
            }
          )
        }

      render() {
        const { error, isLoaded, department, id, status } = this.state;
        if (error) {
          return <FlashMessage message={error.message} color="red"></FlashMessage>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else if (department!=null){
          return (
              <div>
              <h1>Department</h1>
            <table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>HOD ID</th>
                <th></th>
              </tr>
                <tr>
                  <td>{department.id}</td>
                  <td>{department.name}</td>
                  <td>{department.hod_id}</td>
                <td><button onClick={this.deleteDepartment}>Delete</button></td>
                </tr>
                <tr>
                <td><input type="number" readOnly="true" value={department.id}/></td>
                <td><input type="text" placeholder={department.name} onChange={this.updateName}></input></td>
                <td><input type="number" placeholder={department.hod_id} onChange={this.updateHODID}></input></td>
                <td><button onClick={this.updateDepartment}>Update</button></td>
              </tr>
            </table>
            <br/><br/>
            <a href="/departments">All Departments</a>
            </div>
          );
        } else if (department==null && status == 404){
          return <FlashMessage message="Department Not Found" color="red"></FlashMessage>
        } else {
          return <FlashMessage message="Internal Server Error" color="red"></FlashMessage>
        }
    }
    updateName(event){
      this.setState({name:event.target.value});
    }

    updateHODID(event){
      this.setState({hod_id:event.target.value});
    }

    updateDepartment(){
      let yes = window.confirm("Are you sure? Update?");
      if (!yes){

      } else if(yes){
        let id = this.state.id;
      fetch(process.env.REACT_APP_API_URL+'departments/'+id, {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body :JSON.stringify({
              "auth": process.env.REACT_APP_API_MODIFY_TOKEN,
              "id" : this.state.id,
              "name" : this.state.name,
              "hod_id": this.state.hod_id

            })
        }).then(res => res.json())
        .then(
          (result) => {
              if (result.status.status===200){
                alert("Department updated!");
                  window.location.href = '/department/?id=' + id;
                  //flash department created
              } else if(result.status.status===500){
                  //say departmnt not updated
                  alert("Unable to update department");
              }
          },

          (error) => {
            alert("Unable to update department");
            this.setState({

              isLoaded: true,
              status: 500,
              error
            });
          }
        );
      }
    }

    deleteDepartment(){
      let yes = window.confirm("Are you sure? Delete?");
      if(yes){
        let id = this.state.id;

        fetch(process.env.REACT_APP_API_URL + 'departments/'+id, {
          method: 'DELETE',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            "auth": process.env.REACT_APP_API_MODIFY_TOKEN
          })
        }).then(res => res.json())
        .then(
          (result) => {
              if (result.status.status===200){
                alert("Department deleted");
                  window.location.href = '/departments';
                  //flash department deleted
              } else if(result.status.status===500){
                alert("Unable to delete department");
                  //unable to delete department
              }
          },

          (error) => {
            alert("Unable to delete department " + error.message);
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }
  }
}

export default Department;
