const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const dataRouter = require('./routes/dataRoutes');

const app = express();

// Middlewares

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes

app.use('/api/v1/data', dataRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler);

module.exports = app;
