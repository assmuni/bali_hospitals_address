const express = require('express');
const router = express.Router();

// GET
router.get('/hospital', (req, res, next) => {
    res.send('get');
});

// POST
router.post('/hospital', (req, res, next) => {
    res.send('post');
});

// PUT
router.put('/hospital/:param_1', (req, res, next) => {
    res.send(`put ${req.params.param_1}`);
});

// DELETE
router.delete('/hospital/:param_1', (req, res, next) => {
    res.send(`delete ${req.params.param_1}`);
});


module.exports = router;