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

            res.send(output);
        });
    });
});

server.post('/api/groceries', (req, res) => {
    console.log('see this', req.body)
    const {item, store, unit_price, unit} = req.body;
    const output = {
        success: false,
    };

    if (item === undefined || store === undefined || unit_price === undefined || unit === undefined){
        output.error = 'Invalid item, store, unit_price, or unit';
        res.send(output);
        return;
    }

    db.connect(() => {
        const query = 'INSERT INTO `grocery` SET `completed` = 0, `item`="' + item + '", `store`="' + store + '", `unit_price`="' + unit_price + '", `unit`="' + unit + '", `added`=NOW()';

        db.query(query, (error, result) => {
            if(!error){
                output.success = true;
                output.new_id = result.insertId;
            } else {
                output.error = error;
            }

            res.send(output);
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
