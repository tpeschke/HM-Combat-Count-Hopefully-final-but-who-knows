// proxy set to localhost 5678

const express = require('express');
const bodyParser = require('body-parser');
const ctrl = require('./controller/controller');
const cors = require('cors');

const app = new express();

app.use( cors() );
app.use( bodyParser.json() );


app.get('/api/fighters', ctrl.read);



const port = 5678;


//========================================================
app.listen(port, _=>{
    console.log(`Up and running on port ${port}`)
})