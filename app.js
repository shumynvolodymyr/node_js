const mongoose = require('mongoose');
const express = require('express');

require('dotenv').config();

const {ResponseStatusCodesEnum, config: {MONGO_URL, PORT}} = require('./config');
const {userRouter, loginRouter} = require('./routers');

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', loginRouter);
app.use('/users', userRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || ResponseStatusCodesEnum.SERVER)
        .json({message: err.message});
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
