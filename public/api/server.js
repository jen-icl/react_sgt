const express = require('express');
const mysql = require('mysql');
const mysqlcredentials = require('./mysqlcreds.js');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const server = express();
const db = mysql.createConnection(mysqlcredentials);

server.use(cors());
server.use(express.json());

server.get('/api/groceries', (req, res) => {
    db.connect(() => {
        const query = 'SELECT * FROM `grocery`';

        db.query(query, (error, data) => {
            const output = {
                success: false,
            };

            if(!error){
                output.success = true;
                output.data = data;
            } else {
                output.error = error;
            }

            res.send( output );
        });
    });
});


//by default browser does get requests
//create post endpoint, to handle adding students
server.post('/api/grades', (request, response) => { //file path always starts with '/'
   //check body object and see if any data was not sent
    if(request.body.name === undefined || request.body.course === undefined || request.body.grade === undefined){
        //respond to the client with an appropriate error message
        response.send({
            success: false,
            error: 'invalid name, course, or grade'
        });
        //return undefined and exit out of function
        return;
    }
    //connect to the database
    db.connect( () => {
        const name = request.body.name.split(" "); //returns array of [givenname, surname]
        //create a hardcoded one and test in phpMyAdmin first
        const query = 'INSERT INTO `grades` SET `surname`="'+name[1]+'", `givenname`="'+name[0]+'", `course`="'+request.body.course+'", `grade`='+request.body.grade+', `added`=NOW()';
        //'INSERT INTO  `grades` (`surname`,`givenname`,`course`,`grades`,`added`) VALUES ("Lai","Jen","math",80,NOW()), ("Paschal","Dan","math",90,NOW())'
        db.query(query, (error, result) => {
            if(!error){
                response.send({
                    success: true,
                    new_id: result.insertId //can console.log(result) to see the OkPacket that returns from the query
                })
            } else {
                response.send({
                    success: false,
                    error //ES6 structuring shortcut for error: error -> error
                });
            }
        });
    });
});

server.delete('/api/grades/:student_id', (request, response) => {
    if(request.params.student_id === undefined){
        response.send({
            success: false,
            error: 'must provide a student id for delete'
        });
        return;
    }
    db.connect(() => {
        const query = 'DELETE FROM `grades` WHERE `id`=' + request.params.student_id;
        db.query(query, (error, result) => {
            if(!error){
                response.send({
                    success: true
                });
            } else {
                response.send({
                    success: false,
                    error
                });
            }
        })
    });
});

server.listen(PORT, ()=>{
    //console.log('server is running on port 3001');
    console.log('carrier has arrived on port', PORT);
});
