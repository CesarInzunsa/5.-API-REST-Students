const {v4: uuidv4} = require('uuid');
const student = require('../model/student.model');
const {json} = require("express");
const Student = require("../model/student.model");
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

function genID() {
    return uuidv4().replace(/-/g, "").substring(0, 12);
}

// Obtener todos los estudiantes
function getStudents() {
    if (students.length === 0) {
        return {status: 404, message: "No hay estudiantes registrados"};
    }
    return {status: 200, data: students};
}

//Agregar un estudiantes
function postStudent(student) {

    if (!student.name || !student.grade) {
        return {status: 400, message: "El nombre y la calificación del estudiante son requeridos"};
    }

    const newStudent = new Student(genID(), student.name, student.grade);
    students.push(newStudent);
    return {status: 201, message: "Estudiante agregado correctamente"};
}

//Obtener estudiante por id
function getStudentById(id) {

    if (students.length === 0) {
        return {status: 404, message: "No hay estudiantes registrados"};
    }

    if (!id) {
        return {status: 400, message: "El id del estudiante es requerido"};
    }

    const student = students.find((student) => student.id === parseInt(id));
    return student ? {status: 200, data: student} : {status: 404, message: "Estudiante no encontrado"};
}

//Actualizar estudiante por id
function putStudentById(id, newDataStudent) {

    if (students.length === 0) {
        return {status: 404, message: "No hay estudiantes registrados"};
    }

    if (!id) {
        return {status: 400, message: "El id del estudiante es requerido"};
    }

    const index = students.findIndex((student) => student.id === parseInt(id));

    if (index === -1) {
        return {status: 404, message: "Estudiante no encontrado"};
    }

    const student = students[index];
    student.name = newDataStudent.name;
    student.grade = newDataStudent.grade;
    return {status: 200, message: "Estudiante actualizado correctamente"};
}

//Eliminar estudiante por id
function deleteStudentById(id) {
    const index = students.findIndex((student) => student.id === parseInt(id));

    if (index === -1) {
        return {status: 404, message: "Estudiante no encontrado"};
    }

    students.splice(index, 1);
    return {status: 200, message: "Estudiante eliminado correctamente"};
}

function topAverages() {

    if (students.length === 0) {
        return {message: "No hay estudiantes registrados"};
    }

    const topStudents = students
        .filter(student => student.grade)
        .sort((a, b) => b.grade - a.grade)
        .slice(0, 3);

    return {status: 200, data: topStudents};
};

function failed() {
    if (students.length === 0) {
        return {status: 401, message: "No hay estudiantes registrados"};
    }

    const failedStudents = students
        .filter(student => student.grade < 70);

    return {status: 200, data: failedStudents};
}

module.exports = {
    getStudents,
    postStudent,
    getStudentById,
    putStudentById,
    deleteStudentById,
    topAverages,
    failed
}