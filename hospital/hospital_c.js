const Hospital = require("./hospital_m");

exports.get_all = (req, res, next) => {
    Hospital.find({})
        .then(data => {
            return res.status(200).json({results: data});
        })
        .catch(next);
}

exports.get_one = (req, res, next) => {
    Hospital.findOne({_id: req.params.id})
        .then(data => {
            if (data !== null) {
                return res.status(200).json({
                    message: 'search success',
                    result: data
                })
            } else {
                return res.status(200).json({
                    mesage: 'search failur, data not found',
                    result: data
                })
            }
        })
        .catch(next);
}

exports.get_search = (req, res, next) => {
    Hospital.find({ name: { $regex: req.query.search, $options: 'i' } })
        .then(data => {
            if (data !== null) {
                return res.status(200).json({
                    message: 'search success',
                    result: data
                })
            } else {
                return res.status(200).json({
                    mesage: 'search failur, data not found',
                    result: data
                })
            }
        })
        .catch(next);
}

exports.create = (req, res, next) => {
    Hospital.create(req.body)
        .then(data => {
            return res.status(201).send(data);
        })
        .catch(next);
}

exports.update = (req, res, next) => {
    Hospital.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(data => {
            if (data !== null) {
                return res.status(200).json({
                    message: 'update success',
                    result: {
                        _id: data.id,
                        name: data.name
                    }
                })
            } else {
                return res.status(200).json({
                    mesage: 'update failur, data not found',
                    result: data
                })
            }
        })
        .catch(next)
}

exports.delete = (req, res, next) => {
    Hospital.findOneAndDelete({_id: req.params.id}).then(data => {
        if (data !== null) {
            return res.status(200).json({
                message: 'delete success',
                result: {
                    _id: data.id,
                    name: data.name
                }
            })
        } else {
            return res.status(200).json({
                mesage: 'delete failur, data not found',
                result: data
            })
        }
    }).catch(next);
}