const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;

// middleware_routing
app.use('/api/v1.0', require('./routing/version_1.0/hospital'));

// middleware_error_handling
app.use((err, req, res, next) => {
    // console.log(err);
    res.status('422').send({error: err.message});
});

const portNumber = 3000;
app.listen(process.env.portNumber || portNumber, () => {
    console.info(`server online at localhost:${portNumber}`);
});