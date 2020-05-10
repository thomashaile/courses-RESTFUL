const express = require('express');
const app = express();
const Joi = require('joi'); //load joi validation module, it returns class

const fs = require('fs');
const path = require('path');
app.use(express.json());
const COURSES_PATH = __dirname + "/courses.json";
//default index
app.get('/', (req, res) => {
    res.send('Hello World');
});
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
    
]
//1. display all courses - simple with out validation 
app.get('/api/courses', (req, res) => {
    fs.readFile(COURSES_PATH, "utf-8", (err, content) => {
        if (err) return res.status(404).send("error");
        res.send(JSON.parse(content));
    });
});

//2. display one course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');
    res.send(course);

});

//3. to add data the course array using post
app.post("/api/courses", (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    fs.readFile(COURSES_PATH, "utf-8", (err, content) => {
        if (err) return res.status(404).send(err);
        const parsedCourses = JSON.parse(content);
        const course = {
            id: parsedCourses.length + 1,
            name: req.body.name,
        };
        parsedCourses.push(course);
        const stringifiedCourses = JSON.stringify(parsedCourses);

        fs.writeFile(COURSES_PATH, stringifiedCourses, (err) => {
            if (err) return res.status(404).send(err);
            res.send(stringifiedCourses);
        });
    });
});

//validation function
function validateCourse(course) {

    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}


const port = process.env.PORT || 3000; // from hosting port number or 3000
//if you want to set env variable locally go to terminal $export PORT=5000; in window $set 
app.listen(port, () => console.log('Listening on port 3000.... '));
