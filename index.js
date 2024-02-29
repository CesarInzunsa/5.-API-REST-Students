const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student.routes');

const app = express();

app.use(bodyParser.json());
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
