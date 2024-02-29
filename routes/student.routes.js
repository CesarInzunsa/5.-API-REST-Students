const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');

// ----------------------- ROUTES ----------------------- //

router.get('/topaverage', (req, res) => {
    const students = studentController.topAverages();
    res.status(students.status).json(students);
});

router.get('/failed', (req, res) => {
    const students = studentController.failed();
    res.status(students.status).json(students);
});

// Get all students
router.get('/', (req, res) => {
    const students = studentController.getStudents();
    res.status(students.status).json(students);
});

// Add a student
router.post('/', (req, res) => {
    const student = req.body;
    const result = studentController.postStudent(student);
    res.status(result.status).json(result);
});

// Get student by id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const student = studentController.getStudentById(id);
    res.status(student.status).json(student);
});

// Update student by id
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const student = req.body;
    const result = studentController.putStudentById(id, student);
    res.status(result.status).json(result);
});

// Delete student by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const result = studentController.deleteStudentById(id);
    res.status(result.status).json(result);
});

module.exports = router;