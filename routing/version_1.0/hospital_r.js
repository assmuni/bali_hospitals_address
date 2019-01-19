const express = require('express');
const router = express.Router();

const Hospital = require('../../models/version_1.0/hospital_m');

// GET
router.get('/hospital', (req, res, next) => {
    Hospital.find().then(data => {
        res.send(data);
    }).catch(next);
});

// POST
router.post('/hospital', (req, res, next) => {
    Hospital.create(req.body).then(data => {
        res.send(data);
    }).catch(next);
});

// PUT
router.put('/hospital/:param_1', (req, res, next) => {
    Hospital.findByIdAndUpdate({_id: req.params.param_1}, req.body).then(() => {
        Hospital.findById({_id: req.params.param_1}).then(data => {
            res.send(data);
        });
    }).catch(next);
});

// DELETE
router.delete('/hospital/:param_1', (req, res, next) => {
    Hospital.findByIdAndDelete({_id: req.params.param_1}).then(data => {
        res.send(data);
    }).catch(next);
});

module.exports = router;