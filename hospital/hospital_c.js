const Hospital = require("./hospital_m");

exports.get_all = (req, res, next) => {
    Hospital.find({})
        .then(data => {
            res.status(200).json({results: data});
        })
        .catch(next);
}

exports.get_one = (req, res, next) => {
    Hospital.findOne({_id: req.params.id})
        .then(data => {
            res.status(200).json({results: data});
        })
        .catch(next);
}

exports.create = (req, res, next) => {
    Hospital.create(req.body)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(next);
}

exports.update = (req, res, next) => {
    Hospital.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(data => {
            res.send(data);
        })
        .catch(next)
}

exports.delete = (req, res, next) => {
    Hospital.findOneAndDelete({_id: req.params.id}).then(data => {
        res.send(data);
    }).catch(next);
}