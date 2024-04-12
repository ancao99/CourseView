const mysql = require('mysql');

// TODO
// add connection to codd.cs.gsu.
//[username]codd.cs.gsu.edu
//password

//codd my sql t
//username: student id
//passowrd: student id 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'database_name'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database.');
});

module.exports = connection;

// Create API Endpoints:
// Define routes in your Express.js application to handle different HTTP requests (GET, POST, PUT, DELETE).
// These routes will interact with your database to retrieve, insert, update, or delete data.
// For example, to retrieve data from a MySQL database:

const express = require('express');
const router = express.Router();
const db = require('../db'); // Import your database connection module

router.get('/courses', (req, res) => {
    db.query('SELECT * FROM courses', (error, results, fields) => {
        if (error) {
            console.error('Error fetching courses:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;