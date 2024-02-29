const {v4: uuidv4} = require('uuid');
const student = require('../model/student.model');
const {json} = require("express");
let students = [
    {
        id: 1,
        name: 'Juanito',
        grade: 30
    },
    {
        id: 2,
        name: 'Pepito',
        grade: 40
    },
    {
        id: 3,
        name: 'Jaimito',
        grade: 50
    },
    {
        id: 4,
        name: 'Carlitos',
        grade: 100
    }
]
function getStudents (req, res) {
    res.json(students);
}

//Agregar un estudiantes
function postStudent (req,res) {
    const student = req.body;
    students.push(student);
    res.json(student);
}

//Obtener estudiante por id
function getStudentById (req, res) {
    const id = req.params.id;
    const student = students.find((student) => student.id === id);
    res.json(student);
}

//Actualizar estudiante por id
function putStudentById (req, res) {
    const id = req.params.id;
    const student = req.body;
    const index = students.findIndex((student) => student.id === id);
    students[index] = student;
    res.json(student);
}

//Eliminar estudiante por id
function deleteStudentById (req, res) {
    const id = req.params.id;
    const index = students.findIndex((student) => student.id === id);
    students.splice(index, 1);
    res.sendStatus(204);
}


function topAverages (req, res) {
    const topStudents = students
        .filter(student => student.grade) // Ensure the student has a grade
        .sort((a, b) => b.grade - a.grade) // Sort students by grade in descending order
        .slice(0, 3); // Get the top 3 students

    res.json(topStudents.map(student => ({
        id: student.id,
        name: student.name,
        grade: student.grade
    })));
};

module.exports = {
    getStudents,
    postStudent,
    getStudentById,
    putStudentById,
    deleteStudentById,
    topAverages
}

