const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/tasks', taskRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Server Error'
    });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
