import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, {Component} from 'react';
import axios from 'axios';
import AddStudent from './add_student';
import StudentTable from './students_table';

class App extends Component{
    state = {
        students: [],
        error: ''
    }

    addStudent = async (student) => {
        try {
        await axios.post('/api/grades', student)
        this.getStudentData();
        } catch(err){
            this.setState({
                error:'Error adding student data'
            });
        }
    }

    deleteStudent = async (id) => {
        try {
        await axios.delete(`/api/grades/${id}`);
        } catch(err){
            this.setState({
                error:'Error deleting student data'
            });
        }
    }

    componentDidMount(){
        this.getStudentData();
    }

    async getStudentData(){
        try {
        const resp = await axios.get('/api/grades');
        this.setState({
            students: resp.data.data
        });
        } catch(err){
            this.setState({
                error:'Error retrieving student data'
            });
        }
    }

    readStudentData(){
        axios.get('http://localhost:3001/api/grades').then((resp) => {
            console.log('server response', resp);
            this.setState({
                students: resp.data.data
            });
        }).catch((err) => {
            console.log('error getting student data', err.message);
            this.setState({
                error: 'Error retrieving student data'
            });
        });
    }

    render(){
        return (
            <div>
                <h1 className="center">React SGT</h1>
                <h5 className="red-text text-darken-2">{this.state.error}</h5>
                <div className="row">
                    <StudentTable col="s12 m8" delete={this.deleteStudent} list={this.state.students}/>
                    <AddStudent col="s12 m4" add={this.addStudent}/>
                </div>
            </div>
        );
    }
}

export default App;
