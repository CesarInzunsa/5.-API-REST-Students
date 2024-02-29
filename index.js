const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student.routes');
const authmiddleware = require('./middleware/authMiddleware');
const authutils = require('./middleware/authUtils');

const app = express();
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'admin' && password === 'admin') {
        const token = authutils.generateToken({id: 1, username: username});
        res.json({token});
    } else {
        res.json(401).json({error: "Unauthorized"});
    }
});

app.use(bodyParser.json());
app.use(authmiddleware);
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});