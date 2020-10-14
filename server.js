// Setup empty JS object to act as endpoint for all routes
projectData = {
    tempData:[]
};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Setup Server
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});

// Create JS array
// const projectData.tempData = [];
// Respond with JS object when a GET request is made to the homepage
app.get('/all', (req, res) => {
    res.send(projectData.tempData);
    console.log(projectData.tempData);
});


app.post('/addTemp', (req, res) => {
    newEntry = {
        city: req.body.city,
        date: req.body.date,
        temp: req.body.temp,
        feeling: req.body.feeling,
    }
    projectData.tempData.push(newEntry);
    res.send(projectData.tempData);
    // console.log(projectData.tempData);
});