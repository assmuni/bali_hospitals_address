const jwt = require('jsonwebtoken');
const config  = require('./secret.env');
const bcrypt = require('bcryptjs');
const User = require('../user/user_m');
const LV_ADMIN = config.permisionLevels.SUPER_ADMIN;

exports.check_auth = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(data => {
            if (!data) {
                return res.status(404).json({message: 'email not found'});
            } else {
                bcrypt.compare(req.body.password, data.password, (err, auth) => {
                    if (!auth) {
                        return res.status(401).json({ auth: auth, token: null });
                    } else {
                        req.dataAuth = {
                            id: data._id,
                            name: data.name,
                            permissionLevel: data.permissionLevel
                        }
                        return next();
                    }
                });
            }
        });
}

exports.create_token = (req, res, next) => {
    jwt.sign(req.dataAuth, config.key_s, {expiresIn: '24h'}, (err, token) => {
        if (err) {
            return res.status(401).json({err: err})
        } else {
            req.token = token;
            return next();
        }
    });
}

exports.check_credential = (req, res, next) => {
    var authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({
            auth: false,
            message: 'Token not provided'
        });
    } else {
        jwt.verify(authToken, config.key_s, (err, auth) => {
            if (!err) {
                req.jwt = auth;
                return next();
            } else {
                return res.status(401).json({
                    auth: false,
                    message: err.message
                });
            }
        });
    }
}

exports.check_permission_level = (params_level) => {
    return (req, res, next) => {
        if (params_level.includes(parseInt(req.jwt.permissionLevel))) {
            return next();
        } else {
            return res.status(403).json({ message: 'Permission level not accepted' });
        }
    }
}

exports.check_status_and_permission_level = (req, res, next) => {
    let obj = { 'id': req.jwt.id, 'name': req.jwt.name, 'permissionLevel': req.jwt.permissionLevel, 'id_params': req.params.id, 'permission_level_needed': LV_ADMIN };
    console.log(obj);




    // FAILLL WAIT
    if ((req.jwt.id === req.params.id) || (parseInt(req.jwt.permissionLevel) === LV_ADMIN)) {
        next();
    } else {
        res.status(403).json({ message: 'Permission level or status not accepted' });
    }
}