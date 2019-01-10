const mongoose = require('mongoose');
const express = require('express');

// Create Express app
const app = express();

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// support parsing of application/x-www-form-urlencoded post data with Express native package
app.use(express.urlencoded({extended: true}));

// support parsing of application/json type post data with Express native package
app.use(express.json());

// Database setup
const dbName = 'givemedishes';
const mdbPort = 27017;
const url = 'mongodb://localhost:' + mdbPort + '/'+ dbName;

mongoose.Promise = global.Promise;

mongoose.connect(url).then(() => {
    console.log("Successfully connected to the database.");
}).catch(err => {
    console.log("Couldn't connect to the database. Exiting now...");
    process.exit();
});


// Define Routes
app.get('/', (request, response) => {
    response.json({"message": "Welcome to the Mongoose API."})
});


require('./routes/routes.js')(app);

// Listen for server requests
app.listen(3000, () => {
    console.log("Express server is listening on Port 3000.")
});
