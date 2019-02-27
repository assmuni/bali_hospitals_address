const Hospital = require("./hospital_m");

exports.getAll = (req, res, next) => {
    Hospital.find({})
        .then(data => {
            res.status(200).json({results: data});
        }).catch(next);
}

exports.getOneById = (req, res, next) => {
    Hospital.findById({_id: req.params.id})
        .then(data => {
            res.status(200).json({results: data});
        }).catch(next);
}

exports.create = (req, res, next) => {
    Hospital.create(req.body).then(data => {
        res.status(201).send(data);
    }).catch(next);
}

exports.update = (req, res, next) => {
    Hospital.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Hospital.findById({_id: req.params.id}).then(data => {
            res.send(data);
        });
    }).catch(next);
    // res.send(req.params.id);
}

exports.delete = (req, res, next) => {
    Hospital.findByIdAndDelete({_id: req.params.id}).then(data => {
        res.send(data);
    }).catch(next);
}