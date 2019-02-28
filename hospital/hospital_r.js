// const express = require('express');
// const router = express.Router();

// const Hospital = require('../hospital/hospital_m');
const middleAuth = require('../middlewares/auth.middleware');
// const middleGet = require('../middlewares/get.middleware');

// load middleware
const hospitalMid = require('./hospital_c');

exports.routersConfig = (app) => {

    app.get('/v2/hospitals', [
        middleAuth.checkCredential.
        hospitalMid.get_all
    ]);

    app.get('/v2/hospital/:id', [
        hospitalMid.get_one
    ])

    app.post('/v2/hospital', [
        hospitalMid.create
    ]);

    app.patch('/v2/hospital/:id', [
        hospitalMid.update
    ]);

    app.delete('/v2/hospital/:id', [
        hospitalMid.delete
    ]);

}