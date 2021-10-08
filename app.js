const express = require('express');
const mongoose = require("mongoose");

const carRouter = require('./routers/car.router');
const { PORT, MONGO_URL} = require('./config/config');

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/retro-cars', carRouter);

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
