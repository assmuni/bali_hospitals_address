const express = require('express');
const router = express.Router();

const Hospital = require('../hospital/hospital_m');
const middleAuth = require('../middlewares/auth.middleware');
const middleGet = require('../middlewares/get.middleware');

// GET
router.get('/hospital', [middleAuth.checkCredential, middleGet.getData], (req, res, next) => {
    Hospital.find().then(data => {
        res.send(data);
    }).catch(next);
    // res.send('ini find({polos})');
});

// GET one
router.get('/hospital/:id', middleAuth.checkCredential, (req, res, next) => {
    Hospital.findById({_id: req.params.id}).then(data => {
        res.send(data);
    }).catch(next);
})

// GET query FAIL
router.get('/hospital', middleAuth.checkCredential, (req, res, next) => {
    console.log(Object.keys(req.query));
    console.log(Object.keys(req.params));
    next();
})

// POST
router.post('/hospital', middleAuth.checkCredential, (req, res, next) => {
    Hospital.create(req.body).then(data => {
        res.send(data);
    }).catch(next);
});

// PATCH
router.patch('/hospital/:id', middleAuth.checkCredential, (req, res, next) => {
    Hospital.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
        Hospital.findById({_id: req.params.id}).then(data => {
            res.send(data);
        });
    }).catch(next);
});


// DELETE
router.delete('/hospital/:id', middleAuth.checkCredential, (req, res, next) => {
    Hospital.findByIdAndDelete({_id: req.params.id}).then(data => {
        res.send(data);
    }).catch(next);
});

module.exports = router;