const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');

// ----------------------- ROUTES ----------------------- //

// Get all students
router.get('/', (req, res) => {
    const students = studentController.getAllStudents();
    res.status(students.status).json(students);
});

module.exports = router;