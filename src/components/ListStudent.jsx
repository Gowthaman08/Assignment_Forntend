import React, { Component } from 'react'
import StudentService from '../services/StudentService';
class ListStudent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Students: []
        }
        this.addStudent = this.addStudent.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        
    }

    deleteStudent(id) {
        StudentService.deleteStudent(id).then(res => {
            this.setState({ Students: this.state.Students.filter(student => student.studentId !== id) });
        });
    }
    addStudent() {
        this.props.history.push('/add-student/_add');
    }
    editStudent(id) {
        this.props.history.push(`/add-student/${id}`);
    }
    componentDidMount() {
        StudentService.getStudent().then((res) => {
            this.setState({ Students: res.data });
        });
    }


    render() {
        return (
            <div>
 
                <h2 className="text-center">Student Details</h2>

                <br></br>
                <div style={{ float: 'left',marginLeft:'20%', minWidth: '50%' }} >
                    <table className="table table-striped table-bordered text-center">

                        <thead >
                            <tr>
                                <th> Student Id</th>
                                <th> DOB</th>
                                <th> Name </th>
                                <th> Address</th>
                                <th> Phone Number</th>
                                <th> Join Date </th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Students.map(
                                    student =>
                                        <tr key={student.studentId}>
                                            <td> {student.studentId} </td>
                                            <td> {student.dob} </td>
                                            <td> {student.name}</td>
                                            <td> {student.address} </td>
                                            <td> {student.phoneNumber} </td>
                                            <td> {student.joinDate}</td>
                                            <td>
                                                <button onClick={() => this.editStudent(student.studentId)} className="btn btn-info">Update </button>
                                            </td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteStudent(student.studentId)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div class="col text-center ">
                        <button onClick={this.addStudent} className="btn btn-primary ">Add New</button>

                    </div>
                </div>
                
            </div>
        )
    }
}


export default ListStudent