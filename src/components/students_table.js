import React, {Component} from 'react';
import studentData from '../dummy_data/student_list';

console.log('student data', studentData)
class StudentTable extends Component {

    state = {
        students: []
    }

    componentDidMount(){
        this.getStudentData();
    }

    getStudentData(){
        //call server here
        this.setState({
            students: studentData
        });
    }

    render(){
        const {students} = this.state;
        const studentElements = students.map(student => {
            return (
                <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.grade}</td>
                </tr>
            );
        });

        return (
            <div className="col s12 m8">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentElements}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StudentTable;
