const mongoose = require('mongoose');
const express = require('express');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const {config: {MONGO_URL, PORT}} = require('./config');
const {userRouter, loginRouter} = require('./routers');

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.static('images'));
app.use(fileUpload({}));
app.use(express.urlencoded({extended: true}));

app.use('/login', loginRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
