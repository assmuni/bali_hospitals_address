const User = require('./user_m');
const bcrypt = require('bcryptjs');

exports.routersConfig = (app) => {

    app.post('/v2/user/reg', (req, res, next) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    permissionLevel: req.body.permissionLevel
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

    app.get('/v2/users', (req, res, next) => {
        User.find({}, { _id: 0, __v: 0, password: 0 })
            .then(data => {
                res.status(200).json(data);
            })
            .catch(next);
    });

}


