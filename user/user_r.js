const router = require('express').Router();
const User = require('./user_m');

const bcrypt = require('bcryptjs');

router.post('/user/reg', (req, res, next) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            .then(data => {
                User.findOne({ email: data.email }, (err, data) => {
                    if (err) return res.status('401').json({ message: err.message });
                    res.status(201).json({
                        id: data._id
                    });
                })
            }).catch(next);
        });
    })
});

module.exports = router;

