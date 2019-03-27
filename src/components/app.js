import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/app.scss';
import React from 'react';
import StudentTable from './students_table';


const App = () => (
    <div>
        <h1 className="center">React SGT</h1>
        <div className="row">
            <StudentTable/>
        </div>
    </div>
);

export default App;
