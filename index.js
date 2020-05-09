const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('This is default page it works...');
});

//courses URL
app.get('/api/courses', (req, res) => {
    res.send('this is courses page');
});

const port = process.env.PORT || 3000; // from hosting port number or 3000
//if you want to set env variable locally go to terminal $export PORT=5000; in window $set
app.listen(port, () => console.log('Listening on port 3000.... '));