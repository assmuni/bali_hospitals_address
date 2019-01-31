const jwt = require('jsonwebtoken');
const jwtSecret = require('./secret.env').key_s;
const bcrypt = require('bcryptjs');
const User = require('../user/user_m');

exports.checkEmail = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(data => {
            if (!data) {
                res.status('401').json({message: 'email not found'});
            } else {
                bcrypt.compare(req.body.password, data.password, (err, auth) => {
                    if (!auth) {
                        res.status(401).json({auth: auth, token: null});
                    } else {
                        req.dataAuth = {
                            id: data._id,
                            name: data.name
                        }
                        next();
                    }
                })
            }
        });
}

exports.createToken = (req, res, next) => {
    jwt.sign(req.dataAuth, jwtSecret, {expiresIn: '24h'}, (err, token) => {
        if (err) {
            res.status(401).json({err: err})
        } else {
            req.token = token;
            next();
        }
    });
}