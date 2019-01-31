const router = require('express').Router();
const middleAuth =  require('./auth.middleware');


router.post('/login', [middleAuth.checkEmail, middleAuth.createToken], (req, res) => {
    res.status(201).json({
        auth: true,
        token: req.token
    });
})

module.exports = router;