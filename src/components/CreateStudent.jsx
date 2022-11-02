import React, { Component } from 'react'
import StudentService from '../services/StudentService';

class CreateStudent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            no: this.props.match.params.no,
            studentId: '',
            dob: '',
            name: '',
            address: '',
            phoneNumber: '',
            joinDate: ''
        }
        this.changeStudentIdHandler = this.changeStudentIdHandler.bind(this);
        this.changeDobHandler = this.changeDobHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.changeJoinDateHandler = this.changeJoinDateHandler.bind(this);
        this.saveToStudent = this.saveToStudent.bind(this);
    }
    componentDidMount() {

        if (this.state.no === '_add') {
            return
        } else {
            StudentService.getStudentById(this.state.no).then((res) => {
                let student = res.data;
                this.setState({
                    studentId: student.studentId,
                    dob: student.dob,
                    name: student.name,
                    address: student.address,
                    phoneNumber: student.phoneNumber,
                    joinDate:student.joinDate,
                });
            });
        }
    }

    saveToStudent = (e) => {
        e.preventDefault();
        let StudentData = { studentId: this.state.studentId, dob: this.state.dob, name: this.state.name, address: this.state.address, phoneNumber: this.state.phoneNumber, joinDate: this.state.joinDate };
        console.log('StudentData => ' + JSON.stringify(StudentData));

        if (this.state.no === '_add') {
            StudentService.createStudent(StudentData).then(res => {
                alert(res.data);
                this.props.history.push('/');
            });
        }  else {
            StudentService.updateStudent(StudentData, this.state.studentId).then(res => {
                alert(res.data);
                this.props.history.push('/');
            });
        }
    }
   
    changeStudentIdHandler = (event) => {
        this.setState({ studentId: event.target.value });
    }

    changeDobHandler = (event) => {
        this.setState({ dob: event.target.value });
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }
    changeAddressHandler = (event) => {
        this.setState({ address: event.target.value });
    }

    changePhoneNumberHandler = (event) => {
        const phoneNumber = (event.target.validity.valid) ? event.target.value : this.state.phoneNumber;
    
        this.setState({ phoneNumber });
    }

    changeJoinDateHandler = (event) => {
        this.setState({ joinDate: event.target.value });
    }

    cancel() {
        this.props.history.push('/');
    }
    getTitle() {
        if (this.state.no === '_add') {
            return <h3 className="text-center">Add Student Details</h3>
            this.val=false;
        } else {
            this.val=true;
            return <h3 className="text-center">Update Student Details</h3>
        }
    }

    render() {
        return (
            <div >

                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                
                                    <div className="form-group">
                                        <label> Student Id: </label>
                                        <input placeholder="Student Id" name="studentId" className="form-control"
                                            value={this.state.studentId} onChange={this.changeStudentIdHandler} disabled={this.val}/>
                                    </div>
                                    <div className="form-group">
                                        <label> Date Of Birth: </label>
                                        <input placeholder="DOB" name="dob" type="date" className="form-control"
                                            value={this.state.dob} onChange={this.changeDobHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>  Name: </label>
                                        <input placeholder="Student Name " name="name" className="form-control"
                                            value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>  Address: </label>
                                        <input placeholder="Address" name="address" className="form-control"
                                            value={this.state.address} onChange={this.changeAddressHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Phone Number: </label>
                                        <input placeholder="Phone Number" name="phoneNumber" pattern="[0-9]*" className="form-control"
                                            value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label>  Join Date: </label>
                                        <input placeholder="Join Date" name="joinDate" type="date" className="form-control"
                                            value={this.state.joinDate} onChange={this.changeJoinDateHandler} />
                                    </div>
                                    <div style={{ minHeight: "10px" }}>

                                    </div>
                                    <button className="btn btn-success" onClick={this.saveToStudent}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateStudent
