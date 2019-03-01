const jwt = require('jsonwebtoken');
const jwtSecret = require('./secret.env').key_s;
const bcrypt = require('bcryptjs');
const User = require('../user/user_m');

exports.check_email = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(data => {
            if (!data) {
                res.status(404).json({message: 'email not found'});
            } else {
                bcrypt.compare(req.body.password, data.password, (err, auth) => {
                    if (!auth) {
                        res.status(401).json({ auth: auth, token: null });
                    } else {
                        req.dataAuth = {
                            id: data._id,
                            name: data.name,
                            permissionLevel: data.permissionLevel
                        }
                        next();
                    }
                });
            }
        });
}

exports.create_token = (req, res, next) => {
    jwt.sign(req.dataAuth, jwtSecret, {expiresIn: '24h'}, (err, token) => {
        if (err) {
            res.status(401).json({err: err})
        } else {
            req.token = token;
            next();
        }
    });
}

exports.check_credential = (req, res, next) => {
    var authToken = req.headers.authorization;
    if (!authToken) {
        res.status(401).json({
            auth: false,
            message: 'Token not provided'
        });
    } else {
        jwt.verify(authToken, jwtSecret, (err, auth) => {
            if (!err) {
                req.jwt = auth;
                next();
            } else {
                res.status(401).json({
                    auth: false,
                    message: err.message
                });
            }
        });
    }
}

exports.check_user_level = (param_level) => {
    return (req, res, next) => {
        if (param_level === parseInt(req.jwt.permissionLevel)) {
            next();
        } else {
            res.status(403).json({message: 'Permission level not accepted'});
        }
    }
}