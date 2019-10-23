import React from 'react';
import Search from 'react-search'
import ReactPaginate from 'react-paginate';

import FlashMessage from '../flash_message/index';
import SearchArea from '../search_area';

import './style.css'

class AllDepartments extends React.Component {
    constructor(props){
        super(props);
        console.log("d-c");
        this.state = {error: null, isLoaded: false, departments: [], start: 0, end: 9 ,status:0, paged_departments: [], sortByName: false, sortByID:false
        };

        this.sortByID = this.sortByID.bind(this);
        this.sortByName = this.sortByName.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL + "departments?auth=" + process.env.REACT_APP_API_ACCESS_TOKEN)
          .then(res => res.json())
          .then(
            (result) => {
              if (result.status.status === 200){
                let departments = [];

                for( var i=0; i< result.status.data.length; i++){
                  departments[i] = {id: result.status.data[i].id,
                                    value: result.status.data[i].name,
                                  hod_id : result.status.data[i].hod_id
                                };
                }

                this.setState({
                  status: 200,
                  isLoaded: true,
                  start: 0,
                  end: 9,
                  departments: departments,
                  paged_departments: departments.slice(0,10),
                  sortByID: true,
                  sortByName: false
                });
              }
            },

            (error) => {
              this.setState({
                isLoaded: true,
                sortByName:false,
                sortByID:false,
                error
              });
            })
          }

    render() {
      console.log("d-r");      
        const { error, isLoaded, departments, status, paged_departments, sortByID, sortByName } = this.state;
        if (error) {
          return (<div>
                    <FlashMessage message={error.message} color="red"></FlashMessage>
                  </div>
            );
        } else if (!isLoaded) {
          return (<div>
                    <SearchArea location="departments"></SearchArea><br/>
                    Loading...
                  </div>
           );
        } else if (status===200) {
          return (
              <div>
                <SearchArea location="departments"></SearchArea><br/>

                <h1>All Departments</h1>
                <a href="/departments_new">Add New Department</a>

                <Search items={departments}  placeholder="Search Departments..." onItemsChanged={this.openDepartment.bind(this)}/>
                <table>
                  <tbody>
                  <tr>
                    <th onClick={this.sortByID}>ID</th>
                    <th onClick={this.sortByName}>Name</th>
                    <th>HOD ID</th>
                    <th></th>
                  </tr>



                  {paged_departments.map(department => (
                  <tr>
                    <td>{department.id} </td>
                    <td>{department.value}</td>
                    <td>{department.hod_id}</td>
                    <td><a href={"/department?id=" + department.id}>Show</a></td>
                  </tr>
                    ))}
                    </tbody>
                </table>
                <ReactPaginate id="pagination_links"
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={this.state.end - this.state.start + 1}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                  />
              </div>
            );


        }
    }

    sortByID(){
      if(!this.state.sortByID){
        this.state.departments.sort((a, b) => (b.id > a.id));
      } else{
      this.state.departments.sort((a, b) => (a.id > b.id));
      }
      this.setState({ paged_departments: this.state.departments.slice(this.state.start, this.state.end-1), sortByID: !this.state.sortByID});
    }
    sortByName(){
      if(this.state.sortByName){
        this.state.departments.sort((a, b) => a.value.localeCompare(b.value));
      } else{
      this.state.departments.sort((a, b) => b.value.localeCompare(a.value));
      }
      this.setState({ paged_departments: this.state.departments.slice(this.state.start, this.state.end-1), sortByName: !this.state.sortByName});
    }

    handlePageClick = data => {
      let selected = data.selected;

      let start = Math.ceil(selected * 10);
      let end = start + 9;


      this.setState({ start: start, end: end, paged_departments: this.state.departments.slice(start, end-1)});
    };

    openDepartment(departments){
    }
}

export default AllDepartments;
