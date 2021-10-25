const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

require('dotenv').config();

const {ResponseStatusCodesEnum, config: {MONGO_URL, PORT, ALLOWED_ORIGIN, NODE_ENV}} = require('./config');
const startCron = require('./cron');
const {userRouter, authRouter} = require('./routers');
const {ErrorHandler, messagesEnum} = require('./errors');
const {checkDefaultData} = require('./utils');

const app = express();

mongoose.connect(MONGO_URL);

app.use(helmet());
app.use(cors({origin: _configCors}));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

if (NODE_ENV === 'dev') {
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || ResponseStatusCodesEnum.SERVER)
        .json({message: err.message});
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    checkDefaultData();
    startCron();
});

function _configCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(messagesEnum.CORS_NOT_ALLOWED, ResponseStatusCodesEnum.FORBIDDEN), false);
    }

    return callback(null, true);
}
