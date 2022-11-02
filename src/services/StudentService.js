import axios from 'axios';

const STUDENT_API_BASE_URL = "http://localhost:8085/demo/student";

class StudentService {

    getStudent(){
        return axios.get(STUDENT_API_BASE_URL+'/getAll');
    }

    createStudent(Student){
        return axios.post(STUDENT_API_BASE_URL+'/save', Student);
    }

    getStudentById(StudentId){
        return axios.get(STUDENT_API_BASE_URL + '/getOne/' + StudentId);
    }

    updateStudent(Student, StudentId){
        return axios.put(STUDENT_API_BASE_URL + '/update/' + StudentId, Student);
    }

    deleteStudent(StudentId){
        return axios.delete(STUDENT_API_BASE_URL + '/delete/' + StudentId);
    }
}

export default new StudentService()