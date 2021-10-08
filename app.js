const express = require('express');
const mongoose = require("mongoose");

const userRouter = require('./routers/user.router');
const loginRouter = require('./routers/login.router');
const { PORT, MONGO_URL} = require('./config/config');

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
