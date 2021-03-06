// proxy set to localhost 5678

const express = require('express');
const bodyParser = require('body-parser');
const ctrl = require('./controller/controller');
const cors = require('cors');

const app = new express();

app.use( cors() );
app.use( bodyParser.json() );


app.get('/api/fighters', ctrl.read);
app.delete('/api/fighters/:id', ctrl.delete);
app.delete('/api/fighters', ctrl.deleteAll);
app.post('/api/fighters', ctrl.updateFighter);
app.post('/api/fighter', ctrl.createFighter);

app.get('/api/statuses', ctrl.readStatus);
app.post('/api/statuses', ctrl.createStatus);
app.delete('/api/statuses/:id', ctrl.deleteStatus)


const port = 5670;


//========================================================
app.listen(port, _=>{
    console.log(`I live, I die, I live again ${port}`)
})