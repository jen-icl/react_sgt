const express = require('express');
const mysql = require('mysql');
const mysqlcredentials = require('./mysqlcreds.js');
mysqlcredentials.multipleStatements = true;
const cron = require('node-cron');
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const server = express();
const db = mysql.createPool(mysqlcredentials);

server.use(cors());
server.use(express.json());

const reconnect = db => {
    console.log('New connection tentative...');

    db = mysql.createPool(mysqlcredentials);

    db.getConnection(err => {
        if(err) {
            setTimeout(reconnect(db), 2000);
        } else {
            console.log('New connection established with the database');
            return db;
        }
    });
}

db.getConnection((err, connection) => {
    if(err) {
        console.error('Cannot establish a connection with the database');
        db = reconnect(db);
    } else {
        console.log('New connection established with the database');
        connection.release();
    }
});

db.on('error', err => {
    if(err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error('Cannot establish a connection with the database (' + err.code + ')');
        return reconnect(db);
    } else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
        console.error('Cannot establish a connection with the database (' + err.code + ')');
        return reconnect(db);
    } else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
        console.error('Cannot establish a connection with the database (' + err.code + ')');
        return reconnect(db);
    } else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
        console.error('Cannot establish a connection with the database (' + err.code + ')');
    } else {
        console.error('Cannot establish a connection with the database (' + err.code + ')');
        return reconnect(db);
    }
});

const cronNewTable = cron.schedule('0 * * * *', () => {
    const query = 'CREATE TABLE `grocery_new` LIKE `grocery`; RENAME TABLE `grocery` TO `grocery_old`, `grocery_new` TO `grocery`; INSERT INTO `grocery` (`id`, `completed`, `item`, `store`, `unit_price`, `unit`, `added`) VALUES (1, 1, "Strawberries", "Ralph\'s", 125, "/lb", "2019-05-21 16:16:38"), (2, 0, "Cauliflower (Avg. 2lbs)", "Sprouts", 149, "/lb", "2019-05-21 16:20:38"), (3, 1, "Peach Yellow Whole Trade Guarantee Organic", "Whole Foods", 399, "/lb", "2019-05-21 16:39:10"), (4, 1, "Strawberries", "Albertsons", 249, "/pk", "2019-05-21 16:39:50"), (5, 0, "Chobani Fat Free Peach Greek Style Yogurt, 5.3 OZ", "Sprouts", 110, "/g", "2019-05-21 16:40:20"), (6, 1, "Silk Unsweetened Pure Almond Milk", "Ralph\'s", 674, "/gal", "2019-05-21 16:40:56")';
    db.query(query, error => {
        console.error('Cron create table error', error);
    });
});

cronNewTable.start();

const cronDropOldTable = cron.schedule('10 * * * *', () => {
    const dropOldTableQuery = "DROP TABLE IF EXISTS `grocery_old`";
    db.query(dropOldTableQuery, error => {
        console.error('Cron drop table error', error);
    });
});

cronDropOldTable.start();

server.get('/api/groceries', (req, res) => {
    const output = {
        success: false
    };

    const query = 'SELECT * FROM `grocery`';

    db.query(query, (error, result) => {
        if(!error){
            output.success = true;
            output.data = result;
        } else {
            output.error = error;
        }

        res.send(output);
    });
});

server.post('/api/groceries', (req, res) => {
    const {item, store, unit_price, unit} = req.body;
    const output = {
        success: false
    };

    if(item === undefined || store === undefined || unit_price === undefined || unit === undefined){
        output.error = 'Error: a field is blank';
        res.send(output);
        return;
    }

    const query = 'INSERT INTO `grocery` SET `completed` = 0, `item`= ?, `store`= ?, `unit_price`= ?, `unit`= ?, `added`=NOW()';

    db.query(query, [item, store, unit_price, unit], (error, result) => {
        if(!error){
            output.success = true;
            output.new_id = result.insertId;
        } else {
            output.error = error;
        }

        res.send(output);
    });
});

server.post('api/sort', (req, res) => {
    const {type = id} = req.body;
    const output = {
        success: false
    };

    const query = 'SELECT * FROM `grocery` ORDER BY `' + type + '`';
    db.query(query, (error, result) => {
        if(!error){
            output.success = true;
            output.data = result;
        } else {
            output.error = error;
        }

        res.send(output);
    });
});

server.put('/api/groceries', (req, res) => {
    const {id, item, store, unit_price, unit} = req.body;
    const output = {
        success: false
    };

    if(item === undefined || store === undefined || unit_price === undefined || unit === undefined) {
        output.error = 'Error: a field is blank';
        res.send(output);
        return;
    } else if(id === undefined) {
        output.error = 'Error: must provide an id to update';
        res.send(output);
        return;
    }

    const query = 'UPDATE `grocery` SET `item`= ?, `store`= ?, `unit_price`= ?, `unit`= ? WHERE `id` =' + id;

    db.query(query, [item, store, unit_price, unit], (error, result) => {
        if(!error){
            output.success = true;
        } else {
            output.error = error;
        }

        res.send(output);
    });
});

server.put('/api/checkbox', (req, res) => {
    const {id, completed} = req.body;
    const output = {
        success: false
    };

    if(completed === undefined){
        output.error = 'Error: checkbox not found';
        res.send(output);
        return;
    } else if(id === undefined) {
        output.error = 'Error: must provide an id to update';
        res.send(output);
        return;
    }

    const query = 'UPDATE `grocery` SET `completed`=' + completed + ' WHERE `id` =' + id;

    db.query(query, (error, result) => {
        if(!error){
            output.success = true;
        } else {
            output.error = error;
        }

        res.send(output);
    });
});

server.delete('/api/groceries/:grocery_id', (req, res) => {
    const {grocery_id} = req.params;
    const output = {
        success: false
    };

    if(grocery_id === undefined){
        output.error = 'Error: must provide an id to delete';
        res.send(output);
        return;
    }

    const query = 'DELETE FROM `grocery` WHERE `id`=' + req.params.grocery_id;

    db.query(query, (error, result) => {
        if(!error){
            output.success = true;
        } else {
            output.error = error;
        }

        res.send(output);
    });
});

server.listen(PORT, () => {
    console.log('carrier has arrived on port', PORT);
});
