const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'courses1' },
    { id: 2, name: 'courses2' },
    { id: 3, name: 'courses3' }
];
//default index
app.get('/', (req, res) => {
    res.send('Hello World');
});

//1. display all courses - simple with out validation 
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//2. display one course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');
    res.send(course);
});

const port = process.env.PORT || 3000; // from hosting port number or 3000
//if you want to set env variable locally go to terminal $export PORT=5000; in window $set 
app.listen(port, () => console.log('Listening on port 3000.... '));