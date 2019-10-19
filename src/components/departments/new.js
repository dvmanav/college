import React from 'react';
class NewDepartment extends React.Component {
    constructor(props){
        super(props);

        this.state = {name: '', hod_id: 0};
        
        this.updateName = this.updateName.bind(this);
        this.updateHODID = this.updateHODID.bind(this);
        
        this.submit = this.submit.bind(this);

    }

    render(){
        return(
            <div>
                <h1>New Department</h1>
                    <input type="text" name="department[name]" id="new_department_name" placeholder="Name" onChange={this.updateName}></input><br/>
                    <input type="number" name="department[hod_id]" id="new_department_hod_id" placeholder="HOD ID" onChange={this.updateHODID}></input><br/>
                    <button id="new_department_submit" onClick={this.submit}>Add</button>
            </div>
        );
    }

    updateName(event){
        this.setState({name:event.target.value});
    }
    updateHODID(event){
        this.setState({hod_id:event.target.value});
    }

    submit(event){
        fetch('http://localhost:3001/api/departments?auth=ABC', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "name": this.state.name,
                "hod_id": this.state.hod_id
           })
        }).then(res => res.json())
        .then(
          (result) => {
              if (result.status.status==201){
                  var id = result.status.data.id;
                  window.location.href = 'http://localhost:3002/department?id=' + id;
              } else if(result.status.status==500){
                  //flash ISE 500
                  
              } else if(result.status.status==401){
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