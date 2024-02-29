const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const studentRoutes = require('./routes/student.routes');

app.use(bodyParser.json());

app.use('/students', studentRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

const students = [];
//Mostrar todos los estudiantes


app.get("/estudiantes", getStudents);
app.post("/estudiantes", postStudent);
app.get("/estudiantes/:id", getStudentById);
app.put("/estudiantes/:id", putStudentById);
app.delete("/estudiantes/:id", deleteStudentById);

