import React from 'react';
class NewDepartment extends React.Component {
    constructor(props){
        super(props);

        this.state = {name: '', hod_id: 0};
        
        this.updateName = this.updateName.bind(this);
        this.updateHODID = this.updateHODID.bind(this);
        
        this.submitNewDepartmentForm = this.submitNewDepartmentForm.bind(this);
        

    }

    render(){
        return(
            <div>
                <h1>New Department</h1>
                <form onSubmit={(e)=> {this.submitNewDepartmentForm(e)}}>
                    <input type="text" id="new_department_name" placeholder="Name" onChange={this.updateName}></input><br/>
                    <input type="number"id="new_department_hod_id" placeholder="HOD ID" onChange={this.updateHODID}></input><br/>
                    <input type="submit" value="Add"></input>
                </form>
            </div>
        );
    }

   

    updateName(event){
        this.setState({name:event.target.value});
    }
    updateHODID(event){
        this.setState({hod_id:event.target.value});
    }

    submitNewDepartmentForm(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API_URL + 'departments', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "auth": process.env.REACT_APP_API_MODIFY_TOKEN, 
                "name": this.state.name,
                "hod_id": this.state.hod_id
           })
        }).then(res => res.json())
        .then(
          (result) => {
              if (result.status.status===201){
                  var id = result.status.data.id;
                  window.location.href = 'http://localhost:3002/department?id=' + id;
              } else if(result.status.status===500){
                  //flash ISE 500
                  
              } else if(result.status.status===401){
                  //flash invalid api token
              }
          },
          
          (error) => {
              //handle error
          }
        );
    }
}

export default NewDepartment;