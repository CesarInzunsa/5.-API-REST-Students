const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');
const authUtils = require('../middleware/authUtils');

function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({status: 401, message: 'Unauthorized'});
    }

    const decodedToken = authUtils.verifyToken(token);
    if (!decodedToken) {
        return res.status(401).json({status: 401, message: 'Unauthorized'});
    }

    req.user = decodedToken;
    next();
};

// ----------------------- ROUTES ----------------------- //

app.get("/", getStudents);
app.post("/", postStudent);
app.get("/:id", getStudentById);
app.put("/:id", putStudentById);
app.delete("/:id", deleteStudentById);


// Get all tasks
router.get('/', authenticate, (req, res) => {
    const students = studentController.getAllStudents();
    res.status(students.status).json(students);
});
