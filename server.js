projectData = {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static('app'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 8000;
const server = app.listen(port, () => {
  console.log(`Running on localhost: ${port}`);
});


app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/all',(req,res) =>{
    let temperature = req.body.temperature;
    let date = req.body.date;
    let user_response = req.body.user_response;
    projectData['temperature']=temperature;
    projectData['date']=date;
    projectData['user_response']=user_response;
    res.status(200).send({
        success: true,
        message: 'Post request successful!',
        data: projectData
    });
});

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server